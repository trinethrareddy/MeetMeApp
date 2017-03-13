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

// //Facebook Login
//  window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '2001063750121137',
//       xfbml      : true,
//       version    : 'v2.8',
//       status : true
//     });

//     FB.getLoginStatus(function(response){
//         if(response.status === 'connected')
//             {
//                 //we are coonected
//             } else if(response.status === 'not_authorized')  {
//                 //not auth
//             } else {
//                 //we are not logged
//             }
//              });
//             };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));