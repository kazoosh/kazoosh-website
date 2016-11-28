kazoosh.controller('ContentCtrl', ['CONF', '$scope', '$state', 'ContentService', function(CONF, $scope, $state, ContentService) {
	
	ContentService.getContent($state.params.path).then(
		function(content){
			$scope.content = content;
		},
		function(){
			$state.go('app.error');
		}
	);

}]);