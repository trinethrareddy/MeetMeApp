(function(){
	'use strict';
	angular
	.module('meetMeApp.signup')
	.controller('signupCtrl',['$scope','$rootScope','$cookies','$state',function($scope,$rootScope,$cookies,$state){
		$scope.gmail = {
			username : "",
			email : ""
		};
		var signedUser ={
			"usersList":[]
		};		
		if($cookies.getObject('SignUpUsers')){
			signedUser = $cookies.getObject('SignUpUsers');			
		}
		$scope.fnSignUp = function(newUser){
			signedUser.usersList.push(newUser);
			$cookies.putObject('SignUpUsers',signedUser);
			$state.go('login');
		};
		$scope.onGoogleLogin = function(){
			console.log("abc");
			var params = {
				'clientid' : '818379217611-rfohfqt4k2m20pvqvdanselgeo209th0.apps.googleusercontent.com',
				'cookiepolicy' : 'single_host_origin',
				'callback' : function(result){
					if(result['status']['signed_in']){
						var request =gapi.client.plus.people.get(

						{
							'userId':'me'
						}
							);
						request.execute(function(resp){
							$scope.$apply(function(){
								$scope.gmail.username = resp.displayName;
								$scope.gmail.email = resp.emails[0].value;
								$scope.g_image = resp.image.url;
							}); 
						});
					}
				},
				'approvalprompt': 'force',
				'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
			};

			gapi.auth.signIn(params);
		}

	}]);
})();