(function() {
    "use strict";

    const appName = "app";
    angular.module(appName, [
        "app.core",
        "app.core.navigation",
        "common"
    ]);

    angular.element(document).ready(() => {
        angular.bootstrap(document.body, [appName], {
            strictDi: true
        });    
    });    
})();