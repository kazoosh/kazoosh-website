angular.module('kazoosh')
	.factory('LanguageService', [
		'$rootScope', 
		'$state', 
		'$translate', 
		function($rootScope, $state, $translate) {
			return{
				__isLangInitialized: false,
				initializeLang: function(){
					var that = this;
					if(!this.__isLangInitialized){
						var proposedLang = $translate.proposedLanguage();
						if($state.current && $state.current.name){
							$state.go($state.current.name, {lang: proposedLang})
								.then(
									function(data){
										that.__isLangInitialized = true;
										that.__langInitialized(proposedLang);
									},
									function(error){
										console.error('Language could not be initialized:', error);
									}
								);
						}
						else{
							this.__isLangInitialized = true;
							this.__langInitialized(proposedLang);
						}
					}
				},
				changeLang: function (newLang) {
					var that = this;
					$translate.use(newLang);
					$state.go($state.current.name, {lang: newLang})
						.then(
							function(data){
								that.__langChanged(newLang);
							},
							function(error){
								console.error('Language could not be changed:', error);
							}
						);
				},
				isLangInitialized: function(){
					return this.__isLangInitialized;
				},
				__langInitialized: function (lang) {
					console.log('language.initialized');
					$rootScope.$broadcast('language.initialized', lang);
				},
				__langChanged: function (newLang) {
					console.log('language.changed');
					$rootScope.$broadcast('language.changed', newLang);
				}
			};
		}
	]);