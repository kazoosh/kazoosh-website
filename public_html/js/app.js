var kazoosh = angular.module('kazoosh', ['config', 'provider', 'filters', 'ui.router', 'ngSanitize', 'underscore', 'slick']);

kazoosh.config(function(CONF, $stateProvider, $urlRouterProvider, templateProvider) {

	//TODO: detect from urlRouterProvider

	$stateProvider
		.state('app', {
			url: '/{lang:(?:de|en)}',
			abstract: true,
			template: '<div ui-view=""></div>',
			params: {lang : { squash : true, value: 'de' }}
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
});