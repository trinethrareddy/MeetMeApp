'use strict';

/**
 * @ngdoc function
 * @name meetMeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meetMeApp
 */
angular.module('meetMeApp')
  .controller('MainCtrl', function ($scope,$rootScope,$state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.fnLogOut = function(){
      $rootScope.isLoggedIn = false;
      $state.go('login');
    };
  });
