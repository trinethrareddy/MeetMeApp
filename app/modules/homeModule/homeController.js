(function(){
	'use strict';
	angular
	.module('meetMeApp.home')
	.controller('homeCtrl',['$scope','dataFactory',function($scope,dataFactory){
        console.log("namratha");
            $scope.googleDetails = dataFactory.getInfo('Google');
            console.log($scope.googleDetails);
    }]);

})();