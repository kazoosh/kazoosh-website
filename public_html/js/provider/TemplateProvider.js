angular.module('provider', [])
	.provider('template', ['CONF', function(CONF) {
		
		 this.getTemplate = function (templateType, $stateParams, $templateCache, $http) {

		 			//check type
		 			if(templateType != 'list' && templateType != 'detail'){
		 				console.error('Undefinded type "'+templateType+'" for template');
		 				return;
		 			}

					var templateUrl;
					//receive template url from type given in url
					if($stateParams.type && $stateParams.type != '404'){

						if(templateType == 'list'){
							templateUrl = CONF.templates_folder + $stateParams.type + '/list.html';
						}
						else if(templateType == 'detail'){
							templateUrl = CONF.templates_folder + $stateParams.type + '/detail.html';
						}
					}
					//use 404 template, if no type was given
					else{
						templateUrl = CONF.templates_folder + CONF.error_template;
					}

					return $http
						.get(templateUrl, {cache: $templateCache})
						.then(
							//on success return template
							function(response) {
								return response.data;
							},
							//on failure return default template
							function(response){
								
								var altTemplateUrl;
								if(templateType == 'list'){
									altTemplateUrl = CONF.templates_folder + CONF.default_list_template;
								}
								else if(templateType == 'detail'){
									altTemplateUrl = CONF.templates_folder + CONF.default_detail_template;
								}

								console.warn('Template "'+templateUrl+'" is not available. Using "'+altTemplateUrl+'" instead.');
								
								return $http.get(altTemplateUrl, {cache: $templateCache})
									.then(
										function(response) {
											return response.data;
										}
									);
							}
						);
				}

		this.$get = function() {
			return {};
		}
	}]);