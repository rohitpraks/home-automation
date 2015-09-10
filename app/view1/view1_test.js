/*Unit tests for view1.js*/
'use strict';
/*global describe, beforeEach, afterEach, it, expect, inject*/
/*jshint expr: true */
(function () {
    "use strict";

    describe("modules.viewCtrl", function () {
    	var tempService, controller, scope;
        beforeEach(function () {
        	module("myApp.service");
            module("myApp.view1");
        });
        beforeEach(function () {
	        inject(function ($injector) {
	            tempService = $injector.get('temperatureService');
	        });
	    });
        beforeEach(function () {
            inject(function($rootScope, $controller, $httpBackend) {
                scope = $rootScope.$new();
                tempService.fetchTemperature = function(){
                	var deferred = {
                		then:function(cb){
                			cb();
                		}
                	}
                	return deferred;
                };
                // PhantomJS doesn't support bind yet
				Function.prototype.bind = Function.prototype.bind || function (thisp) {
				    var fn = this;
				    return function () {
				        return fn.apply(thisp, arguments);
				    };
				};
                $httpBackend.whenGET("api/temperature").respond([]);
                $httpBackend.whenPOST("api/temperature").respond([]);
                controller = $controller("View1Ctrl", {
                    $scope: scope
                });
                scope.$digest();

            });
        });
        it("should exist", function () {
            expect(controller).toBeDefined;
            expect(scope.currentTemperature).toBeDefined;
            expect(scope.previousTemperature).toBeDefined;
            expect(scope.tempChangeAreaChartData).toBeDefined;
        });

        it("should check the values the variables are assigned with", function () {
            expect(scope.currentTemperature).toEqual(0);
            expect(scope.previousTemperature).toEqual(0);
            expect(scope.tempChangeAreaChartData).toEqual([
		        {
		            "key": "Change in Temperature",
		            "values": [ [ 0 , 16],[8, 16], [9.6, 16], [11.2, 16], [12.8, 16], [14.4, 16], [16, 16]]
		        }
		    ]);
        });

        it("change temperature method should rotate values for tempChangeAreaChartData if dataOnOff is set to true", function () {
        	scope.dataOnOff = true;
        	scope.changeTemperature(50);
            expect(scope.currentTemperature).toEqual(50);
            expect(scope.previousTemperature).toEqual(0);
            expect(scope.tempChangeAreaChartData).toEqual([
		        {
		            "key": "Change in Temperature",
		            "values": [[8, 16], [9.6, 16], [11.2, 16], [12.8, 16], [14.4, 16], [16, 16], [ 0 , 16]]
		        }
		    ]);
        });
    });

}).call(this);