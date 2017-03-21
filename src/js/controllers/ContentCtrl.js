(function() {
'use strict';

angular.module('kazoosh').controller('ContentCtrl', [
 'CONF',
 '$scope',
 '$state',
 'ContentService',
 'LanguageService',
 function(CONF, $scope, $state, ContentService, LanguageService) {

  $('.swipebox').swipebox({loopAtEnd: true});

  $scope.$on('language.initialized', function(event, value) {
    loadContent();
  });

  $scope.$on('language.changed', function(event, value) {
    loadContent();
  });

  if (LanguageService.isLangInitialized()) {
    loadContent();
  }

  function loadContent() {
    ContentService.getContent($state.params.path).then(
     function(content) {
      $scope.content = content;
    },
     function() {
      $state.go('error');
    }
    );
  }
},
]);
}());