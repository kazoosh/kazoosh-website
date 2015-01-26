angular.module('config', [])
	.constant('CONF', {
		'name': 'development',
		'DS' : '/',
		'content_folder': '/content/',
		'root_folder': 'root/',
		'root_file': 'root.json',
		'templates_folder': '/templates',
		'image_folder': '/img/',

		'exlude_from_navigation': ['news', 'home'],

		'error_template': '404',
		'default_template': 'default',
		'template_extension': '.html',
		
		'subpages_attribute': 'subpages',
		'markdown_attribute': 'content',
		'markdown_to_html_attribute': 'html',
	});