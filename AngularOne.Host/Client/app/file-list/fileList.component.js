(function (module) {
    "use strict";

    controller.$inject = ["systemFileData", "alerter", "ngProgressFactory", "$state"];
    function controller(dataService, alerter, ngProgressFactory, $state) {
        const vm = this;

        vm.$onInit = onInit;

        vm.files = [];
        vm.directory = "C:\\";
        vm.searchPattern = "*.txt";
        vm.skip = 0;
        vm.take = 10;
        vm.getFiles = getFiles;
        vm.getFileDetail = getFileDetail;

        let ngProgress = null;

        function onInit() {
            ngProgress = ngProgressFactory.createInstance();
            getFiles();
        }

        function getFiles() {
            ngProgress.start();
            vm.files = [];
            dataService
                .getFiles(vm.directory, vm.searchPattern, vm.skip, vm.take)
                .then(data => {
                    vm.files = data;
                })
                .catch(alerter.error)
                .finally(() => ngProgress.complete());
        }

        function getFileDetail(file) {
            $state.go("FileDetail", { filePath: file.fullName });
        }
    }

    const component = {
        templateUrl: "client/app/file-list/fileList.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("fileList", component);
})(angular.module("app"));