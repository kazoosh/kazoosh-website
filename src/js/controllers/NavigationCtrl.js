(function() {
'use strict';

angular.module('kazoosh').controller('NavigationCtrl', [
 'CONF',
 '$scope',
 '$state',
 'ContentService',
 'LanguageService',
 function(CONF, $scope, $state, ContentService, LanguageService) {

  $scope.changeLang = function(newLang) {
    LanguageService.changeLang(newLang);
  };

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
    ContentService.getContent('root').then(
     function(content) {
      // Only show contents with order bigger or equal zero
      $scope.contents = content[CONF.subpages_attribute].filter(
        function(value) {
          return value[CONF.nav_order_attribute] >= 0;
        }
      );
      // Sort by order
      $scope.contents.sort(function(a, b) {
        return a[CONF.nav_order_attribute] - b[CONF.nav_order_attribute];
      });
    },
     function() {
    }
    );
  }
},
]);
}());