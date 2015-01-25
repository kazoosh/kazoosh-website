angular.module('config', [])
	.constant('CONF', {
		'name': 'development',
		'content_folder': '/content2/',
		'templates_folder': '/templates/',
		'image_folder': '/img/',

		'exlude_from_navigation': ['news', 'home'],

		'error_template': '404.html',
		'default_list_template': 'list.html',
		'default_detail_template': 'detail.html',
		
		'markdown_attribute': 'content',
		'markdown_to_html_attribute': 'html',
	});