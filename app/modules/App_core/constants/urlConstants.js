'use strict';
angular.module('meetMeApp')
    .constant('urlConstant', {
        baseUrl: "http://localhost:8080",
        GETCHILDDETAILS: {
            url: '/EHDI2-Web/synclient/',
            method: 'GET'
        },
        SAVEINPATIENT: {
            url: '/EHDI2-web/inpatient/details',
            method: 'POST'
        }
    });