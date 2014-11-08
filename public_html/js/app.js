var kazoosh = angular.module('kazoosh', ['config', 'provider', 'ui.router', 'ngSanitize', 'underscore']);

kazoosh.config(function(CONF, $stateProvider, $urlRouterProvider, templateProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'
		})
		.state('list', {
			url: '/:type',
			templateProvider: function ($stateParams, $templateCache, $http, $q) {
				return templateProvider.getListTemplate($stateParams, $templateCache, $http, $q);
			},
			controller: 'ListCtrl'
		})
		.state('detail', {
			url: '/:type/:id',
			templateProvider: function ($stateParams, $templateCache, $http, ContentService, $q) {
				return templateProvider.getDetailTemplate($stateParams, $templateCache, $http, ContentService, $q);
			},
			controller: 'DetailCtrl'
		})
		.state('404', {
			url: '/404',
			templateUrl: 'templates/404.html'
		});
});