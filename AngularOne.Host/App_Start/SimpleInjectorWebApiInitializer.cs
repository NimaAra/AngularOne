[assembly: WebActivator.PostApplicationStartMethod(typeof(AngularOne.Host.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace AngularOne.Host.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>
        /// Initialize the container and register it as Web API Dependency Resolver.
        /// </summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }

        private static void InitializeContainer(Container container)
        {
            // For instance:
            // container.Register<IUserRepository, SqlUserRepository>(Lifestyle.Scoped);
            // container.Register<IPricing, Pricing>(Lifestyle.Singleton);
        }
    }
}