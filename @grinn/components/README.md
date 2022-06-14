# Components

Ce package est une lib de composants distribue2s sur les différents fronts de notre projet. Les composant très spécifiques à une certaine application sont crées dans cette application, les autre sont créés ici. Nous créons des composant typescripts, que nous compilons avant de les exporter, pour assurer une grand compatibilité des composants et éviter l'utilisation de loaders dans nos apps.

Les composants sont stylisés en utilisant principalement tailwindCSS, le fichier CSS contenant les classes est compilé dans `@grinn/styles`

## Structure d’un composant

Pour chaque composant react que nous developpons, l’arborescence a suivre est la suivante:

```json
MyComponent
├── MyComponent.stories.tsx
├── MyComponent.tsx
├── SubComponent1
│   └── index.tsx
│   └── ...
├── SubComponent2
│   └── index.tsx
│   └── ...
├── index.tsx
└── types.ts
```

```tsx
// MyComponent.tsx

import { FC } from "react";
import { MyComponentProps } from ".";
import { getExclamationMarks } from "./utils";

export const MyComponent: FC<MyComponentProps> = ({
  name,
  enthusiasmLevel,
}) => {
  return <div>Hello {name + getExclamationMarks(enthusiasmLevel)}</div>;
};
```

```tsx
// index.tsx

export * from "./MyComponent";
export * from "./types";
export * from "./SubComponent";
```

```tsx
// types.ts

export interface MyComponentProps {
  name: string;
  enthusiasmLevel?: number;
}
```

## Utilisation de Storybook

Storybook est un outil qui permet de decontextualiser un composant est l'afficher de manière isolée dans un environnement neutre. Pour ça, il faut creer des _stories_ pour nos composants (voir des exemples dans le dossier).
