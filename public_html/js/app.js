var kazoosh = angular.module('kazoosh', ['config', 'provider', 'filters', 'ui.router', 'ngSanitize', 'underscore', 'slick', 'pascalprecht.translate']);

kazoosh.config(function(CONF, $stateProvider, $urlRouterProvider, templateProvider, $translateProvider) {

	$stateProvider
		.state('app', {
			url: '/{lang:(?:de|en)}',
			abstract: true,
			template: '<div ui-view=""></div>',
			params: {lang : { squash : true, value: 'de' }},
			controller: 'AppCtrl'
		});
	$stateProvider
		.state('home', {
			parent: 'app',
			url: '/home',
			templateUrl: 'templates/root/home.html',
			controller: 'HomeCtrl'
		})
		.state('content', {
			parent: 'app',
			url: '/{path:.*}',
			templateProvider: function ($stateParams, $templateCache, $http, ContentService, $q) {
				return templateProvider.getContentTemplate($stateParams, $templateCache, $http, ContentService, $q);
			},
			controller: 'ContentCtrl'
		})
		.state('error', {
			parent: 'app',
			url: '/404',
			templateUrl: 'templates/404.html'
		});
	$urlRouterProvider.otherwise('/home');

	$translateProvider.useStaticFilesLoader({
		prefix: '/locales/',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('de').fallbackLanguage('de');
	// 'sanitize' would render UTF8 chars wrong!
	// 'escape' would not show HTML-tags which are inside our translations!
	// @see https://github.com/angular-translate/angular-translate/issues/1101
	$translateProvider.useSanitizeValueStrategy('sceParameters');
});