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
        'ngMessages',
        'ngMaterial',
        'meetMeApp.login',
        'meetMeApp.signup'
    ])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise("app/login");
        // 
        // Now set up the states 
        $stateProvider
            .state('home', {
                url: "/Home",
                templateUrl: "views/home.html"
            })
            .state('home.features', {
                url: "/Features",
                templateUrl: "views/features.html",
                controller: "profileController"
            })
            .state('home.profile', {
                url: "/profile",
                templateUrl: "modules/profile/profileView.html"
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
            .state('app', {
                url: "/app",
                templateUrl: "views/mainTemplate.html"
            })
            .state('app.login', {
                url: "/login",
                templateUrl: "./modules/login/login.html",
                controller:"loginCtrl"
            })

        .state('app.signup', {
            url: "/SignUp",
            templateUrl: "./modules/signup/signup.html",
            controller: "signUpCtrl"
        })

    });


//Google Login

function onLoadFunction(){
    gapi.client.setApiKey('AIzaSyDeXfVywR8aZjQOKNl7mi05CJfdtR5a8E8');
    gapi.client.load('plus','v1',function(){});
}


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));