kazoosh.controller('AppCtrl', ['$scope', '$state', '$translate', function($scope, $state, $translate) {
	
	var proposedLang = $translate.proposedLanguage();
	if($state.current && $state.current.name){
		$state.go($state.current.name, {lang: proposedLang});
	}

	$scope.changeLang = function (key) {
		$translate.use(key);
		$state.go($state.current.name, {lang: key});
	};
}]);