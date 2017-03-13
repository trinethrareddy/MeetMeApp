(function() {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('loginCtrl', ['$scope', function($scope) {
            $scope.name = "namratha";
            console.log("123");
            $scope.fbLogin = function() {
            	console.log("fbLogin");
                FB.login(function(response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', function(response) {
                            console.log('Good to see you, ' + response.name + '.');
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }

        }]);
})();
