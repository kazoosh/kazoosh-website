# INSTALL TOOLS

* python: https://www.python.org/downloads/
* node: http://nodejs.org/download/
* rubygems: https://rubygems.org/pages/download
* bower: npm install -g bower
* grunt: npm install -g grunt-cli
* sass: sudo gem install sass


# INSTALL APP DEPENDENCIES

* npm install  (downloads node dependencies)
* bower install (downloads javascript libraries)
* https://pypi.python.org/pypi/python-frontmatter/0.1.1 (not needed, yet)


# RUN

## convert contents and continuously watch for changes
* grunt observe

## start webserver
* cd public_html/
* python -m SimpleHTTPServer (or any other webserver)



# CONFIGURATION

* see public_html/js/config.js

## exlude_from_navigation

* add folders in content folder to exclude from navigation

# CONTENT

Contents are taken from "content" folder, converted from markdown to json format and copied to "public_html/content". For files having a matching folder (with the same name in the same parent folder) the folder contents are listed in the subpages attribute.

## markdown file structure

Markdown files consit of two parts:

* YAML front matter
* markdown body


### YAML front matter
	---
	template: root/projekte/alice.html

	title: Alice im Wunderland
	teaser: Am 16.-26. November ...

	images:
	- projekte/alice_im_wunderland_1.png
	- projekte/alice_im_wunderland_2.png

	...
	
	---
	

### markdown body

	# Headline 1
	
	## Headline 2
	
	* Listitem
	
	...

### images

...

# TEMPLATES

Templates are located in "public_html/templates" and are choosen using the following fallback mechanism:

1. Template path from YAML front matter
2. Template path corresponding the file path and name (e.g. for content/root/mitglieder.md it's public_html/templates/root/mitglieder.html) 
3. Template path using "default.html" as name and file path as path (iteratively ascending the folder hierarchy) (e.g. for content/root/projekte/heat.md it's public_html/templates/root/projekte/default.html and then public_html/templates/root/default.html).