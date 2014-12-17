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

// Make Change: Return Counts - As a customer https://github.com/ericflecher/VendingMachineKata#as-a-customer
describe('Scenario: I want to have my money returned So that I can change my mind about buying stuff from the vending machine', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('Feature: When the return coins is selected, the money the customer has placed in the machine is returned and the display shows INSERT COIN.', function() {


        $scope.acceptedCoins.nickels = 4;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        $scope.returnCoins();


        expect($scope.tray).toEqual(0.65);
        expect($scope.alert).toEqual("INSERT COIN");
        
    });


  });

// Sold Out: As a customer https://github.com/ericflecher/VendingMachineKata#as-a-customer-1
describe('Scenario: I want to be told when the item I have selected is not available So that I can select another item', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('Feature: When the item selected by the customer is out of stock, the machine displays SOLD OUT.', function() {

        $scope.acceptedCoins.nickels = 1;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        $scope.processVendingRequest(   {
                                          'sku': 2,
                                          'name': "Genisis: Invisable Touch",
                                          'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:0xpBr84T3FTm9j4D1MdPtk\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
                                          'price': 0.10,
                                          'stock': 0
                                        });
        expect($scope.alert).toEqual("SOLD OUT");

        
    });

        it('Feature: When and item if purchased the stock of that item will be reduced by 1', function() {

        $scope.acceptedCoins.nickels = 1;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        $scope.processVendingRequest(   {
                                          'sku': 2,
                                          'name': "Genisis: Invisable Touch",
                                          'iFrame': "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:0xpBr84T3FTm9j4D1MdPtk\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
                                          'price': 0.10,
                                          'stock': 0
                                        });
        expect($scope.alert).toEqual("SOLD OUT");

        
    });

    it('Feature: If the display is checked again, it will display the amount of money remaining in the machine or INSERT COIN if there is no money in the machine.', function() {

        //verify balance display
        $scope.acceptedCoins.nickels = 4;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        expect($scope.totalAmount()).toEqual(0.65);
        

        //verify balance display
        $scope.acceptedCoins.nickels = 0;
        $scope.acceptedCoins.dimes = 0;
        $scope.acceptedCoins.quarters = 0;
        $scope.acceptedCoins.pennies = 0;
        expect($scope.totalAmount()).toEqual(0.00);
        expect($scope.alert).toEqual("INSERT COIN");
    });


  });

// Sold Out: Exact Change Only https://github.com/ericflecher/VendingMachineKata#exact-change-only
describe('Scenario: As a customer I want to be told when exact change is required So that I can determine if I can buy something with the money I have before inserting it', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('View1Ctrl', { $scope: $scope });
    });

    it('Feature: When a transaction is processed the machine coin balance will be updated with new coin revenue', function() {

        //set a customer balance
        $scope.acceptedCoins.nickels = 1;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        //set a machine coin balance
        


        expect($scope.alert).toEqual("EXACT CHANGE ONLY");

    });

    it('Feature: When the machine is not able to make change with the money in the machine for any of the items that it sells, it will display EXACT CHANGE ONLY instead of INSERT COINS.', function() {

        //set a customer balance
        $scope.acceptedCoins.nickels = 1;
        $scope.acceptedCoins.dimes = 2;
        $scope.acceptedCoins.quarters = 1;
        $scope.acceptedCoins.pennies = 0;

        //set a machine coin balance


        expect($scope.alert).toEqual("EXACT CHANGE ONLY");

    });

  });



});