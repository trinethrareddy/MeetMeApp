(function() {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('loginCtrl', ['$scope','$state', function($scope,$state) {
            $scope.name = "namratha";
            console.log("123");
          $scope.fnLogin=function(){
            $state.go('home');
          }
            $scope.fbLogin = function() {
            	console.log("fbLogin");
                FB.login(function(response) {
                    if (response.authResponse) {
                    	console.log(response.authResponse.userID)
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me',function(response) {
                        	console.log(response);
                            console.log('Good to see you, ' + response.name + '.');
                            var accessToken= FB.getAuthResponse();
                            console.log(accessToken);
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }

        }]);
})();
