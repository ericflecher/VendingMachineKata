'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.service('Alert', function () {
    return {};
})

.service('AcceptedCoins', function () {
    return { 
    			'nickels': 0, 
    			'dimes': 0,
    			'quarters': 0,
    			'pennies':0
    		};
})

.service('AcceptRules', function () {
    return { 
    			'magneticSigPlastic': 0, 
    			'magneticSigSteel': 1,
    			'magneticCoinSig': 3, 
    			'dimesDiaMM': 17.9,
    			'quartersDiaMM': 24.26,
    			'nickelsDiaMM': 21.21,
    			'nickelsDiaMMShield': 20.5
    		};
})


.controller('View1Ctrl', ['$scope', 'Alert', 'AcceptedCoins', 'AcceptRules', function($scope, Alert, AcceptedCoins, AcceptRules) {

	//set currance symbol
	$scope.currencySymbol = 'USD$';

	$scope.alert = Alert;
	$scope.acceptedCoins = AcceptedCoins;
	$scope.alert = 'INSERT COIN';


	//process a thing "coin"
	$scope.processCoin = function(thing){
		console.log("dia: " + thing.dia + " mag: " + thing.mag);
		var acceptRules = AcceptRules;

		if(thing.mag == acceptRules.magneticCoinSig)
		{
			if(thing.dia == acceptRules.dimesDiaMM)
			{
				console.log("dime");
				$scope.acceptedCoins.dimes += 1;
				$scope.alert = 'Accepted!';
			}
			else if(thing.dia == acceptRules.quartersDiaMM)
			{
				console.log("quarter");
				$scope.acceptedCoins.quarters += 1;
				$scope.alert = 'Accepted!';
			}
			else if(thing.dia == acceptRules.nickelsDiaMM)
			{
				console.log("nickel");
				$scope.acceptedCoins.nickels += 1;
				$scope.alert = 'Accepted!';
			}
			else 
			{
				console.log("not accepted return to tray");
				$scope.alert = 'Not accpeted tender. Check tray and INSERT COIN';
			}
		}
		else
		{
			console.log("not a coin");
			$scope.alert = 'Not accpeted tender. Check tray and INSERT COIN';
		}

	};

	//Updates total amount 
	$scope.totalAmount = function(){
		return ($scope.acceptedCoins.nickels * .05) + ($scope.acceptedCoins.dimes * .10) + ($scope.acceptedCoins.quarters * .25) + ($scope.acceptedCoins.pennies * .01);
	};





	///////// Unit test test //////

	$scope.password = '';
	  $scope.grade = function() {
	    var size = $scope.password.length;
	    if (size > 8) {
	      $scope.strength = 'strong';
	    } else if (size > 3) {
	      $scope.strength = 'medium';
	    } else {
	      $scope.strength = 'weak';
	    }
	 };

	 /////////Unit test test end ////


}]);