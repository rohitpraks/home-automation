'use strict';

angular.module('myApp.view1', ['ngRoute','nvd3ChartDirectives'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeAutomation', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope","$http","temperatureService",function($scope, $http, temperatureService) {
	function initialize(){
		$scope.currentTemperature = 0;
		$scope.previousTemperature = 0;
		$scope.tempChangeAreaChartData = [
	        {
	            "key": "Change in Temperature",
	            "values": [ [ 0 , 16],[8, 16], [9.6, 16], [11.2, 16], [12.8, 16], [14.4, 16], [16, 16]]
	        }
	    ];
	}

    initialize();

    $scope.xAxisTickFormat = function(){
        return function(d){
            return d;
        }
    };
    $scope.yAxisTickFormat = function(){
        return function(d){
            return d;
        }
    };

    $scope.toolTipContentFunction = function(){
        return function(key, x, y, e, graph) {
            return  'Super New Tooltip' +
                    '<h1>' + key + '</h1>' +
                    '<p>' +  y + ' at ' + x + '</p>'
        }
    };

    function rotate( array , times ){
	    array = array.slice();
	    while( times-- ){
	     var temp = array.shift();
	     array.push( temp )
	    }
	    return array;
	}
  // when submitting the add form, send the text to the node API
    $scope.changeTemperature = function(changedTemperatureValue) {
    	if($scope.dataOnOff===true){
    		$scope.previousTemperature = angular.copy($scope.currentTemperature);
	    	$scope.currentTemperature = changedTemperatureValue;
	    	//Due to lack of time I am just rotating the list of values in $scope.tempChangeAreaChartData variable to represent temperature change.
			var tempArray = rotate($scope.tempChangeAreaChartData[0].values, 1);
			$scope.tempChangeAreaChartData = [];
			$scope.tempChangeAreaChartData.push({
				"key": "Change in Temperature",
				"values":tempArray
			});
			//Fetch object that contains the json response for temperature change.
	    	temperatureService.fetchTemperature().then(function(response){
	    		console.log(response, "The response object with all the temperature change information returned by node");
	    	});
	    	//Set new temperature value.
	    	temperatureService.setTemperature({}).then(function(data){
	    		console.log(data, " Changed temperature posted successfully ")
	    	});
    	}
    };

}]);