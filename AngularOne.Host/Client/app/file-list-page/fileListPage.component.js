(function (module) {
    "use strict";

    controller.$inject = ["systemFileData", "alerter", "ngProgressFactory", "$state", "fileRemovalConfirmation"];
    function controller(dataService, alerter, ngProgressFactory, $state, fileRemovalConfirmation) {
        const vm = this;

        vm.$onInit = onInit;

        vm.files = [];
        vm.directory = "D:\\";
        vm.searchPattern = "*.txt";

        vm.itemsPerPage = 15;
        vm.totalItems = 1000; // toDo, this should be set dynamically
        vm.currentPage = 0;
        vm.pageChanged = pageChanged;
        vm.maxPageSizeToDisplay = 10;
        vm.getFileDetail = getFileDetail;
        vm.delete = deleteFile;


        const take = vm.itemsPerPage;
        let skip = 0;

        let ngProgress = null;

        function onInit() {
            ngProgress = ngProgressFactory.createInstance();
            getFiles();
        }

        function getFiles() {
            ngProgress.start();
            vm.files = [];
            dataService
                .getFiles(vm.directory, vm.searchPattern, skip, take)
                .then(data => {
                    vm.files = data;
                    
                })
                .catch(alerter.error)
                .finally(() => ngProgress.complete());
        }

        function getFileDetail(file) {
            $state.go("FileDetail", { filePath: file.fullName });
        }

        function pageChanged() {
            skip = (vm.currentPage - 1) * vm.itemsPerPage;
            getFiles();
        }

        function deleteFile(file) {
            fileRemovalConfirmation(file)
                .then(() => {
                    var idx = vm.files.indexOf(file);
                    vm.files.splice(idx, 1);
                    alerter.warn(`Removed: ${file.fileName}`);
                })
                .catch(() => /ignore/);
        }
    }

    const component = {
        templateUrl: "client/app/file-list-page/fileListPage.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("fileListPage", component);
})(angular.module("app"));