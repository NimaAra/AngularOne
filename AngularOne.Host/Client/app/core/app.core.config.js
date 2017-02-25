(function (module) {
    'use strict';

    configure.$inject = ["$compileProvider", "$httpProvider"];
    function configure($compileProvider, $httpProvider) {
        
        /* *** Disable for tests *** */

        // if you wish to debug an app then open console
        // and run angular.reloadWithDebugInfo();
        $compileProvider.debugInfoEnabled(false);
        
        $compileProvider.commentDirectivesEnabled(false);
        //$compileProvider.cssClassDirectivesEnabled(false);

        // batches all the $http results coming back at the 
        // near same time (within ~10ms) to run all within the same digest cycle
        $httpProvider.useApplyAsync(true);
    }

    module.config(configure);
})(angular.module("app.core"));