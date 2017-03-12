(function(){
	'use strict';
	angular
	.module('meetMeApp.signup')
	.controller('signupCtrl',['$scope',function($scope){
		$scope.name ="namratha";
		console.log("123");

		$scope.gmail = {
			username : "",
			email : ""
		};
	}]);
})();