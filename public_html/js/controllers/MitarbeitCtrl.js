kazoosh.controller('MitarbeitCtrl', ['CONF', '$scope', '$state', 'ContentService', '$q', function(CONF, $scope, $state, ContentService, $q) {


	loadProject = function(content){

		content.projects.forEach(function(path, i){
			requests.push(ContentService.getContent(path, function(){}));
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

	//get featured items
	var requests = [];


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