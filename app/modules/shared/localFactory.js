(function(){
    'use strict';
    angular
    .module('meetMeApp')
    .factory('dataFactory', function() {
            /* Declaring a factory object */
            var factory = {};
factory.GoogleDetails = {};

            /* Declaring a factory array for storing data in factory */
            factory.updateInfo = function(key, value) {
                factory[key] = value;
            }
      factory.getInfo=function(key) {
		//   console.log(factory[key]);
          factory.GoogleDetails = factory[key];
          console.log(factory.GoogleDetails);
        return factory[key];
      } 
 console.log(factory.GoogleDetails);
        return factory;
    });

})();