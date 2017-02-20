(function(module) {
    "use strict";

    templateUrlFactory.$inject = ["$element", "$attrs"];
    function templateUrlFactory(element, attrs) {
        return "client/app/forms/formResult.html";
    }

    controller.$inject = ["user"];
    function controller(user) {
        const vm = this;

        vm.$onInit = onInit;
        vm.user = user;

        function onInit() {
        }
    }

    const component = {
        controller: controller,
        controllerAs: "vm",
        templateUrl: templateUrlFactory,
        transclude: false,
        bindings: {}
    };

    module.component("formResult", component);
})(angular.module("app"));