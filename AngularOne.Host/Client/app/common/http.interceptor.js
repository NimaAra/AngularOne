(function (module) {
	"use strict";

	interceptor.$inject = ["$q"];
	function interceptor($q) {
		let requestCount = 0;

		return {
			request: request,
			response: response,
			requestError: requestError,
			responseError: responseError,
			getRequestCount: getRequestCount
		};

		function request(config) {
			requestCount += 1;
			return $q.when(config);
		}

		function requestError(error) {
			requestCount -= 1;
			return $q.reject(error);
		}

		function response(resp) {
			requestCount -= 1;
			return $q.when(resp);
		}

		function responseError(error) {
			requestCount -= 1;
			return $q.reject(error);
		}

		function getRequestCount() {
			return requestCount;
		}
	}

	const id = "httpInterceptor";

	configureIterceptor.$inject = ["$httpProvider"]
	function configureIterceptor($httpProvider) {
		$httpProvider.interceptors.push(id);
	}

	module
        .factory(id, interceptor)
        .config(configureIterceptor);
})(angular.module("common"));