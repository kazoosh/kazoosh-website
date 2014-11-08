angular.module('provider', [])
	.provider('template', ['CONF', function(CONF) {
		
		
		this.getListTemplate = function ($stateParams, $templateCache, $http, $q) {

			var templateDeferred = $q.defer();

			//priority ordered array of templates to use for content
			var templateUrls = [];

			//error template has least priority
			templateUrls.push(CONF.templates_folder + CONF.error_template);

			//receive template url from type given in url
			if($stateParams.type && $stateParams.type != '404'){

				//default list template has next priority
				templateUrls.push(CONF.templates_folder + CONF.default_list_template);

				//template for current content type has next priority
				templateUrls.push(CONF.templates_folder + $stateParams.type + '/list.html');
			}
			
			//reoder urls (last item should be first, because it has highest priority)
			templateUrls.reverse();

			//recurively try to load templates specified in templateUrls
			this.loadTemplate(templateUrls, templateDeferred, $http, $templateCache);

			return templateDeferred.promise;
		};

		this.getDetailTemplate = function ($stateParams, $templateCache, $http, ContentService, $q) {

			var that = this;
			var contentDeferred = $q.defer();
			var templateDeferred = $q.defer();

			//priority ordered array of templates to use for content
			var templateUrls = [];

			//error template has least priority
			templateUrls.push(CONF.templates_folder + CONF.error_template);
			
			//receive template url from type given in url
			if($stateParams.type && $stateParams.type != '404'){

				//default detail template has next priority
				templateUrls.push(CONF.templates_folder + CONF.default_detail_template);

				//template for current content type has next priority
				templateUrls.push(CONF.templates_folder + $stateParams.type + '/detail.html');

				//check if there is a special template specified in current content
				ContentService.getDetail($stateParams.type, $stateParams.id).then(
					function(detail){
						if(detail && detail.template){
							//template for current content has highest priority
							templateUrls.push(CONF.templates_folder + detail.template);
						}
						contentDeferred.resolve();
					},
					function(){
						contentDeferred.resolve();
					}
				);
			}
			else{
				contentDeferred.resolve();
			}
			
			contentDeferred.promise.then(function(){

				//reoder urls (last item should be first, because it has highest priority)
				templateUrls.reverse();

				//recurively try to load templates specified in templateUrls
				that.loadTemplate(templateUrls, templateDeferred, $http, $templateCache);
			});

			return templateDeferred.promise;
		}

		this.loadTemplate = function(templateUrls, templateDeferred, $http, $templateCache){

			//recurively try to load templates specified in templateUrls
			(function recurse(i, templateUrls) {
				
				$http.get(templateUrls[i], {cache: $templateCache}).then(
					function(response) {
						//template available
						templateDeferred.resolve(response.data);
					},
					function(response) {
						//error: try to load next template
						if(i + 1 < templateUrls.length) {
							recurse(i + 1, templateUrls);
						}
						else{
							throw 'Non of the specified templates was found. '+templateUrls;
						}
					});
			})(0, templateUrls);
		}

		this.$get = function() {
			return {};
		}
	}]);