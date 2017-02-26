(function(module) {
    "use strict";

    controller.$inject = ["$q", "alerter", "priceHub", "messageHub", "ngProgressFactory", "localStorage"];
    function controller($q, alerter, priceHub, messageHub, ngProgressFactory, localStorage) {
        const vm = this;
        
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;

        vm.portfolioList = [];
        vm.companyMatched = false;
        vm.selectedCompany = undefined;
        vm.onCompanySearch = onCompanySearch;
        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;
        vm.companySearchFormatter = companySearchFormatter;
        vm.onCompanySelected = onCompanySelected;
        vm.canSavePortfolio = canSavePortfolio;
        vm.canLoadPortfolio = canLoadPortfolio;
        vm.savePortfolio = savePortfolio;
        vm.restorePortfolio = restorePortfolio;
        vm.orderPortfolio = orderPortfolio;

        let progressBar = undefined;
        let priceSubscriber = undefined;
        let companySearchResultSubscriber = undefined;
        let searchPromise = undefined;
        let isPortfolioDirty = true;

        function onInit() {
            progressBar = ngProgressFactory.createInstance();
            progressBar.setParent(document.getElementById("ngProgress-companySearchBox"));
            priceSubscriber = messageHub.subscribe("priceHub.onPrice",
                payload => {
                    
                    let symbol = payload.company.symbol;
                    let idx = _.findIndex(vm.portfolioList, x => x.symbol == symbol);
                    
                    if(idx >= 0) { 
                        vm.portfolioList[idx].price = payload.value, 2;
                    }
                });
                
            companySearchResultSubscriber = messageHub.subscribe("priceHub.onCompanySearchResult",
                result => {
                    progressBar.complete();
                    if (result.length) {
                        searchPromise.resolve(result);
                    } else {
                        searchPromise.reject();
                    }                    
                });
        }

        function onDestroy() {
            priceHub.unsubscribe(vm.ticker);
            priceSubscriber.dispose();
            companySearchResultSubscriber.dispose();
        }

        function onCompanySearch(query) {            
            vm.companyMatched = false;
            progressBar.start();

            searchPromise = $q.defer();            
            priceHub.searchCompaniesByName(query);
            return searchPromise.promise;
        }

        function subscribe(company) {
            let idx = _.findIndex(vm.portfolioList, x => x.symbol == company.symbol);
            
            if(idx === -1) { 
                vm.portfolioList.push(company);
                isPortfolioDirty = true;
                priceHub.subscribe(company.symbol);
            }

            vm.selectedCompany = undefined;
            vm.companyMatched = false;
        }

        function unsubscribe(company) {
            let idx = _.findIndex(vm.portfolioList, x => x.symbol == company.symbol);
            
            if(idx !== -1) { 
                vm.portfolioList.splice(idx, 1);
                isPortfolioDirty = true;
                priceHub.unsubscribe(company.symbol);
            }            
        }

        function companySearchFormatter(value) {
            if (!value) { return ""; }
            return `${value.symbol} - ${value.name}`;
        }

        function onCompanySelected(item, model, label) {
            vm.companyMatched = true;
        }

        function canSavePortfolio() {
            return vm.portfolioList.length > 0 && isPortfolioDirty;
        }

        function canLoadPortfolio() {
            return localStorage.containsKey("user.portfolio") && isPortfolioDirty;
        }

        function savePortfolio() {
            localStorage.set("user.portfolio", vm.portfolioList);
            alerter.success("Portfolio saved sucessfully.");
            isPortfolioDirty = false;
        }

        function restorePortfolio() {
            let portfolio = localStorage.get("user.portfolio");
            
            if(!portfolio) {
                alerter.warn("Portfolio could not be loaded.");
            }
            
            vm.portfolioList.splice(0, vm.portfolioList.length);
            portfolio.forEach(subscribe);
            isPortfolioDirty = false;
            alerter.success("Portfolio loaded sucessfully.");
        }

        function orderPortfolio(column, isAscending) {            
            let tmpArray = _.sortBy(vm.portfolioList, column);

            if(isAscending) {
               vm.portfolioList = tmpArray; 
            } else {
                vm.portfolioList = tmpArray.reverse();
            }
        }
    }

    const component = {
        templateUrl: "client/app/portfolio/portfolio.html",
        controller: controller,
        controllerAs: "vm"
    };

    module.component("portfolio", component);
})(angular.module("app"));