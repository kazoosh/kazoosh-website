var kazoosh = angular.module('kazoosh', ['config', 'provider', 'filters', 'ui.router', 'ngSanitize', 'underscore', 'slick']);

kazoosh.config(function(CONF, $stateProvider, $urlRouterProvider, templateProvider) {

	$urlRouterProvider.otherwise('/de/home');

	$stateProvider
		.state('app', {
			abstract: true,
			url: '/{lang:(?:de|en)}',
			template: '<div ui-view=""></div>',
			params: {lang : { value: 'de' }}
		})
		.state('app.home', {
			url: '/home',
			templateUrl: 'templates/root/home.html',
			controller: 'HomeCtrl'
		})
		.state('app.content', {
			url: '/{path:.*}',
			templateProvider: function ($stateParams, $templateCache, $http, ContentService, $q) {
				return templateProvider.getContentTemplate($stateParams, $templateCache, $http, ContentService, $q);
			},
			controller: 'ContentCtrl'
		})
		.state('app.error', {
			url: '/404',
			templateUrl: 'templates/404.html'
		});
});