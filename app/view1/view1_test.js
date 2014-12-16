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