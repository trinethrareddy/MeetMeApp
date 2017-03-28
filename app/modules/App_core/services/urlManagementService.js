    (function () {
        "use strict";
        angular.module('meetMeApp').service('urlService', function (urlConstant,AjaxService) {
            return {
                userRegistration: _userRegistration,
                authentication: _authentication,
                forgotUserPassword:_forgotUserPassword
            }
            /** Get Url obj by dynamic start here */
            function getUrlByKey(urlKey) {
                var urlObj = urlConstant[urlKey];
                return angular.copy(urlObj);
            }
            /** Get Url obj by dynamic end here */
            /* Registration Api function start here*/
            function _userRegistration(payload) {
                var urlKey = "USERREGISTRATION";
                var urlObj = getUrlByKey(urlKey);
                return AjaxService.send(urlObj.url,urlObj.method,payload);
            };
            /* Registration Api function end here*/

            function _authentication(payload) {
                var urlKey = "AUTHENTICATION";
                var urlObj = getUrlByKey(urlKey);
                return AjaxService.send(urlObj.url,urlObj.method,payload);
            };
            function _forgotUserPassword(payload){
                var urlKey = "FORGOTPASSWORD";
                var urlObj = getUrlByKey(urlKey);
                return AjaxService.send(urlObj.url,urlObj.method,payload);
            }
        });
    })();