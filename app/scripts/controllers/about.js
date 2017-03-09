// 'use strict';

// /**
//  * @ngdoc function
//  * @name meetMeApp.controller:AboutCtrl
//  * @description
//  * # AboutCtrl
//  * Controller of the meetMeApp
//  */
// angular.module('meetMeApp')
//   .controller('AboutCtrl', function () {
//     this.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   });

(function() {
  'use strict';

  angular.module('meetMeApp')
      .controller('AboutCtrl', AboutCtrl);

  function AboutCtrl($scope) {
    $scope.currentNavItem = 'page1';
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
})();