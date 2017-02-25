namespace AngularOne.Host.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading;
    using AngularOne.Host.Server.Models;
    using Easy.Common;

    public sealed class Pricing : IPricing
    {
        private static readonly TimeSpan UpdateInterval = TimeSpan.FromSeconds(1);
        private readonly Dictionary<Company, Price> _referencePrices;
        private readonly Random _random;
        private readonly Timer _timer;

        private static readonly Lazy<IPricing> Lazy = new Lazy<IPricing>(() => new Pricing(), true);
        public static IPricing Instance = Lazy.Value;

        private Pricing()
        {
            var ftse100File = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "FTSE_100.csv");
            _referencePrices = File.ReadLines(ftse100File)
                .Select(l =>
                {
                    var columns = l.Split(',');
                    var company = new Company(columns[0], columns[1]);
                    var price = new Price(
                        company,
                        decimal.Parse(columns[2]),
                        decimal.Parse(columns[3]),
                        decimal.Parse(columns[4]));

                    return price;
                })
                .ToDictionary(p => p.Company, p => p);

            Companies = _referencePrices.Keys.ToArray();
            _random = new Random();

            _timer = new Timer(PublishPrices, null, UpdateInterval, Timeout.InfiniteTimeSpan);
        }

        public Company[] Companies { get; }

        public event EventHandler<Price> OnNewPrice;

        private void PublishPrices(object state)
        {
            foreach (var item in _referencePrices)
            {
                var absPercentChange = (double)Math.Abs(item.Value.DayChangePercent);
                var min = absPercentChange * -1;
                var max = absPercentChange;

                var newPriceValue = Math.Round(item.Value.Value + (decimal)GenerateRandomBetween(_random, min, max), 2);
                OnNewPrice?.Invoke(this, new Price(item.Key, newPriceValue, item.Value.DayChangeValue, item.Value.DayChangePercent));
            }

            _timer.Change(UpdateInterval, Timeout.InfiniteTimeSpan);
        }

        private static double GenerateRandomBetween(Random random, double min, double max)
        {
            Ensure.That(min <= max);
            return random.NextDouble() * (max - min) + min;
        }
    }
}