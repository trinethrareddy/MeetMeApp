(function(){
    'use strict';
    angular
    .module('meetMeApp')
    .service('AuthenticateService',function(){
        var authServiceDetails = {};
        authServiceDetails.authenticateGetDetails = function(value){
            authServiceDetails.details = value;
            console.log(authServiceDetails.details);
            return authServiceDetails.details;
        }

        authServiceDetails.authenticateSetDetails = function(){
            console.log(authServiceDetails.details);
            return authServiceDetails.details;
        }

        return authServiceDetails;
    });
})();