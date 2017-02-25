(function (module) {
    "use strict";

    service.$inject = ["$rootScope", "alerter", "Hub", "messageHub"];
    function service($rootScope, alerter, Hub, messageHub) {

        const hubId = "priceHub";
        //declaring the hub connection
        const hub = new Hub(hubId, getConfig());

        return {
            id: hubId,
            searchCompaniesByName: searchCompaniesByName,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };

        function searchCompaniesByName(query) {
            // calling a server method
            hub.searchCompaniesByName(query);
        }

        function subscribe(symbol) {
            // calling a server method
            hub.subscribe(symbol);
        }

        function unsubscribe(symbol) {
            // calling a server method
            hub.unsubscribe(symbol);
        }

        function getConfig() {
            return {
                // client side methods
                listeners: {
                    "onNewConnection": function (id) {
                        messageHub.publish("priceHub.onNewConnection", id);
                        $rootScope.$evalAsync();
                        alerter.info(`[${hubId}] - onNewConnection: ${id}`);
                    },
                    "removeConnection": function (id) {
                        messageHub.publish("priceHub.removeConnection", id);
                        $rootScope.$evalAsync();
                        alerter.warn(`[${hubId}] - removeConnection: ${id}`);
                    },
                    "onPrice": function (price) {
                        messageHub.publish("priceHub.onPrice", price);
                        $rootScope.$evalAsync();
                    },
                    "onCompanySearchResult": function (result) {
                        messageHub.publish("priceHub.onCompanySearchResult", result);
                        $rootScope.$evalAsync();
                    },
                    "onSubscription": function (symbol) {
                        messageHub.publish("priceHub.onSubscription", symbol);
                        $rootScope.$evalAsync();
                        alerter.info(`[${hubId}] - onSubscription: ${symbol}`);
                    },
                    "onUnsubscription": function (symbol) {
                        messageHub.publish("priceHub.onUnsubscription", symbol);
                        $rootScope.$evalAsync();
                        alerter.warn(`[${hubId}] - onUnsubscription: ${symbol}`);
                    }
                },

                //server side methods
                methods: ["searchCompaniesByName", "subscribe", "unsubscribe"],

                //query params sent on initial connection
                queryParams: {
                    "foo": "bar"
                },

                //handle connection error
                errorHandler: function (error) {
                    alerter.error(`${hubId}] - error:`, error);
                },

                transport: ['webSockets', 'longPolling'],

                //specify a non default root
                //rootPath: '/api

                stateChanged: function (state) {
                    switch (state.newState) {
                        case $.signalR.connectionState.connecting:
                            //your code here
                            break;
                        case $.signalR.connectionState.connected:
                            //your code here
                            break;
                        case $.signalR.connectionState.reconnecting:
                            //your code here
                            break;
                        case $.signalR.connectionState.disconnected:
                            //your code here
                            break;
                    }
                }
            };
        }
    }

    module.factory("priceHub", service);
})(angular.module("app.core"));