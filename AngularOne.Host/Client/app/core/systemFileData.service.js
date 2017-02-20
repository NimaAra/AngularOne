(function(module) {
    "use strict";

    service.$inject = ["$http"];
    function service($http) {
        const endpoint = "api/system/files";
        return {
            getFiles : getFiles
        };

        function getFiles(directory, searchPattern, skip, take) {
            return $http.get(endpoint, {
                params: {
                    directory: directory,
                    searchPattern: searchPattern,
                    skip: skip,
                    take: take
                }
            })
            .then(resp => resp.data);
        }
    }

    module.factory("systemFileData", service);
})(angular.module("app.core"));