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

.service('Products', function () {
    return { 
    			'inventory': 
    				[
	    				{
	    					'sku': 1,
	    					'name': "Tiny Tim: Tip Toe Through the Tulips",
	    					'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:3LtA6xUfw191QIC9bPjpcU\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
	    					'price': 20.00,
	    					'stock': 10
	    				},
	    				{
	    					'sku': 2,
	    					'name': "Genisis: Invisable Touch",
	    					'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:0xpBr84T3FTm9j4D1MdPtk\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
	    					'price': 0.10,
	    					'stock': 1
	    				},
	    				{
	    					'sku': 3,
	    					'name': "Phil Collins: Sussuidio",
	    					'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:07zkNvtcmPOFlMOXbma13k\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
	    					'price': 0.05,
	    					'stock': 4
	    				},
	    				{
	    					'sku': 4,
	    					'name': "John Parr: St. Elmos Fire",
	    					'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:1A2PWRltFrX8iB8IP3CUgo\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
	    					'price': 0.55,
	    					'stock': 4
	    				},
	    				{
	    					'sku': 5,
	    					'name': "Milky Chance: Stolen Dance",
	    					'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:6vECYJHxYmm3Ydt3fF01pE\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
	    					'price': 0.75,
	    					'stock': 7
	    				}
    				]

    		};
})


.controller('View1Ctrl', ['$scope','$sce', 'Alert', 'AcceptedCoins', 'AcceptRules', 'Products', function($scope, $sce, Alert, AcceptedCoins, AcceptRules, Products) {

	//set currance symbol
	$scope.currencySymbol = '$';

	$scope.alert = Alert;
	$scope.acceptedCoins = AcceptedCoins;
	$scope.alert = 'INSERT COIN';
	$scope.tray = 0;

	//Get and load products
	var products = Products;
	$scope.products = products.inventory;




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
				$scope.tray += .01
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

	$scope.returnCoins = function (){

		$scope.tray += $scope.totalAmount();

		$scope.acceptedCoins.dimes = 0;
		$scope.acceptedCoins.quarters = 0;
		$scope.acceptedCoins.nickels = 0;

		$scope.alert = 'INSERT COIN';
		$scope.totalAmount();

	};

	//Clear Change Tray
	$scope.clearTray = function(){
		$scope.tray = 0;
	};

	//Processes Vending Request
	$scope.processVendingRequest = function(product){


		if(product.stock < 1)
		{
			$scope.alert = "SOLD OUT"
		}
		else if($scope.totalAmount() < product.price)
		{
			$scope.alert = "EXACT CHANGE ONLY";
		}
		else
		{
			if (product.price%.25 == 0)
			{
				var multiple;
				multiple = product.price / .25;
				$scope.acceptedCoins.quarters -= multiple;

			}	
			else if (product.price%.10 == 0)
			{
				var multiple;
				multiple = product.price / .10;
				$scope.acceptedCoins.dimes -= multiple;
			}
			else if (product.price%.05 == 0)
			{
				var multiple;
				multiple = product.price / .05;
				$scope.acceptedCoins.nickels -= multiple;
			}

			$scope.reduceStock(product);
			$scope.trustedHtml = $sce.trustAsHtml(product.iFrame);
			$scope.returnCoins();
		}



	};

	$scope.reduceStock = function(product){

		var i = 0;
		  $scope.products.forEach(function(p) {

		  	if(p.sku == product.sku)
		  	{
		  		$scope.products[i].stock -= 1;
		  	}

		  	i++;

		  });
	};




}]);