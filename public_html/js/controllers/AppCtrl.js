kazoosh.controller('AppCtrl', [
	'LanguageService',
	function(LanguageService) {
	
		LanguageService.initializeLang();
	}
]);