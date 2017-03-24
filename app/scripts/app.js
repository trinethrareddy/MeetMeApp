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
        'meetMeApp.signup'
    ])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise("/Login");
        // 
        // Now set up the states 
        $stateProvider
            .state('home', {
                url: "/Home",
                templateUrl: "views/home.html"
            })
            .state('home.features', {
                url: "/Features",
                templateUrl: "views/features.html"
            })

        .state('home.download', {
            url: "/Download",
            templateUrl: "views/download.html"
        })

        .state('home.security', {
            url: "/Security",
            templateUrl: "views/security.html"
        })

        .state('home.faq', {
            url: "/FAQ",
            templateUrl: "views/faq.html"
        })

        .state('login', {
            url: "/Login",
            templateUrl: "./modules/login/login.html",
            controller:"loginCtrl"
        })

        .state('signup', {
            url: "/SignUp",
            templateUrl: "./modules/signup/signup.html"
        })

    });
