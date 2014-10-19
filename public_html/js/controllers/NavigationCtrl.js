kazoosh.controller('NavigationCtrl', ['CONF', '$scope', '$state', 'ContentService', function(CONF, $scope, $state, ContentService) {
	
	ContentService.getContents().then(
		function(list){
			$scope.contents = list.contents;
		},
		function(){
		}
	);

}]);