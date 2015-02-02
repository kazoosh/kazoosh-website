var kazoosh = angular.module('kazoosh', ['config', 'provider', 'ui.router', 'ngSanitize', 'underscore', 'slick']);

kazoosh.config(function(CONF, $stateProvider, $urlRouterProvider, templateProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/root/home.html',
			controller: 'HomeCtrl'
		})
		.state('content', {
			url: '/{path:.*}',
			templateProvider: function ($stateParams, $templateCache, $http, ContentService, $q) {
				return templateProvider.getContentTemplate($stateParams, $templateCache, $http, ContentService, $q);
			},
			controller: 'ContentCtrl'
		})
		.state('404', {
			url: '/404',
			templateUrl: 'templates/404.html'
		});
});