kazoosh.controller('MainCtrl', ['CONF', '$scope', '$state', function(CONF, $scope, $state) {

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

		$scope.pageName = toParams.type ? toParams.type : toState.name;
	})
}]);