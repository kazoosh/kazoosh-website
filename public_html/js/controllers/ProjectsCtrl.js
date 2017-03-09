kazoosh.controller('ProjectsCtrl', ['CONF', '$scope', '$state', 'ContentService', '$q', function(CONF, $scope, $state, ContentService, $q) {


	loadProject = function(content){

		var requests = [];
		content.projects.forEach(function(path, i){
			requests.push(ContentService.getContent(path));
		});

		
		$q.all(requests)
			.then(
				function(data){
					$scope.content.projects = data;
				},
				function(data){
					console.error('FAIL');
				}
			);
	}
	
	if($scope.content == undefined){
		$scope.$watch('content', function() {		
			if($scope.content != undefined){
				loadProject($scope.content);
			}
		});
	}
	else{
		loadProject($scope.content);
	}
}]);