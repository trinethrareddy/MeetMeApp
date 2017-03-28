(function () {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('loginCtrl', ['$scope', '$state', 'urlConstant', 'urlService', 'logService', '$cookies','AlertService', function ($scope, $state, urlConstant, urlService, logService, $cookies,AlertService) {
            console.log("urlConstant::", urlConstant);
            $scope.fnLogin = function (user) {
                urlService.authentication(user).then(function (data) {
                    if (data.status === 200 && data.data) {
                        var loggedInUser = data.data;
                        loggedInUser.from = "native"
                        $cookies.putObject('loggedInUser', loggedInUser);
                        logService.setoreLoggedUser(data.data);
                        AlertService.showAlert("Successfully Logged In", 1);
                        $state.go('home.profile');
                    } else {

                    }
                    console.log("Data:::", data);
                });
                // $state.go('home');
            }
            $scope.onFBLogin = function () {
                FB.login(function (response) {
                    if (response.authResponse) {
                        FB.api('/me', 'GET', { fields: 'email, first_name ,last_name, gender,name , id, picture' }, function (response) {
                            $scope.$apply(function () {
                                console.log(response);
                                if (response) {
                                    $state.go('home.profile');
                                    var loggedInUser = response;
                                    loggedInUser.from = "fb"
                                    $cookies.putObject('loggedInUser', loggedInUser);
                                    logService.setoreLoggedUser(response);
                                    AlertService.showAlert("Successfully Logged in with Facebook", 1);
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
            var gmail = {
                username: "",
                email: "",
                img_url:"",
                language:"",
                gender:""
            };


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
                                console.log("google::",resp);
                                $scope.$apply(function () {
                                    gmail.username = resp.displayName;
                                    gmail.email = resp.emails[0].value;
                                    gmail.img_url = resp.image.url;
                                    gmail.gender = resp.gender;
                                    gmail.language = resp.language;
                                    var loggedInUser = {};
                                    loggedInUser = gmail;
                                    loggedInUser.from = 'google';
                                    $cookies.putObject('loggedInUser', loggedInUser);
                                    if ((gmail.username === resp.displayName) && (gmail.email === resp.emails[0].value) && (gmail.img_url === resp.image.url)) {
                                        $state.go('home.profile');
                                        AlertService.showAlert("Successfully Logged in with Gmail", 1);
                                        logService.setoreLoggedUser(loggedInUser);
                                        console.log("loggedInUser:::", loggedInUser);
                                        
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

            $scope.showAlert = function(){
                $scope.email = "";
                swal({
                    title: "Forgot Password!!!",
                    text: "Please enter your password here",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Write something"
                    },
                    function(inputValue){
                        console.log(inputValue);
                        $scope.email = inputValue;
                        if (inputValue === false) return false;
  
                        if (inputValue === "") {
                        swal.showInputError("Please provide an email!");
                        return false
                        }
  
                swal("Password sent to your email");
                });
            }

        }]);
})();
