# INSTALL TOOLS

## python

* https://www.python.org/downloads/
* python packetmanager: pip: sudo easy_install pip 
* python modul: frontmatter:
	* pip install python-frontmatter
	* or htps://pypi.python.org/pypi/python-frontmatter/0.1.1

## node js

* http://nodejs.org/download/


## ruby

* https://www.ruby-lang.org/de/downloads/
* ruby packetmanager: rubygems: 
	* https://rubygems.org/pages/download


## web tools

* bower: npm install -g bower
* grunt: npm install -g grunt-cli
* sass: sudo gem install sass


# INSTALL APP DEPENDENCIES

* npm install  (downloads node dependencies)
* bower install (downloads javascript libraries)


# RUN

## convert contents and continuously watch for changes
* grunt observe

## start webserver
* cd public_html/
* python -m SimpleHTTPServer (or any other webserver)



# CONFIGURATION

## "backend"
* see config.json
* for local configuration use config.local.default.json and copy it to config.local.json

## angular app

* see public_html/js/config.js

# CONTENT

Contents are taken from "contentSourceDirectory" defined in config, converted from markdown to json format and copied to "contentDestinationDirectory". For files having a matching folder (with the same name in the same parent folder) the folder contents are listed in the subpages attribute.

## content repository
The content repository for kazoosh website is located here: git@github.com:barnholdy/kazoosh-website-content.git. Check it out and set "contentSourceDirectory" and "imagesSourceDirectory" in config.js.


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

### page order in navgation

* use order attribute (CONF.nav_order_attribute) to define order in navigation
* pages with numbers smaller than zero are excluded from navigation


# TEMPLATES

Templates are located in "public_html/templates" and are choosen using the following fallback mechanism:

1. Template path from YAML front matter
2. Template path corresponding the file path and name (e.g. for content/root/mitglieder.md it's public_html/templates/root/mitglieder.html) 
3. Template path using "default.html" as name and file path as path (iteratively ascending the folder hierarchy) (e.g. for content/root/projekte/heat.md it's public_html/templates/root/projekte/default.html and then public_html/templates/root/default.html).