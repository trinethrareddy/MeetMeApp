'use strict';
angular.module('meetMeApp')
    .constant('urlConstant', {
        baseUrl: "http://ec2-35-154-227-212.ap-south-1.compute.amazonaws.com:9090/meetme/",
        USERREGISTRATION: {
            url: 'user/registration',
            method: 'POST'
        },
        AUTHENTICATION: {
            url: 'authenticate',
            method: 'POST'
        }
    });