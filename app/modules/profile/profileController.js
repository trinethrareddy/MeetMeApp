(function () {
    'use strict';
    angular
        .module('meetMeApp.login')
        .controller('profileController', ['$scope', '$state', 'urlService', 'logService', function ($scope, $state, urlService, logService) {
           function init(){
               $scope.loggedUser = logService.getoreLoggedUser();
               console.log($scope.loggedUser);
           };
           init();
        }]);
})();
