namespace AngularOne.Host
{
    using System;
    using System.Reflection;
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Infrastructure;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Owin;

    public sealed class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureSignalRCasing();

            app.MapSignalR();
        }

        private static void ConfigureSignalRCasing()
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new SignalRContractResolver()
            };
            var serializer = JsonSerializer.Create(settings);
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);
        }
    }

    public class SignalRContractResolver : IContractResolver
    {

        private readonly Assembly _assembly;
        private readonly IContractResolver _camelCaseContractResolver;
        private readonly IContractResolver _defaultContractSerializer;

        public SignalRContractResolver()
        {
            _defaultContractSerializer = new DefaultContractResolver();
            _camelCaseContractResolver = new CamelCasePropertyNamesContractResolver();
            _assembly = typeof(Connection).Assembly;
        }

        public JsonContract ResolveContract(Type type)
        {
            if (type.Assembly.Equals(_assembly))
            {
                return _defaultContractSerializer.ResolveContract(type);
            }

            return _camelCaseContractResolver.ResolveContract(type);
        }
    }
}