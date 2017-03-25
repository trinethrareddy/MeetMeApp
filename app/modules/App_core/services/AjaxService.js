(function () {
    "use strict";
    angular.module('meetMeApp').service('AjaxService', function (urlConstant, $http, $q) {
        /* Get base url from the url constant file here */
        var _baseurl = urlConstant['baseUrl'];
        /** setting default reqquest headers here */
        var _headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            'crossDomain': true
        };
        /*Ajax send method start here */
        function _send(_url, _method, _data) {
            var baseUrl = angular.copy(_baseurl);
            var deferred = $q.defer();
            var url = baseUrl + _url;
            var req = {
                method: _method,
                url: url,
                headers: _headers,
                data: _data ? _data : ''
            };
            $http(req)
                .then(function (res) {
                    deferred.resolve(res);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        /*Ajax send method start here */
        return {
            send: _send
        }
    });
})();