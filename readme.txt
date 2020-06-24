Qui un esempio di creazione di immagine docker con passaggio di variabili d'ambiente.
Abbiamo un file html e due file javascript nella cartella js/.
Uno dei due file javascript si chiama env.template.js e contiene il nome delle variabili d'ambiente che passeremo all'applicativo frontend.
Le variabili hanno la notazione "${NOME_VARIABILE}".
La pagina html importa il file env.js che non esiste ancora e poi solo successivamente il file script.js che usa le variabili prese da env.js.
La creazione di env.js avviene tramite un comando di linux che sostituisce ad un testo le variabili d'ambiente con i valori trovati:

Ad esempio se esportiamo una variabile e lanciamo il comando linux envsubsts questo crea un file env.js a partire da env.template.js sostituendovi le variabili d'ambiente trovate:
# Set environment variable
export API_URL="https://new-api.myapp.com";

# Replace variables in env.js
envsubst < js/env.template.js > js/env.js

quando l'html importa env.js va ad importare i valori corretti presi dalle variabili d'ambiente.

Se vogliamo usare docker (o k8s) per servire file statici che abbiano configurazioni (variabili d'ambiente) diverse, possiamo appunto creare il file env.template.js che elenca le variabili d'ambiente, i file javascript che importati solo dopo il neo generato env.js usino tali variabili e il file html.

Poi possiamo scrivere il Dockerfile che usa l'immagine base di nginx, ci copia i file html e js statici e poi al termine, all'avvio del container, chiama il comando linux per generare env.js in base alle variabili d'ambiente effettivamente passate al container.

Con questa situazione:
$ tree -C 
.
├── Dockerfile
├── js
│   ├── env.template.js
│   └── script.js
└── page.html

creiamo e avviamo l'immagine docker a partire dal Dockerfile:
1. docker build -f Dockerfile -t alessandroargentieri/static-html . 
2. sudo docker run -e API_URL="https://weirdo.com" -e DEBUG=true -d -p 80:80 alessandroargentieri/static-html 

andando su http://localhost:80/page.html vedremo i popup con le giuste variabili d'ambiente.
