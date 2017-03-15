(function() {
'use strict';

angular.module('provider', [])
 .provider('template', [
  'CONF',
  function(CONF) {
    this.getContentTemplate = function(
      $stateParams,
      $templateCache,
      $http,
      ContentService,
      $q
    ) {
      var that = this;
      var contentDeferred = $q.defer();
      var templateDeferred = $q.defer();
      // Priority ordered array of templates to use for content
      var templateUrls = [];
      // Error template has least priority
      templateUrls.push(
        CONF.templates_folder +
        CONF.DS +
        CONF.error_template +
        CONF.template_extension
      );
      // Decode URI, because angular is messing up URI somewhere,
      // TODO@hannes: fix the real issue
      $stateParams.path = decodeURIComponent($stateParams.path);
      // Receive template url from type given in url
      if ($stateParams.path && $stateParams.path !== 'error') {
        // Look for default templates in folder hierarchy
        var pathArray = $stateParams.path.split(CONF.DS);
        for (var i = 1; i < pathArray.length; i++) {
          var subPathArrray = pathArray.slice(0, i);
          var subPathString = subPathArrray.join(CONF.DS);
          if (subPathString !== '') {
            subPathString = CONF.DS + subPathString;
          }
          templateUrls.push(
            CONF.templates_folder +
            subPathString +
            CONF.DS +
            CONF.default_template +
            CONF.template_extension
          );
        }
        // Template for current content type has next priority
        templateUrls.push(
          CONF.templates_folder +
          CONF.DS +
          $stateParams.path +
          CONF.template_extension
        );
        // Check if there is a special template specified in current content
        ContentService.getContent($stateParams.path).then(
         function(content) {
          if (content && content.template) {
            // Template for current content has highest priority
            templateUrls.push(
              CONF.templates_folder +
              CONF.DS +
              content.template
            );
          }
          contentDeferred.resolve();
        },
         function() {
          contentDeferred.resolve();
        }
        );
      } else {
        contentDeferred.resolve();
      }
      contentDeferred.promise.then(function() {
        // Reoder urls (last item should be first,
        // because it has highest priority)
        templateUrls.reverse();
        // Recurively try to load templates specified in templateUrls
        that.loadTemplate(
          templateUrls,
          templateDeferred,
          $http,
          $templateCache
        );
      });
      return templateDeferred.promise;
    };
    this.loadTemplate = function(
      templateUrls,
      templateDeferred,
      $http,
      $templateCache
    ) {
      // Recurively try to load templates specified in templateUrls
      (function recurse(i, templateUrls) {
        $http.get(
          CONF.site_url + templateUrls[i],
          {cache: $templateCache}
        ).then(
         function(response) {
          // Template available
          templateDeferred.resolve(response.data);
        },
         function() {
          // Error: try to load next template
          if (i + 1 < templateUrls.length) {
            recurse(i + 1, templateUrls);
          } else {
            throw 'Non of the specified templates was found. ' + templateUrls;
          }
        });
      })(0, templateUrls);
    };
    this.$get = function() {
      return {};
    };
  },
 ]);
}());