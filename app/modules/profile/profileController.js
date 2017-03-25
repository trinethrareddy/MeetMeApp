(function () {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('profileController', ['$scope', '$state', 'urlService', 'logService', function ($scope, $state, urlService, logService) {
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
                if($scope.loggedUser && $scope.loggedUser != undefined){
                    fnParseActiveUserDetails($scope.loggedUser);
                }else{
                    $state.go("app.login");
                }
            };

            /** Update User function start here */
            $scope.fnUpdateUserDetails = function(){
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
                urlService.userRegistration(payload).then(function(data){
                  if(data.status === 200 && data.data){
                    // $state.go('app.login');
                    alert("Successfully Updated");
                  }else{

                  }
                });
            };
            /** Update User function end here */
            /** Parse Active user Details function start here */
            function fnParseActiveUserDetails (loggedUserDetails){
                if(loggedUserDetails.from === "fb"){
                    $scope.activeUser = {
                        firstName: loggedUserDetails.first_name ,
                        lastName: loggedUserDetails.last_name,
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.picture.data['url']?loggedUserDetails.picture.data['url']:"https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName : loggedUserDetails.name,
                        coverPhoto : loggedUserDetails.coverphoto?loggedUserDetails.coverphoto: "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                    }
                }else if(loggedUserDetails.from === "google"){
                    $scope.activeUser = {
                        firstName: loggedUserDetails.first_name ? loggedUserDetails.first_name :'',
                        lastName: loggedUserDetails.last_name ? loggedUserDetails.last_name :'',
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.img_url ? loggedUserDetails.img_url : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName : loggedUserDetails.username,
                        coverPhoto : loggedUserDetails.coverphoto?loggedUserDetails.coverphoto: "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
                    }
                }else{
                    $scope.activeUser = {
                        firstName: loggedUserDetails.firstName ,
                        lastName: loggedUserDetails.lastName,
                        email: loggedUserDetails.email,
                        gender: loggedUserDetails.gender,
                        location: "",
                        img_url: loggedUserDetails.img_url ? loggedUserDetails.img_url : "https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg",
                        userName : loggedUserDetails.firstName +' '+ loggedUserDetails.lastName,
                        coverPhoto : loggedUserDetails.coverphoto?loggedUserDetails.coverphoto: "http://www.parkablogs.com/sites/default/files/images/no-cover-image.jpg"
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
