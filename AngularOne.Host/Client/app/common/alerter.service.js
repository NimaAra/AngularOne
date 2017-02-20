(function(module) {
    "use strict";

    service.$inject = ["toastr", "toastrConfig"];
    function service(toastr, toastrConfig) {

        configureToastr(toastrConfig);

        return {
            success: success,
            info: info,
            warn: warn,
            error: error
        };

        function success(msg) {
            console.log(msg);
            toastr.success(msg, "");
        }

        function info(msg) {
            console.log(msg);
            toastr.info(msg, "");
        }

        function warn(msg) {
            console.log(msg);
            toastr.warning(msg, "");
        }

        function error(msg) {
            console.log(msg);
            toastr.error(msg, "");
        }

        function configureToastr(config) {
            config.autoDismiss = true;
            config.allowHtml = false;
            config.positionClass = "toast-top-right";
            config.timeOut = 5000;
            config.extendedTimeOut = 1000;
            config.closeButton = false;
            config.tapToDismiss = true;
            config.progressBar = false;
            config.closeHtml = "<button>&times;</button>";
            config.newestOnTop = true;
            config.maxOpened = 0;
            config.preventDuplicates = false;
            config.preventOpenDuplicates = false;
        }
    }

    module.factory("alerter", service);

})(angular.module("common"));