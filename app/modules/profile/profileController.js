(function () {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('profileController', ['$scope', '$state', 'urlService', 'logService', 'profileService', 'AlertService', function ($scope, $state, urlService, logService, profileService, AlertService) {
           var ActiveUserFullDetails ={};
            $scope.activeUser = {
                location: ""
            }
            $scope.genderList = [
                'male',
                'female',
                'others'
            ]
            function init() {
                $scope.loggedUser = logService.getoreLoggedUser();
                console.log($scope.loggedUser);
                if ($scope.loggedUser && $scope.loggedUser != undefined) {
                    // var token = "fc2cf125-1545-4023-9828-901187055ac3";
                    if ($scope.loggedUser.token) {
                        fnGetUserProfileDetails($scope.loggedUser.token);
                    } else {
                        fnParseActiveUserDetails($scope.loggedUser);
                    }
                } else {
                    $state.go("app.login");
                }
            };

            /** function to get user profile details start here */
            function fnGetUserProfileDetails(token) {
                profileService.getUserProfile(token).then(function (resp) {
                    if (resp && resp.data) {
                        var data = resp.data;
                        ActiveUserFullDetails = angular.copy(resp.data);
                        $scope.activeUser = {
                            isFrom: "native",
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            token: data.token,
                            gender: data.userProfile.gender,
                            age: data.userProfile.age,
                            mobileNumber: data.userProfile.contactNumber,
                            country: data.userProfile.country,
                            dateOfBirth: data.userProfile.dateOfBirth,
                            location: data.userProfile.geoLocation,
                            id: data.userProfile.id,
                            zipCode: data.userProfile.zipCode,
                            img_url: data.img_url ? loggedUserDetails.img_url : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                            userName: data.firstName + ' ' + data.lastName,
                            coverPhoto: data.coverphoto ? data.coverphoto : "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                        }
                    }
                })
            }
            /** function to get user profile details start here */

            /** update user profile function start here */
            function fnUserProfileUpdate() {
                var token = $scope.loggedUser.token;
                ActiveUserFullDetails.firstName = $scope.activeUser.firstName;
                ActiveUserFullDetails.lastName = $scope.activeUser.lastName;
                ActiveUserFullDetails.email = $scope.activeUser.email;
                ActiveUserFullDetails.userProfile.age = $scope.activeUser.age;
                ActiveUserFullDetails.userProfile.contactNumber = $scope.activeUser.mobileNumber;
                ActiveUserFullDetails.userProfile.geoLocation = $scope.activeUser.location;
                ActiveUserFullDetails.userProfile.gender = $scope.activeUser.gender;

                var payload = ActiveUserFullDetails;
                $scope.test = payload;
                profileService.updateUserProfile(token, payload).then(function (resp) {
                    AlertService.showAlert("Successfully Updated User Details", 1);
                    console.log("update::", resp);
                })
            }
            /** update user profile function start here */

            /** Update User function start here */
            $scope.fnUpdateUserDetails = function () {
                if ($scope.activeUser.isFrom && $scope.activeUser.isFrom == 'native') {
                    fnUserProfileUpdate()
                } else {
                    var payload = {
                        "active": true,
                        "email": $scope.activeUser.email,
                        "firstName": $scope.activeUser.firstName,
                        "id": 0,
                        "lastName": $scope.activeUser.lastName,
                        "locked": true,
                        "password": 'test',
                        "role": {
                            "id": "string",
                            "name": "string"
                        },
                        "token": "string",
                        "userProfile": {
                            "age": $scope.activeUser.age,
                            "city": 0,
                            "contactNumber": $scope.activeUser.mobileNumber,
                            "country": 0,
                            "dateOfBirth": "2017-03-24T12:00:33.592Z",
                            "firstVerificationBy": 0,
                            "firstVerificationOn": "2017-03-24T12:00:33.592Z",
                            "gender": $scope.activeUser.gender,
                            "geoLocation": $scope.activeUser.location,
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
                    urlService.userRegistration(payload).then(function (data) {
                        if (data.status === 200 && data.data) {
                           AlertService.showAlert("Successfully Updated User Details", 2);
                        } else {

                        }
                    });
                }

            };
            /** Update User function end here */
            /** Parse Active user Details function start here */
            function fnParseActiveUserDetails(loggedUserDetails) {
                if (loggedUserDetails.from === "fb") {
                    $scope.activeUser = {
                        firstName: loggedUserDetails.first_name,
                        lastName: loggedUserDetails.last_name,
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.picture.data['url'] ? loggedUserDetails.picture.data['url'] : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName: loggedUserDetails.name,
                        coverPhoto: loggedUserDetails.coverphoto ? loggedUserDetails.coverphoto : "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                    }
                } else if (loggedUserDetails.from === "google") {
                    $scope.activeUser = {
                        firstName: loggedUserDetails.first_name ? loggedUserDetails.first_name : '',
                        lastName: loggedUserDetails.last_name ? loggedUserDetails.last_name : '',
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.img_url ? loggedUserDetails.img_url : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName: loggedUserDetails.username,
                        coverPhoto: loggedUserDetails.coverphoto ? loggedUserDetails.coverphoto : "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                    }
                } else {
                    $scope.activeUser = {
                        firstName: loggedUserDetails.firstName,
                        lastName: loggedUserDetails.lastName,
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.img_url ? loggedUserDetails.img_url : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName: loggedUserDetails.firstName + ' ' + loggedUserDetails.lastName,
                        coverPhoto: loggedUserDetails.coverphoto ? loggedUserDetails.coverphoto : "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                    }
                }
            }
            /** Parse Active user Details function end here */

            $scope.fnGetLocation = function () {
                getLocation();
            };
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position) {

                var location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                var geocoder = new google.maps.Geocoder;
                var infowindow = new google.maps.InfoWindow;
                geocoder.geocode({
                    'location': location
                }, function (results, status) {

                    if (status === 'OK') {
                        if (results[0]) {
                            $scope.$apply(function () {
                                $scope.activeUser.location = results[0].formatted_address;
                            });

                        }
                        console.log(results)
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }


            init();
        }]);
})();
