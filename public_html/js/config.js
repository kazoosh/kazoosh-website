(function () {
	'use strict';

	angular.module('config', [])
		.constant('CONF', {
			'site_url': '',
			'name': 'development',
			'DS' : '/',
			'content_folder': 'content/',
			'root_folder': 'root/',
			'root_file': 'root.json',
			'templates_folder': 'templates',
			'image_folder': 'img/',

			'error_template': '404',
			'default_template': 'default',
			'template_extension': '.html',
			
			'default_page_class_prefix': '_default',

			'nav_order_attribute': 'order',
			'subpages_attribute': 'subpages',
			'markdown_attribute': 'content',
			'markdown_to_html_attribute': 'html',
		});
}());