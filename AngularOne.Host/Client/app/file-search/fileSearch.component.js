(function(module) {
    "use strict";

    controller.$inject = ["fileSearcher"];
    function controller(fileSearcher) {
        const vm = this;

        vm.$onInit = onInit;
        vm.selectd = {};
        vm.getFiles = getFiles;
        vm.formatSearchResult = formatSearchResult;

        function onInit() {
            
        }

        function getFiles(value) {
            return fileSearcher.search(value);
        }

        function formatSearchResult(item) {
            return `${item.fileName} | ${item.fullName}`;
        }
    }

    const component = {
        templateUrl: "client/app/file-search/fileSearch.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("fileSearch", component);
})(angular.module("app"));