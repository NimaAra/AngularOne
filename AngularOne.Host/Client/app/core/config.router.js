(function (module) {
    "use strict";

    const routes = [
        {
            name: "Home",
            url: "/",
            template: "<h3>Welcome buddy!</h3>"
        },
        {
            name: "About",
            url: "/about",
            template: "<h3>This is all about ...</h3>"
        },
        {
            name: "Files",
            url: "/files",
            template: "<file-list></file-list>"
        },
        {
            name: "Files-Page",
            url: "/filesPage",
            template: "<file-list-page></file-list-page>"
        },
        {
            name: "FileDetail",
            url: "/file-detail/{filePath}",
            template: "<file-detail></file-detail>",
            hide: true
        },
        {
            name: "FileSearch",
            url: "/file-search",
            template: "<file-search></file-search>"
        },
        {
            name: "Forms",
            url: "/forms",
            template: "<forms></forms>"
        },
            {
                name: "Forms.result",
                parent: "Forms",
                template: "<form-result></form-result>",
                hide: true
            }
    ];

    configureRouter.$inject = ["$stateProvider", "$urlMatcherFactoryProvider", "$urlRouterProvider", "$locationProvider"];
    function configureRouter($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
        routes.forEach(state => {
            $stateProvider.state(state);
        });
        $urlRouterProvider.otherwise("/");

        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("");
    }

    module
        .config(configureRouter)
        .constant("appRoutes", routes);
})(angular.module("app.core"));