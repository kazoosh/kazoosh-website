# content conversion
* time.localtime(os.stat(filePath).st_birthtime does not work on server

# deployment
* ~~auf server appache site anlegen und kazoosh-website auschecken~~
* ~~in owncloud ordner anlegen und kazoosh-website-content auschecken~~
* ~~pfade in config.local.json anpassen~~
* ~~grunt observe laufen lassen~~
* ~~projekt auf kazoosh github account verschieben~~
* owncloud ordner sharen


## code deployment automatisieren

### Stand

* ~~webhook-deployer installieren~~
* ~~webhook-deployer configurieren (git pull, npn install, bower install)~~
* webhook-deployer im hintergrund laufen lassen
* config so anpassen, dass nur bei github releases deployt wird (in release branch mergen, taggen, github release erstellen)
* prüfen, ob grunt neugestartet werden muss


* github webhook anlegen, der website benachrichtigt, wenn release branch gepusht wird: https://developer.github.com/webhooks/
* npm module: https://www.npmjs.com/package/webhook-deployer
* nodejs: http://fideloper.com/node-github-autodeploy
* php: http://stackoverflow.com/questions/9132144/how-can-i-automatically-deploy-my-app-after-a-git-push-github-and-node-js


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



