(function(module) {
    "use strict";

    controller.$inject = ["$stateParams"];
    function controller($stateParams) {
        const vm = this;

        vm.$onInit = onInit;
        vm.filePath = "";

        function onInit() {
            vm.filePath = $stateParams.filePath;
        }
    }

    const component = {
        templateUrl: "client/app/file-detail/fileDetail.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("fileDetail", component);
})(angular.module("app"));