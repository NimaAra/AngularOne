(function (module) {
    "use strict";

    service.$inject = ["$uibModal"];
    function service($uibModal) {
        return function (file) {

            function controller() {
                const vm = this;
                vm.file = file;
            }

            const options = {
                templateUrl: "client/app/file-removal-confirmation/fileRemovalConfirmation.html",
                controller: controller,
                controllerAs: "vm"
            };

            return $uibModal.open(options).result;
        };
    }

    module.factory("fileRemovalConfirmation", service);
})(angular.module("app"));

