# Workers

## Vue d'ensemble

Nous avons mis en place dans nos application une job queue à l'aide de graphile worker pour gérer en arrière-plan toutes les tàches non bloquantes pour les utilisateurs finaux, comme l'envoie de mail ou la génération de documents

## Structure de l'app `worker`

C'est une app typescript dont les sources se trouvent dans le dossier `src`. Dans ce dossier:

- `index.ts` pour définir les taches à surveiller (la BDD envoie de manière régulière des notif à graphile-worker, et graphile worker execute les taches correspoindantes s'il y a souscrit
- un dosier `utils` contenant des fonctions helpers partagées entre les diff tâches
- un dossier `tasks` contenant les différentes tâches à executer

## Graphile worker

La [documentation de Graphile Worker](https://github.com/graphile/worker) est concise et complete, nous en rappeleons ici les grands principes.

Graphile Worker est un système de job queue indépendant de Postgraphile (même si les deux s'intègrent particulièrement bien) qui nous permet de programmer des taches, à la demande ou de manière plannifiée (CRON) depuis une base de donne2es Postgres, et de les executer dans un environnement NodeJS

### déclanchement d'une tâche

Il est possible de déclancher une tâche depuis la base de donnée en executant la fonction `graphile_worker.add_job('nom_du_job', payload_json, options_json)`, qui va ajouter la tche etr le payload à une queue (ici une table dans la BDD). Cette tâche est ensuite envoyée par la base de données à un worker dans cette application, dès qu'il y en a un de disponible.

Il est aussi possible de déclancher une tâche depuis une autre tâche, par exemple pour assurer la séparation des responsabilités et permettre la mise en place de teches generiques comme l'envoie d'email.

Enfin il est possible de plannifier des taches depuis JS en utilisant la lib graphile-worker, mais notre experience nous laisse penser que nous avons plus vite fait d'envoyer un statement SQL depuis JS pour plannifier une tache, plutot que d'utiliser la lib node.

### Taches cron

Graphile Worker permet la mise en place de tâches cron. Cette fonctionnalité n'est pas encore utilisée actuellemenbt dans notre projet, se référrer à la doc officiel pour plus d'infos

### Taches génériques

Il est souvent utile de séparer la responsabilité des tâches en les chainant. Un exemple typique: pour l'envoie d'un email, une premièretache prépare le payload de l'email, puis appelle une seconde tache responsable de l'envoyer.

De meme pour la génération de PDF, une tache prépare les infos nécessaires à la création du pdf, une seconde tache crée le pdf (nous utilisons `puppeteer`) et une troisième tache envoie le mail.
