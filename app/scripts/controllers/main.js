'use strict';

/**
 * @ngdoc function
 * @name meetMeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meetMeApp
 */
angular.module('meetMeApp')
  .controller('MainCtrl', function ($scope,$state,AlertService) {
    $scope.fnLogOut = function(){
      $state.go("app.login");
      AlertService.showAlert("Successfully Logged Out", 2);
    }
  });
