(function () {
    'use strict';
    angular
        .module('meetMeApp.home')
        .controller('homeCtrl', ['$scope', 'dataFactory', '$cookies','$rootScope', function ($scope, dataFactory, $cookies,$rootScope) {
            $rootScope.isLoggedIn = true;
            $scope.loggedInUser = {
                "name": '',
                "email": '',
                "img_url": ''
            };
            function getLoggedInUser() {
                var loggedInUser = $cookies.getObject('loggedInUser');
                if (loggedInUser && loggedInUser.from == 'google') {
                    $scope.loggedInUser.name = loggedInUser.username;
                    $scope.loggedInUser.email = loggedInUser.email;
                    $scope.loggedInUser.img_url = loggedInUser.image;
                } else if (loggedInUser && loggedInUser.from == 'faceBook') {
                    $scope.loggedInUser.name = loggedInUser.name;
                    $scope.loggedInUser.email = loggedInUser.email;
                    $scope.loggedInUser.img_url = loggedInUser.picture.data.url;
                }
            };
            var isLocalLogin = $cookies.get('isLocalLogin');
            if($rootScope.isLocalLogin || isLocalLogin == 'yes'){
                $scope.loggedInUser = $cookies.getObject('loggedInUser');
            }else{
                getLoggedInUser()
            }
        }]);

})();