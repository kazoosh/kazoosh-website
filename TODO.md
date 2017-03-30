#i18n
* translate all templates
* when creating json files from md's: if an attribute does not exist in the english md, copy it from the german. Do not overwirte attributes.

# BUGS
* why are missing templates load twice?

# CODE
* remove "jquery-placeholder" and "jquery.cookie"
* remove styles css from version control?
* check get steady part of readme
* include modernizer
*fix npm warnings:
	npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
	npm WARN deprecated minimatch@0.3.0: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
	npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
	npm WARN deprecated node-uuid@1.4.7: use uuid module instead
	npm WARN prefer global jsonlint@1.6.2 should be installed with -g
	> change grunt version to 1.0.1
	> 


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