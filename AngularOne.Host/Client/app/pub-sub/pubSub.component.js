(function(module) {
    "use strict";

    controller.$inject = ["$interval", "messageHub"];
    function controller($interval, messageHub) {
        const vm = this;
        const eventName = "pub.sub";
        const publisherInterval = 100;

        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;

        vm.payload = {};
        vm.publicationCount = 0;
        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;
        vm.publish = publish;
        vm.unpublish = unpublish;
        vm.getSubscriberCount = getSubscriberCount;
        vm.subscriberCount = 0;

        let intervalPromise = undefined;
        let subscriber = undefined;

        function onInit() {
        }
        
        function onDestroy() {
            if (vm.type === "pub") {
                unpublish();
            } else if (vm.type === "sub") {
                unsubscribe();
            }
        }

        function publish() {
            if (intervalPromise) {
                unpublish();
            }

            intervalPromise = $interval(() => {
                messageHub.publish(eventName, { date: new Date() });
                vm.publicationCount++;
            }, publisherInterval);
        }

        function unpublish() {
            $interval.cancel(intervalPromise);
        }

        function subscribe() {
            if (subscriber) {
                unsubscribe();
            }

            subscriber = messageHub.subscribe(eventName, payload => {
                vm.payload = payload;
            });
        }

        function unsubscribe() {
            if (subscriber) {
                subscriber.dispose();
            }
        }

        function getSubscriberCount() {
            vm.subscriberCount = messageHub.getEventSubscriberCount(eventName);
        }
    }

    const component = {
        templateUrl: "client/app/pub-sub/pubSub.html",
        controller: controller,
        controllerAs: "vm",
        bindings: {
            type: "@"
        }
    };

    module.component("pubSub", component);
})(angular.module("app"));