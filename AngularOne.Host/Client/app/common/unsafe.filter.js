(function (module) {
    "use strict";

    module.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });

})(angular.module("common"));