angular.module('kazoosh')
	.factory('ContentService', ['CONF', '$http', '$q', function(CONF, $http, $q) {
		return{
			getList: function(type){

				var that = this;
				var deferred = $q.defer();

				$http.get(CONF.content_folder + type + '.json')
					.success(function(list){

						for(var id in list){
							list[id] = that._extendAttributes(list[id], {id: id});
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
							detail = that._extendAttributes(detail);
						}
						
						deferred.resolve(detail);
					})
					.error(function(list, status, headers, config) {
						deferred.reject(null);
					});

				return deferred.promise;
			},

			_extendAttributes: function(content, attributes){

				var converter = new Showdown.converter();

				//parse markdown
				content[CONF.markdown_to_html_attribute] = converter.makeHtml(content[CONF.markdown_attribute]);

				//add id attribute
				if(!content.id && attributes.id){
					content.id = attributes.id;
				}

				//extend image path
				if(content.image){
					content.image = CONF.image_folder + content.image;
				}

				return content;
			}
		};
	}]);