(function () {
	'use strict';

	angular.module('kazoosh').controller('ParticipantsCtrl', [
		'CONF',
		'$scope',
		'$state',
		'ContentService',
		'LanguageService',
		'$q',
		function(CONF, $scope, $state, ContentService, LanguageService, $q) {

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
				if($scope.content === undefined){
					$scope.$watch('content', function() {
						if($scope.content !== undefined){
							loadParticipants($scope.content);
						}
					});
				}
				else{
					loadParticipants($scope.content);
				}
			}

			function loadParticipants(content){
				ContentService.getContent('root/mitglieder').then(
					function(content){
						var requests = [];
						content.subpages.forEach(function(subpage, i){
							requests.push(ContentService.getContent(subpage.path));
						});
						$q.all(requests)
							.then(
								function(participants){
									$scope.participants = [];
									//filter participants by path of current content
									participants.forEach(function(participant){
										participant.projects.forEach(function(project){
											if(project === $scope.content.path){
												$scope.participants.push(participant);
											}
										});
									});
								},
								function(data){
									console.error('FAIL');
								}
							);
					},
					function(){
						$state.go('error');
					}
				);
			}
		}
	]);
}());