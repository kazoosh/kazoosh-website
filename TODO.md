#i18n
* translate all templates
* when creating json files from md's: if an attribute does not exist in the english md, copy it from the german. Do not overwirte attributes.

# BUGS
* why are missing templates load twice?

# CODE
* minify & ubscrue own js + css (introduce build process)
	>>> see how yoeman does it
	* create scr and dist (dev, production) folder
		* bower_components, content, css, js (concated) only go in dist
	* copy all folders in src to dist with grunt task
		* sass > css
		* js/* > app.js
		* only user app.js or app.min.js in dist 
	* move fonts one level up
	* remove "jquery-placeholder" and "jquery.cookie"
	* remove styles css from version control?
	* check get steady part of readme

# content conversion
* time.localtime(os.stat(filePath).st_birthtime does not work on server

## Checks
* was passiert, bei fehlerhaften mds?
* was passiert, wenn andere Formate in md ordner?
* ...
* cache für json files?

# design
* teilnehmer bei workshops
* unterseiten titel auf mobil ist teils zu lang
* projekte/workshops Bilder breiter machen und Text anzeigen
* menu und header sticky beim Scrollen
* auf Homepage logo nicht doppelt anzeigen
* Menüleiste in Hompage automatisch an untere Bildschirmkante anpassen
* footer, wenn sichtbar, immer am unteren rand auch wenn seite zu kurz
* kontaktseite stylen
* aktuelle Seite im Menu markieren
* mobiles Menü?

* Metaangaben in root.md