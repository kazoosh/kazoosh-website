(function() {
'use strict';

angular.module('kazoosh', [
 'config',
 'provider',
 'filters',
 'ui.router',
 'ngSanitize',
 'underscore',
 'slick',
 'pascalprecht.translate',
])
.config([
  'CONF',
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  'templateProvider',
  '$translateProvider',
  function(
    CONF,
    $stateProvider,
    $urlRouterProvider,
    $urlMatcherFactoryProvider,
    templateProvider,
    $translateProvider
  ) {

    $urlMatcherFactoryProvider.type('urlPath', {
      encode: function(item) {
        return decodeURIComponent(item);
      },
      decode: function(item) {
        return encodeURIComponent(item);
      },
      is: function(item) {
        // Match path with letters, numbers, hyphen and underscore
        return item.match(/^(?!\/)[a-zA-Z,0-9,_,-,\/]*/g);
      },
    });

    $stateProvider
     .state('app', {
      url: '/{lang:(?:de|en)}',
      abstract: true,
      template: '<div ui-view=""></div>',
      params: {
        lang: {squash: true, value: 'de'},
      },
      controller: 'AppCtrl',
    });
    $stateProvider
     .state('home', {
      parent: 'app',
      url: '/home',
      templateUrl: 'templates/root/home.html',
      controller: 'HomeCtrl',
    })
     .state('content', {
      parent: 'app',
      url: '/{path:urlPath}',
      templateProvider: [
        '$stateParams',
        '$templateCache',
        '$http',
        'ContentService',
        '$q',
      function(
        $stateParams,
        $templateCache,
        $http,
        ContentService,
        $q) {
        return templateProvider.getContentTemplate(
          $stateParams,
          $templateCache,
          $http,
          ContentService,
          $q);
      },],
      controller: 'ContentCtrl',
    })
     .state('error', {
      parent: 'app',
      url: '/404',
      templateUrl: 'templates/404.html',
    });

    $urlRouterProvider.otherwise('/home');

    $translateProvider
     .useStaticFilesLoader({
      prefix: '/locales/',
      suffix: '.json',
    })
     .registerAvailableLanguageKeys(['en', 'de'], {
      en_US: 'en',
      en_UK: 'en',
      de_DE: 'de',
      de_CH: 'de',
    })
     .determinePreferredLanguage()
     .fallbackLanguage('de');
    // 'sanitize' would render UTF8 chars wrong!
    // 'escape' would not show HTML-tags which are inside our translations!
    // @see https://github.com/angular-translate/angular-translate/issues/1101
    $translateProvider.useSanitizeValueStrategy('sceParameters');
  },]);
}());