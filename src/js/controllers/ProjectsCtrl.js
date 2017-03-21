(function() {
'use strict';

angular.module('kazoosh').controller('ProjectsCtrl', [
 'CONF',
 '$scope',
 '$state',
 'ContentService',
 'LanguageService',
 '$q',
 function(CONF, $scope, $state, ContentService, LanguageService, $q) {

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
    if ($scope.content === undefined) {
      $scope.$watch('content', function() {
        if ($scope.content !== undefined) {
          loadProject($scope.content);
        }
      });
    } else {
      loadProject($scope.content);
    }
  }

  function loadProject(content) {
    var requests = [];
    content.projects.forEach(function(path, i) {
      requests.push(ContentService.getContent(path));
    });
    $q.all(requests)
     .then(
      function(data) {
        $scope.content.projects = data;
      },
      function() {
        console.error('FAIL');
      }
     );
  }
},
]);
}());