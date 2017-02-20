(function (module) {
    "use strict";

    service.$inject = ["$window"];
    function service($window) {

        const store = $window.localStorage;

        return {
            add: add,
            get: get,
            remove: remove
        };

        function add(key, value) {
            store.setItem(key, angular.toJson(value));
        }

        function get(key) {
            let value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(key);
        }
    }

    module.factory("localStorage", service);
})(angular.module("common"));

