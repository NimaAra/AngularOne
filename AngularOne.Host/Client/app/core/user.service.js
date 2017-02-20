(function(module) {
    "use strict";

    service.$inject = [];
    function service() {
        return {
            username: "",
            firstName: "",
            lastName: "",
            age: 0
        };
    }

    module.factory("user", service); 
})(angular.module("app.core"));
	
	