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




      expect($scope.alert).toEqual('Accepted!');
    });

    it('Feature: Reject invalid ones (pennies) And: Rejected coins are placed in the coin return', function() {



      expect($scope.alert).toEqual('Pennies not accepted. Please check coin return.');
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