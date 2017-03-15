angular.module('kazoosh')
	.factory('ContentService', [
		'CONF',
		'$http',
		'$q',
		'_',
		'$state',
		function(CONF, $http, $q, _, $state) {
			return{
				getContent: function(path){
					var that = this;
					var deferred = $q.defer();
					var pathArray = path.split(CONF.DS);
					var id = pathArray[pathArray.length-1];
					var type = pathArray[pathArray.length-2];
					var lang = that._getLang();
					$http.get(CONF.site_url + CONF.content_folder + path + lang + '.json')
						.success(function(content){
							content = that._extendAttributes(content, {path: path, type: type, id: id});
							//get subpages
							var requests = [];
							if(content[CONF.subpages_attribute]){
								content[CONF.subpages_attribute].forEach(function(path, i){
									requests.push(that.getContent(path));
								});
							}
							$q.all(requests)
								.then(
									function(data){
										content[CONF.subpages_attribute] = data;
										deferred.resolve(content);
									},
									function(data){
										deferred.reject(null);
									}
								);
						})
						.error(function(content, status, headers, config) {
							deferred.reject(null);
						});
					return deferred.promise;
				},
				_extendAttributes: function(content, attributes){
					attributes = _.extend({}, attributes);
					var converter = new Showdown.converter();
					//parse markdown
					if(content[CONF.markdown_attribute]){
						content[CONF.markdown_to_html_attribute] = converter.makeHtml(content[CONF.markdown_attribute]);
					}
					// add attributes to content
					for(var key in attributes){
						if(!content[key]){
							content[key] = attributes[key];
						}
					}
					//extend image path
					if(content.images){
						content.images.forEach(function(value, key){
							content.images[key] = CONF.image_folder + value;
						});
					}
					return content;
				},
				_getLang: function(){
					var lang = $state.params.lang;
					return (lang === undefined || lang === 'de') ? '' : '_' + lang;
				}
			};
		}
	]);