(function(){
	'use strict';
	angular
	.module('meetMeApp.home',[])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise("/fisrtpage");
        // 
        // Now set up the states 
        $stateProvider
        .state('homepage',{
            url: "/homepage",
            templateUrl: "./modules/homeModule/homePage.html",
            controller:'homeCtrl',
            permission:'home'
        })

    });
})();


