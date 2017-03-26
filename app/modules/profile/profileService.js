    (function () {
        "use strict";
        angular.module('meetMeApp').service('profileService', function (urlConstant,AjaxService) {
            return {
                getUserProfile: _getUserProfile,
                updateUserProfile: _updateUserProfile
            }
            /** Get Url obj by dynamic start here */
            function getUrlByKey(urlKey) {
                var urlObj = urlConstant[urlKey];
                return angular.copy(urlObj);
            }
            console.log("urlConstant:::",urlConstant);
            /** Get Url obj by dynamic end here */
            /* Get user profile Api function start here*/
            function _getUserProfile(token) {
                var urlKey = "GETUSERPROFILE";
                var urlObj = getUrlByKey(urlKey);
                urlObj.url = urlObj.url.replace("{token}",token);
                return AjaxService.send(urlObj.url,urlObj.method,"");
            };
            /* Get user profile Api function end here*/
            /* update user profile Api function start here */
            function _updateUserProfile(token,payload) {
                var urlKey = "UPDATEUSERPROFILE";
                var urlObj = getUrlByKey(urlKey);
                urlObj.url = urlObj.url.replace("{token}",token);
                return AjaxService.send(urlObj.url,urlObj.method,payload);
            };

        });
    })();