angular.module('config', [])
	.constant('CONF', {
		'name': 'development',
		'content_folder': '/content/',
		'templates_folder': '/templates/',
		'image_folder': '/img/',

		'error_template': '404.html',
		'default_list_template': 'list.html',
		'default_detail_template': 'detail.html',

		'exlude_from_navigation': ['other'],
		
		'markdown_attribute': 'preview',
		'markdown_to_html_attribute': 'html',
	});