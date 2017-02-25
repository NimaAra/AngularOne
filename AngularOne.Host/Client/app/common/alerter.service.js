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

        function success(msg, object) {
            dispatch(toastr.success, msg, object);            
        }

        function info(msg, object) {
            dispatch(toastr.info, msg, object);
        }

        function warn(msg, object) {
            dispatch(toastr.warning, msg, object);
        }

        function error(msg, object) {
            dispatch(toastr.error, msg, object);
        }

        function dispatch(fn, msg, object) {
            if(object) {
                const json = JSON.stringify(object);
                
                console.log(msg, object);
                fn(json, msg);                
            } else {
                console.log(msg);
                fn(msg, "");
            }
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