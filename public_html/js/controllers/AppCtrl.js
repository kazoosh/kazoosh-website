(function() {
'use strict';

angular.module('kazoosh').controller('AppCtrl', [
 'LanguageService',
 function(LanguageService) {

  LanguageService.initializeLang();
},
]);
}());