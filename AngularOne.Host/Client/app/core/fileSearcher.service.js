(function(module) {
    "use strict";

    service.$inject = ["$http"];
    function service($http) {
        const endpoint = "api/system/fileSearch";
        return {
            search: search
        };

        function search(query) {
            return $http.get(endpoint, {
                params: { query: query }
            })
            .then(resp => resp.data);
        }
    }

    module.factory("fileSearcher", service);
})(angular.module("app.core"));