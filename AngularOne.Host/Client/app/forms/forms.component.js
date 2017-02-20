(function(module) {
    "use strict";

    controller.$inject = ["$state", "user"];
    function controller($state, user) {
        const vm = this;

        vm.$onInit = onInit;
        vm.submit = submit;
        vm.user = user;

        function onInit() {
        }

        function submit() {
            $state.go("Forms.result");
        }
    }

    const component = {
        templateUrl: "client/app/forms/forms.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("forms", component);
})(angular.module("app"));