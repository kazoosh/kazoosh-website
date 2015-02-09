kazoosh.controller('PageClassCtrl', ['CONF', '$scope', '$state', function(CONF, $scope, $state) {

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

		pageClasses = [];

		if(toParams.path){
			//add classes for page by url structure
			//for url: /one/two/three
			//it's:    one one_default two two_default three
			var pathArray = toParams.path.split(CONF.DS);
			for(var i=0; i < pathArray.length-1; i++){
				pathPart = pathArray[i];
				pageClasses.push(pathPart)
				pageClasses.push(pathPart + CONF.default_page_class_prefix)
			}
			pageClasses.push(pathArray[pathArray.length-1])
		}
		else{
			pageClasses.push(toState.name);
		}

		$scope.pageClasses = pageClasses.join(", ");
	})
}]);