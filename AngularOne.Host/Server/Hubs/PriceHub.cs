namespace AngularOne.Host.Server.Hubs
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AngularOne.Host.Server.Models;
    using AngularOne.Host.Server.Services;
    using Easy.Common.Extensions;
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    [HubName("priceHub")]
    public class PriceHub : Hub
    {
        /// <summary>
        /// The <see cref="bool"/> is ignored, only there to allow a concurrent hash (lack of concurrent HashSet(string)).
        /// </summary>
        private static readonly ConcurrentDictionary<string, bool> ConnectionIds;
        private static readonly Dictionary<Company, List<string>> SubscribersMap;

        static PriceHub()
        {
            ConnectionIds = new ConcurrentDictionary<string, bool>();
            Pricing.Instance.OnNewPrice += OnNewPrice;
            SubscribersMap = Pricing.Instance.Companies.ToDictionary(t => t, t => new List<string>());
        }

        public override Task OnConnected()
        {
            ConnectionIds.TryAdd(Context.ConnectionId, false);

            var fooValue = Context.QueryString["foo"];
            var bazValue = Context.QueryString["baz"]; // can be null if not exists

            Clients.All.onNewConnection(Context.ConnectionId);
            return base.OnConnected();
        }

        public void Subscribe(string symbol)
        {
            var company = Pricing.Instance.Companies
                .FirstOrDefault(c => c.Symbol.Equals(symbol, StringComparison.OrdinalIgnoreCase));

            if (company == null) { return; }

            List<string> subscribers;
            if (!SubscribersMap.TryGetValue(company, out subscribers)) { return; }

            lock (subscribers)
            {
                subscribers.Add(Context.ConnectionId);
            }

            Clients.All.onSubscription(company.Symbol);
        }

        public void Unsubscribe(string symbol)
        {
            var company = Pricing.Instance.Companies
                .FirstOrDefault(c => c.Symbol.Equals(symbol, StringComparison.OrdinalIgnoreCase));

            if (company == null) { return; }

            List<string> subscribers;
            if (!SubscribersMap.TryGetValue(company, out subscribers)) { return; }

            lock (subscribers)
            {
                subscribers.Remove(Context.ConnectionId);
            }

            Clients.All.onUnsubscription(company.Symbol);
        }

        public void SearchCompaniesByName(string query)
        {
            IEnumerable<Company> result;
            if (query.IsNullOrEmptyOrWhiteSpace())
            {
                result = Enumerable.Empty<Company>();
            } else
            {
                result = SubscribersMap
                    .Where(x => x.Key.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase))
                    .Select(x => x.Key);
            }

            Clients.Caller.onCompanySearchResult(result);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            bool ignore;
            ConnectionIds.TryRemove(Context.ConnectionId, out ignore);
            Clients.All.removeConnection(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        private static void OnNewPrice(object sender, Price price)
        {
            List<string> subscribers;
            if (!SubscribersMap.TryGetValue(price.Company, out subscribers)) { return; }

            var context = GlobalHost.ConnectionManager.GetHubContext<PriceHub>();

            lock (subscribers)
            {
                if (!subscribers.Any()) { return; }
                context.Clients.Clients(subscribers).onPrice(price);
            }
        }
    }
}