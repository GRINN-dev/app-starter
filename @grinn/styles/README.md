# `@grinn/styles`

Nous utilisons dans le projet de manière générale Tailwind CSS dès que possible pour styliser nos composant. Du à l'architecture monorepo et aux provenances variées des composants, pour éviter de doublonner les classes générées, nous avons mis en place ce packege qui utilise le CLI de tailwind pour inspecter l'ensemble des apps et packages du repo à la recherche des classes tailwind et générer l'output CSS correspondant.

De plus, dans les cas ou faire du CSS n'est pas une option, il est possible de faire du CSS custom dans le fichier `src/input.css`

NOTA: le fichier `tailwind.config.js` contient une clé `content` qui indique les packeages à inspecter à la recherche de classes tailwind. Si ajout d'un nouveau package, alore il convient de compléter ce champ.
