'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  var $controller;

   beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var $scope = {};
      var view1Ctrl = $controller('View1Ctrl', { $scope: $scope });
      expect(view1Ctrl).toBeDefined();
    }));

  });

// Accept Coins: As a vendor - https://github.com/ericflecher/VendingMachineKata#as-a-vendor
describe('Scenario: Vending machine should accept coins', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('Feature: The vending machine will accept valid coins (nickels, dimes, and quarters)', function() {

        $scope.processCoin({'dia': 17.9, 'mag': 3});
        expect($scope.alert).toEqual('Accepted!');

    });

    it('Feature: Reject invalid ones (pennies) And: Rejected coins are placed in the coin return', function() {

        $scope.processCoin({'dia': 19.05, 'mag': 3});
        expect($scope.alert).toEqual('Not accpeted tender. Check tray and INSERT COIN');

    });

    it('Feature: When a valid coin is inserted the amount of the coin will be added to the current amount and the display will be updated.', function() {

      $scope.acceptedCoins.nickels = 1;
      $scope.acceptedCoins.dimes = 2;
      $scope.acceptedCoins.quarters = 4;
      $scope.acceptedCoins.pennies = 0;

      expect($scope.totalAmount()).toEqual(1.25);
    });

    it('When: there are no coins inserted, the machine displays INSERT COIN. Rejected coins are placed in the coin return.', function() {

      $scope.acceptedCoins.nickels = 0;
      $scope.acceptedCoins.dimes = 0;
      $scope.acceptedCoins.quarters = 0;
      $scope.acceptedCoins.pennies = 0;


      expect($scope.alert).toEqual('INSERT COIN');
    });

  });



// Make Change: As a vendor https://github.com/ericflecher/VendingMachineKata#make-change
describe('Scenario: I want customers to receive correct change So that they will use the vending machine again', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('Feature: When a product is selected that costs less than the amount of money in the machine, then the remaining amount is placed in the coin return.', function() {


        $scope.acceptedCoins.nickels = 1;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        $scope.processVendingRequest(   {
                                          'sku': 2,
                                          'name': "Genisis: Invisable Touch",
                                          'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:0xpBr84T3FTm9j4D1MdPtk\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
                                          'price': 0.10,
                                          'stock': 2
                                        });
        expect($scope.tray).toEqual(.40);
        
    });



  });



///////// testing the unit tests //////////

  describe('$scope.grade', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });

    it('sets the strength to "weak" if the password length <3 chars', function() {
      $scope.password = 'a';
      $scope.grade();
      expect($scope.strength).toEqual('weak');
    });
  });



});