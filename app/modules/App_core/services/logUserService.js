    (function () {
        "use strict";
        angular.module('meetMeApp').service('logService', function () {
            return {
                setoreLoggedUser: _setoreLoggedUser,
                getoreLoggedUser: _getoreLoggedUser
            }
            /* Get Child Details Api function start here*/
            var loggedUserDetails;
            function _setoreLoggedUser(userDetails) {
                loggedUserDetails = userDetails;
                console.log("loggedUserDetails::",loggedUserDetails);
            };
            /* Get Child Details Api function end here*/

            function _getoreLoggedUser(payload) {
                return loggedUserDetails;
            }
        });
    })();