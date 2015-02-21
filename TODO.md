# content conversion
* time.localtime(os.stat(filePath).st_birthtime does not work on server

# deployment
* ~~auf server appache site anlegen und kazoosh-website auschecken~~
* ~~in owncloud ordner anlegen und kazoosh-website-content auschecken~~
* ~~pfade in config.local.json anpassen~~
* ~~grunt observe laufen lassen~~
* owncloud ordner sharen


## code deployment automatisieren
* github webhook anlegen, der website benachrichtigt, wenn release branch gepusht wird: https://developer.github.com/webhooks/
* npm module: https://www.npmjs.com/package/webhook-deployer
* nodejs: http://fideloper.com/node-github-autodeploy
* php: http://stackoverflow.com/questions/9132144/how-can-i-automatically-deploy-my-app-after-a-git-push-github-and-node-js


### Deploy Skript
* git pull
* npn install
* bower install
* restart grunt observe-contents

### Workflow
* in release branch mergen
* taggen
* github release erstellen


# design
* Menüleiste in Hompage automatisch an untere Bildschirmkante anpassen
* footer, wenn sichtbar, immer am unteren rand auch wenn seite zu kurz
* kontaktseite stylen


## menu
* make menu and header sticky when scrolling
* needed? (mark current page in menu)
* ~~add menu toggle for mobile view~~


* unterseiten titel auf mobil ist teils zu lang
* auf Homepage logo nicht doppelt anzeigen
* projekte/workshops bildder breiter mit text
* startseite projekte ikl. Datum
* auf startseite titel für gefeaturete inhalte


## Fonts
* http://www.impallari.com/dosis (schick und gut lesbar, Mischung aus technisch und verspielt)
* schnitte auswählen, nur benötigte schnitte laden

# weiteres
* cache für json files
* md2json: fehler bei fehlerhaften oder fehlenden *.md files checken



Kazoosh! Deployment


Offene Fragen
- wie wird der grund observe job gestartet und neugestartet?
- muss ein Neustart erfolgen?



