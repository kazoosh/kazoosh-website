angular.module('kazoosh')
	.factory('ContentService', ['CONF', '$http', '$q', '_', function(CONF, $http, $q, _) {
		return{
			getContents: function(){

				var that = this;
				var deferred = $q.defer();

				$http.get(CONF.content_folder + 'contents.json')
					.success(function(list){
						deferred.resolve(list);
					})
					.error(function(list, status, headers, config) {
						deferred.reject(null);
					});

				return deferred.promise;
			},
			getList: function(type){

				var that = this;
				var deferred = $q.defer();

				$http.get(CONF.content_folder + type + '.json')
					.success(function(list){

						for(var id in list){
							list[id] = that._extendAttributes(list[id], {type: type, id: id});
						}

						deferred.resolve(list);
					})
					.error(function(list, status, headers, config) {
						deferred.reject(null);
					});

				return deferred.promise;
			},
			getDetail: function(type, id){

				var that = this;
				var deferred = $q.defer();

				$http.get(CONF.content_folder + type + '.json')
					.success(function(list){

						var detail = list[id];

						if(detail){
							detail = that._extendAttributes(detail, {type: type, id: id});
						}
						
						deferred.resolve(detail);
					})
					.error(function(list, status, headers, config) {
						deferred.reject(null);
					});

				return deferred.promise;
			},

			_extendAttributes: function(content, attributes){

				attributes = _.extend({}, attributes);

				var converter = new Showdown.converter();

				//parse markdown
				content[CONF.markdown_to_html_attribute] = converter.makeHtml(content[CONF.markdown_attribute]);

				// add attributes to content
				for(var key in attributes){
					if(!content[key]){
						content[key] = attributes[key];
					}
				}

				//extend image path
				if(content.image){
					content.image = CONF.image_folder + content.image;
				}

				return content;
			}
		};
	}]);