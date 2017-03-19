(function () {
	'use strict';
	angular
		.module('meetMeApp.login')
		.controller('loginCtrl', ['$scope', 'dataFactory', '$state', 'AuthenticateService', '$cookies', '$rootScope', function ($scope, dataFactory, $state, AuthenticateService, $cookies, $rootScope) {
			$scope.gmail = {
				username: "",
				email: ""
			};
			$rootScope.activeUser = {
				name: '',
				email: '',
				img_url: ''
			};
			$scope.isWorngPsw = false;
			$rootScope.isLocalLogin = false;
			$scope.noUsersData = false;
			$rootScope.isLoggedIn = false;
			$cookies.remove('isLocalLogin');
			$cookies.remove("loggedInUser");
			$scope.permission = ['home', 'profile', 'app'];
			var SignedInUserList = [];
			if ($cookies.getObject('SignUpUsers')) {
				var signedUser = $cookies.getObject('SignUpUsers');
				SignedInUserList = signedUser.usersList
				console.log("signedUser::", signedUser);
			};

			$scope.fnLogin = function (user) {
				$scope.isWorngPsw = false;
				var Index = -1;
				if (SignedInUserList.length > 0) {
					$scope.noUsersData = false;
					Index = SignedInUserList.findIndex(function (val) {
						return val.username == user.username && val.password == user.password;
					});
					if (Index != -1) {
						$cookies.put('isLocalLogin', "yes");
						$rootScope.isLocalLogin = true;
						$rootScope.activeUser.name = SignedInUserList[Index].firstname + ' ' + SignedInUserList[Index].lastname;
						$rootScope.activeUser.email = SignedInUserList[Index].email;
						$rootScope.activeUser.img_url = "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg";
						$cookies.putObject('loggedInUser', $rootScope.activeUser);
						$state.go('homepage');
					} else {
						$scope.isWorngPsw = true;
					}
				}else{
					$scope.errorText = "There are no users present, please sing up or login with social networks";
					$scope.noUsersData = true;
				}
			};
			$scope.onFBLogin = function () {
				$cookies.put('isLocalLogin', "no");
				$rootScope.isLocalLogin = false;
				FB.login(function (response) {
					if (response.authResponse) {
						FB.api('/me', 'GET', { fields: 'email, first_name , name , id, picture' }, function (response) {
							$scope.$apply(function () {
								var loggedInUser = {};
								loggedInUser = response;
								loggedInUser.from = "faceBook";
								$cookies.putObject('loggedInUser', loggedInUser);
								$state.go('homepage');
							});
						});
					} else {
						//error
					}
				}, {
						scope: 'email , user_likes',
						return_scopes: true
					});
			}
			$scope.onGoogleLogin = function () {
				$cookies.put('isLocalLogin', "no");
				$rootScope.isLocalLogin = false;
				var params = {
					'clientid': '818379217611-rfohfqt4k2m20pvqvdanselgeo209th0.apps.googleusercontent.com',
					'cookiepolicy': 'single_host_origin',
					'callback': function (result) {
						if (result['status']['signed_in']) {
							var request = gapi.client.plus.people.get(
								{
									'userId': 'me'
								}
							);
							request.execute(function (resp) {
								$scope.$apply(function () {
									$scope.gmail.username = resp.displayName;
									$scope.gmail.email = resp.emails[0].value;
									$scope.g_image = resp.image.url;
									dataFactory.updateInfo('Google', { username: $scope.gmail.username, email: $scope.gmail.email, image: $scope.g_image });
									$scope.googleDetails = dataFactory.getInfo('Google');
									console.log($scope.googleDetails);
									$scope.authenticateGetDetails = AuthenticateService.authenticateGetDetails($scope.permission);
									console.log($scope.authenticateDetails);
									$scope.authenticateSetDetails = AuthenticateService.authenticateSetDetails();
									console.log($scope.authenticateSetDetails);
									var loggedInUser = {};
									loggedInUser = $scope.googleDetails;
									loggedInUser.from = 'google';
									$cookies.putObject('loggedInUser', loggedInUser);
									$state.go('homepage');
									if (($scope.gmail.username == resp.displayName) && ($scope.gmail.email == resp.emails[0].value) && ($scope.g_image == resp.image.url)) {
										// $state.go('homepage');
									}
								});
							});
						}
					},
					'approvalprompt': 'force',
					'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
				};

				//console.log($scope.gmail.username);
				gapi.auth.signIn(params);

			}
		}]);
})();