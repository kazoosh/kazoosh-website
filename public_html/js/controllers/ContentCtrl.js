kazoosh.controller('ContentCtrl', [
	'CONF',
	'$scope',
	'$state',
	'ContentService',
	'LanguageService',
	function(CONF, $scope, $state, ContentService, LanguageService) {
	
		$scope.$on('language.initialized', function (event, value) {
			loadContent();
		});

		$scope.$on('language.changed', function (event, value) {
			loadContent();
		});

		if(LanguageService.isLangInitialized()){
			loadContent();
		}

		function loadContent(){
			ContentService.getContent($state.params.path).then(
				function(content){
					$scope.content = content;
				},
				function(error){
					$state.go('error');
				}
			);
		}
	}
]);