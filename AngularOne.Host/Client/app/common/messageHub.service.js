(function (module) {
    "use strict";

    service.$inject = ["$rootScope"];
    function service($rootScope) {
        return {
            publish: publish,
            subscribe: subscribe
        };

        function publish(eventName, payload) {
            $rootScope.$broadcast(eventName, payload);
        }

        function subscribe(eventName, handler) {
            const token = $rootScope.$on(eventName, function (evt, payload) {
                handler(evt.name, payload);
            });
            return {
                dispose: token
            };
        }
    }

    module.factory("messageHub", service);
})(angular.module("common"));