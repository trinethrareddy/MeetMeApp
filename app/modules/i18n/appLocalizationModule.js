(function () {
    'use strict';
    angular
        .module('meetMeApp.localization', [
            'pascalprecht.translate',// angular-translate
            'tmh.dynamicLocale'// angular-dynamic-locale
        ])
        .constant('LOCALES', {
            'locales': {
                'fr_ca': 'French',
                'en_US': 'English'
            },
            'preferredLocale': 'en_US'
        })
        .config(function ($translateProvider,tmhDynamicLocaleProvider) {
            //To get warnings in the developer console, regarding forgotten IDs in translations
            $translateProvider.useMissingTranslationHandlerLog();
            //adding asynchronous loading for the translations
            $translateProvider.useStaticFilesLoader({
                prefix: 'modules/i18n/langJsons/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            });
            $translateProvider.preferredLanguage('en_US');// is applied on first load
            $translateProvider.useLocalStorage();// saves selected language to localStorage
            //provide the config with direction of where to load the $locale settings files for angular-dynamic-locale
            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        })
})();
