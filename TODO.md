# deployment
* auf server appache site anlegen und kazoosh-website auschecken
* in owncloud ordner anlegen und kazoosh-website-content auschecken
* pfade in config.local.json anpassen
* grunt observe laufen lassen

## content changes commiten und pushen
* grunt job für kazoosh-website-content schreiben, der bei Änderungen automatisch commitet und pusht

## code deployment automatisieren
* github webhook anlegen, der website benachrichtigt, wenn release branch gepusht wird: https://developer.github.com/webhooks/
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

## header
* add breakpoint for large header > heigher ?

## Fonts
* http://www.impallari.com/dosis (schick und gut lesbar, Mischung aus technisch und verspielt)
* schnitte auswählen, nur benötigte schnitte laden

# weiteres
* cache für json files
* md2json: fehler bei fehlerhaften oder fehlenden *.md files checken