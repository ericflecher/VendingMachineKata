'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {


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


}]);