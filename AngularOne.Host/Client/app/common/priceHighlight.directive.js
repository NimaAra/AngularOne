(function(module){
	
    directive.$inject = ["$timeout"];
    function directive($timeout) {
        function linker(scope, element, attrs) {            
            const timeoutValue = parseInt(attrs.priceHighlightTimeout);
            scope.$watch(attrs.priceHighlight, (newVal, oldVal) => {
                if(newVal === oldVal) { return; }

                const className = newVal > oldVal ? "price-highlight-up" : "price-highlight-down";

                element.addClass(className);
                $timeout(() => {
                    element.removeClass(className);                    
                }, timeoutValue);
            });
        }
	
        return {
            restrict: "A", // E = element, A = attribute, C = class, M = comment              
            transclude: false,            
            link: linker
        };	
    }

    module.directive("priceHighlight", directive);
})(angular.module("common"));