kazoosh.controller('MainCtrl', ['CONF', '$scope', '$state', function(CONF, $scope, $state) {

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

		if(toParams.path){
			var pathArray = toParams.path.split(CONF.DS);
			var id = pathArray[pathArray.length-1]
			$scope.pageName = id;
		}
	})
}]);