kazoosh.controller('HomeCtrl', ['CONF', '$scope', '$state', 'ContentService', '$q', function(CONF, $scope, $state, ContentService, $q) {

	ContentService.getList('home').then(

		function(list){

			$scope.content = list;

			//get featured items
			var requests = [];
			list.featured.forEach(function(value, i){
				var path = value.split('/');
				requests.push(ContentService.getDetail(path[0], path[1], function(){}));
			});

			
			$q.all(requests)
				.then(
					function(data){
						$scope.featured = data;
					},
					function(data){
						console.error('FAIL');
					}
				);
		},
		function(){
			$state.go('404');
		}
	);

}]);