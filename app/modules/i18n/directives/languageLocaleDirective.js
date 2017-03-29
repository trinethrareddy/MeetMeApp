angular.module('meetMeApp.localization') .directive('ngTranslateLanguageSelect', function (LocaleService) { 'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: ''+
            '<span class="language-select" ng-if="visible">'+
                '<span>'+
                    '{{"directives.language-select.Language" | translate}}:'+'</span>'+
                    '<select style="color: #000;" ng-model="currentLocaleDisplayName"'+
                        'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                        'ng-change="changeLanguage(currentLocaleDisplayName)">'+
                    '</select>'+
            '</span>'+
            '',
            controller: function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;
    
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }
        };
    });
