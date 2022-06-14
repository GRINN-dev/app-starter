# Ajout d'icone

A chaque fois qu'on ajoute une icone, on copie le code svg dans un nouveau fichier, qui portera le nom de l'icone. Attention, il fadra systematiquement mettre les valeurs `stroke`, `stroke-linecap` et `stroke-linejoin` dans le composant `svg` parent, et mettre pour stroke: `stroke="currentColor"`

# Build

Pour build le composant apres l'ajout d'une icone, il suffit de lancer la commande `yarn workspace @grinn/icons build`
