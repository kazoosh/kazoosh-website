kazoosh.controller('NavigationCtrl', ['CONF', '$scope', '$state', 'ContentService', function(CONF, $scope, $state, ContentService) {
	
	ContentService.getContent('root').then(
		function(content){

			$scope.contents = content[CONF.subpages_attribute].filter(function(value){
				//return false if it is in exlude_from_navigation and should be excluded (if < 0)
				return CONF.exlude_from_navigation.indexOf(value.id) < 0;
			});
		},
		function(){
		}
	);

}]);