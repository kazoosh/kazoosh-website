kazoosh.controller('NavigationCtrl', ['CONF', '$scope', '$state', 'ContentService', function(CONF, $scope, $state, ContentService) {
	
	ContentService.getContents().then(
		function(list){

			$scope.contents = list.contents.filter(function(value){
				//return false if it is in exlude_from_navigation and should be excluded (if < 0)
				return CONF.exlude_from_navigation.indexOf(value) < 0;
			});
		},
		function(){
		}
	);

}]);