'use strict';

/**
 * @ngdoc overview
 * @name meetMeApp
 * @description
 * # meetMeApp
 *
 * Main module of the application.
 */
angular
    .module('meetMeApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ngMaterial',
        'meetMeApp.login',
        'meetMeApp.signup'
    ])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');
       
        $urlRouterProvider.otherwise("/home");
        // 
        // Now set up the states 
        $stateProvider
            .state('features', {
                url: "/Features",
                templateUrl: "views/features.html"
            })

        .state('download', {
            url: "/Download",
            templateUrl: "views/download.html"
        })

        .state('security', {
            url: "/Security",
            templateUrl: "views/security.html"
        })

        .state('faq', {
            url: "/FAQ",
            templateUrl: "views/faq.html"
        })

        .state('login', {
            url: "/Login",
            templateUrl: "./modules/login/login.html"
        })

        .state('signup', {
            url: "/SignUp",
            templateUrl: "./modules/signup/signup.html"
        })

    });


//Google Login

function onLoadFunction(){
    gapi.client.setApiKey('AIzaSyDeXfVywR8aZjQOKNl7mi05CJfdtR5a8E8');
    gapi.client.load('plus','v1',function(){});
}