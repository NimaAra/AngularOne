(function (module) {
    "use strict";

    service.$inject = ["$rootScope"];
    function service($rootScope) {
        return {
            publish: publish,
            subscribe: subscribe,
            getEventSubscriberCount: getEventSubscriberCount
        };

        function publish(eventName, payload) {
            $rootScope.$emit(eventName, payload);
        }

        function subscribe(eventName, handler) {
            const token = $rootScope.$on(eventName, function (evt, payload) {
                handler(payload);
            });
            return {
                dispose: token
            };
        }

        function getEventSubscriberCount(eventName) {
            if (!$rootScope.$$listeners[eventName]) { return 0; }
            return $rootScope.$$listeners[eventName].length;
        }
    }

    module.factory("messageHub", service);
})(angular.module("common"));