(function() {
'use strict';

angular.module('filters', [])
 .filter('trustAsResourceUrl', [
  '$sce',
  function($sce) {
    return function(val) {
      return $sce.trustAsResourceUrl(val);
    };
  },
 ]);
}());
