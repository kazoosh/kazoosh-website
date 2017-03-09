kazoosh.controller('AppCtrl', ['$scope', '$state', '$translate', function($scope, $state, $translate) {
	
	$translate.use($state.params.lang);
}]);