(function () {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('signUpCtrl', ['$scope', '$state', 'urlConstant', 'urlService', 'logService', function ($scope, $state, urlConstant, urlService, logService) {
            console.log("urlConstant::", urlConstant);
            $scope.fnSignUpUser = function (newUser) {
                var payload12 = {
                    "active": true,
                    "email": newUser.email,
                    "firstName": newUser.firstName,
                    "id": 0,
                    "lastName": newUser.lastName,
                    "locked": true,
                    "password": newUser.password,
                    "role": {
                        "id": "string",
                        "name": "string"
                    },
                    "token": "string",
                    "userProfile": {
                        "age": 0,
                        "city": 0,
                        "contactNumber": "string",
                        "country": 0,
                        "dateOfBirth": "2017-03-24T12:00:33.592Z",
                        "firstVerificationBy": 0,
                        "firstVerificationOn": "2017-03-24T12:00:33.592Z",
                        "gender": newUser.gender,
                        "geoLocation": "string",
                        "id": 0,
                        "professional": "string",
                        "recentPicId": 0,
                        "secondVerificationBy": 0,
                        "secondVerificationOn": "2017-03-24T12:00:33.592Z",
                        "thirdVerificationBy": 0,
                        "thirdVerificationOn": "2017-03-24T12:00:33.592Z",
                        "zipCode": "string"
                    },
                    "verified": true
                }
                var payload = {
                    "active": true,
                    "email": newUser.email,
                    "firstName": newUser.firstName,
                    "id": 0,
                    "lastName": newUser.lastName,
                    "locked": true,
                    "password": newUser.password,
                    "role": {
                        "id": "string",
                        "name": "string"
                    },
                    "token": "string",
                    "userProfile": {
                        "age": 0,
                        "city": 0,
                        "contactNumber": "string",
                        "country": 0,
                        "dateOfBirth": "2017-03-24T12:00:33.592Z",
                        "firstVerificationBy": 0,
                        "firstVerificationOn": "2017-03-24T12:00:33.592Z",
                        "gender": "male",
                        "geoLocation": "string",
                        "id": 0,
                        "professional": "string",
                        "recentPicId": 0,
                        "secondVerificationBy": 0,
                        "secondVerificationOn": "2017-03-24T12:00:33.592Z",
                        "thirdVerificationBy": 0,
                        "thirdVerificationOn": "2017-03-24T12:00:33.592Z",
                        "zipCode": "string"
                    },
                    "verified": true
                }
                urlService.userRegistration(payload).then(function(data){
                  if(data.status === 200 && data.data){
                    // logService.setoreLoggedUser(data.data);
                    $state.go('app.login');
                  }else{

                  }
                console.log("Data:::",data);
                });
            };
            $scope.onFBLogin = function () {
                // $cookies.put('isLocalLogin', "no");
                // $rootScope.isLocalLogin = false;
                FB.login(function (response) {
                    if (response.authResponse) {
                        FB.api('/me', 'GET', { fields: 'email, first_name , name , id, picture' }, function (response) {
                            $scope.$apply(function () {
                                console.log(response);
                                if (response) {
                                    logService.setoreLoggedUser(response);
                                    $state.go('home');
                                }
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
                // $cookies.put('isLocalLogin', "no");
                // $rootScope.isLocalLogin = false;
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
                                    // $cookies.putObject('loggedInUser', loggedInUser);
                                    // $state.go('homepage');
                                    if (($scope.gmail.username == resp.displayName) && ($scope.gmail.email == resp.emails[0].value) && ($scope.g_image == resp.image.url)) {
                                        // $state.go('homepage');
                                        logService.setoreLoggedUser(loggedInUser);
                                        $state.go('home');
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
