(function(module) {
    "use strict";

    controller.$inject = ["appRoutes", "alerter"];
    function controller(routes, alerter) {
        const vm = this;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.$onDestroy = onDestroy;
        
        vm.routes = [];

        function onInit() {
            vm.routes = routes;
            alerter.info("All routes initialized");
        }

        function onChanges(changes) {
        }

        function onDestroy() {
        }
    }

    const component = {
        templateUrl: "client/app/core/nav-bar/navBar.html",
        controller: controller,
        controllerAs: "vm",
        transclude: false,
        bindings: {}
    };

    module.component("navBar", component);
})(angular.module("app.core.navigation"));