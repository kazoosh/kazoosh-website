kazoosh.controller('NavigationCtrl', ['CONF', '$scope', '$state', 'ContentService', function(CONF, $scope, $state, ContentService) {
	
	ContentService.getContent('root').then(
		function(content){

			//only show contents with order bigger or equal zero
			$scope.contents = content[CONF.subpages_attribute].filter(function(value){
				return value[CONF.nav_order_attribute] >= 0;
			});

			//sort by order
			$scope.contents.sort(function(a, b){
				return a[CONF.nav_order_attribute]-b[CONF.nav_order_attribute];
			});
		},
		function(){
		}
	);

}]);