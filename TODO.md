#i18n


BOWER vs. NPM

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

# BUG

* bei Umlauten und Sonderzeichen im Dateiname in:
	def __isFile(self, sourceDir, fileName):
		return os.path.isfile(os.path.join(sourceDir, fileName)) and not fileName.startswith('.')