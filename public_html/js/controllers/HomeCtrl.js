(function() {
'use strict';

angular.module('kazoosh').controller('HomeCtrl', [
 'CONF',
 '$scope',
 '$state',
 '$stateParams',
 'ContentService',
 'LanguageService',
 '$q',
 function(CONF,
    $scope,
    $state,
    $stateParams,
    ContentService,
    LanguageService,
    $q
  ) {

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
      ContentService.getContent('root/home').then(
       function(content) {
        $scope.content = content;
        // Get featured items
        var requests = [];
        content.featured.forEach(function(path, i) {
          requests.push(ContentService.getContent(path));
        });
        $q.all(requests)
         .then(
          function(data) {
            $scope.featured = data;
          },
          function() {
            console.error('FAIL');
          }
         );
      },
       function() {
        $state.go('error');
      }
      );
    }
  },
]);
}());