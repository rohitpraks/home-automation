'use strict';
angular.module("myApp.service",[])
    .factory("temperatureService", ["$q","$http", function($q, $http) {

        return {
            deferred: $q.defer(),

            fetchTemperature: function () {
                var request, config;

                config = {
                    method: "GET",
                    url: "api/temperature",
                    cache: false
                };

                request = $http(config);
                request.success(this.fetchSuccess.bind(this));

                this.deferred.resolve(request);

                return this.deferred.promise;

            },

            fetchSuccess: function (response) {
                return response;
            },

            setTemperature: function(temp) {
                var request, config;

                config = {
                    method: "POST",
                    url: "api/temperature",
                    cache: false,
                    data: temp
                };

                request = $http(config);
                request.success(this.setSuccess.bind(this));

                this.deferred.resolve(request);

                return this.deferred.promise;
            },
            setSuccess: function (response) {
                return response;
            }
        };
}]);
