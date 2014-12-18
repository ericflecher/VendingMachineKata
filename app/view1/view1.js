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

.service('CoinBalance', function () {
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


.controller('View1Ctrl', ['$scope','$sce', 'Alert', 'AcceptedCoins', 'AcceptRules', 'Products','CoinBalance',  function($scope, $sce, Alert, AcceptedCoins, AcceptRules, Products, CoinBalance) {

	//set currance symbol
	$scope.currencySymbol = '$';

	$scope.alert = Alert;
	$scope.acceptedCoins = AcceptedCoins;
	$scope.alert = 'INSERT COIN';
	$scope.tray = 0;

	//Get and load products
	var products = Products;
	$scope.products = products.inventory;

	//Get Coin Balance
	$scope.coinBalance = CoinBalance;

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
				$scope.coinBalance.dimes += 1;
				$scope.alert = 'Accepted!';
			}
			else if(thing.dia == acceptRules.quartersDiaMM)
			{
				console.log("quarter");
				$scope.acceptedCoins.quarters += 1;
				$scope.coinBalance.quarters += 1;
				$scope.alert = 'Accepted!';
			}
			else if(thing.dia == acceptRules.nickelsDiaMM)
			{
				console.log("nickel");
				$scope.acceptedCoins.nickels += 1;
				$scope.coinBalance.nickels += 1;
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
	$scope.totalAmount = function(x){
		return (x.nickels * .05) + (x.dimes * .10) + (x.quarters * .25) + (x.pennies * .01);
	};

	$scope.returnCoins = function (){

		$scope.tray += $scope.totalAmount($scope.acceptedCoins);

		//Reduce machine balance
		$scope.coinBalance.dimes -= $scope.acceptedCoins.dimes;
		$scope.coinBalance.quarters -= $scope.acceptedCoins.quarters;
		$scope.coinBalance.nickels -= $scope.acceptedCoins.nickels;

		//Clear accepted coins
		$scope.acceptedCoins.dimes = 0;
		$scope.acceptedCoins.quarters = 0;
		$scope.acceptedCoins.nickels = 0;

		$scope.alert = 'INSERT COIN';
		$scope.totalAmount($scope.acceptedCoins);

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
		else if($scope.totalAmount($scope.acceptedCoins) < product.price)
		{
			$scope.alert = "EXACT CHANGE ONLY";
		}
		else
		{	

			if($scope.exactChange(product.price))
			{

				$scope.reduceStock(product);
				$scope.trustedHtml = $sce.trustAsHtml(product.iFrame);
			}
			

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

	$scope.exactChange = function(price){

		var calculateBalance = $scope.acceptedCoins;
		console.log(calculateBalance);
		var paid = 0;
		var possibleChange = ($scope.totalAmount($scope.acceptedCoins)-price);
		price = price * 100;
		possibleChange = Math.round(possibleChange *100);
		console.log(possibleChange);
		console.log(possibleChange%5 );


		if (Math.round(possibleChange% 5) == 0 )
		{
			if($scope.canChange(possibleChange))
			{
				var remaining = price;
				console.log ("out remaining: " + remaining);
				while (remaining > 0)
				{	
					
					if (Math.round(remaining%25) == 0 )
					{

						$scope.acceptedCoins.quarters -= 1;

						paid += 25;
						console.log(paid);
						console.log("quarter");
					
						

					}	
					else if (Math.round(remaining%10) == 0 )
					{

						$scope.acceptedCoins.dimes -= 1;
						paid += 10;
						console.log(paid);
						console.log("dime");
						
				
					}
					else if (Math.round(remaining%5) == 0 )
					{

						$scope.acceptedCoins.nickels -= 1;
						console.log(paid);
						console.log("nickel");
						paid += 5;
						
		
					}
					remaining = Math.round(price - paid);
					console.log("amount remaining: " + remaining);

				}
				return true;
			}
			else
			{
				$scope.alert = "EXACT CHANGE ONLY";
				return false;
			}	

		}
		else
		{				
			$scope.alert = "EXACT CHANGE ONLY";
			return false;
		}

	};

	$scope.canChange = function(c){
		console.log("amount to change: " + c);


		var remaining = c;
		console.log ("total change remaining: " + remaining);
		var changed = (remaining/100);

		//Reduce machine balance

		while (remaining > 0)
		{	

			var forceFalse = 1;
			
			if (Math.round(remaining%25) == 0 && $scope.coinBalance.quarters > 0)
			{


				remaining -= 25;
			
				console.log("quarter change");
				$scope.coinBalance.quarters -= 1;
				$scope.acceptedCoins.quarters -= 1;
				forceFalse = 0;
			
				

			}	
			else if (Math.round(remaining%10) == 0 && $scope.coinBalance.dimes > 0)
			{

				remaining -= 10;
				console.log("dime change");
				$scope.coinBalance.dimes -= 1;
				$scope.acceptedCoins.dimes -= 1;
				forceFalse = 0;
				
		
			}
			else if (Math.round(remaining%5) == 0 && $scope.coinBalance.nickels > 0)
			{

				console.log("nickel change");
				$scope.coinBalance.nickels -= 1;
				$scope.acceptedCoins.nickels -= 1;
				remaining -= 5;
				forceFalse = 0;
				

			}
			else if (forceFalse = 1)
			{
				return false;
			}
			console.log("change remaining: " + remaining);

		}
		console.log("changed after: " + changed);
		console.log("customer balance after: " + $scope.totalAmount($scope.acceptedCoins));
		console.log("machine balance after: " + $scope.totalAmount($scope.coinBalance));
		$scope.tray += changed;
		return true;

	};

}]);