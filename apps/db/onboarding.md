# Onboarding des utilisateurs grinn.com

L'onboarding des utilisateurs consiste en un formulaire à plusieurs étapes dont l'objectif est de determiner la nature de leur projet et leur situation personnelle et professionnelle, afin de definir les conditions d'emprunt qui peuvent leur convenir. Un bon exemple dont nous inspirons sans le cacher est l'onboarding de la plateforme Pretto: <https://app.pretto.fr/>

## Modèle de données correspondant

Nous partageons les données entre deux tables principales: `borrowers` et `borrowing_case` afin de separer ce qui concerne le projet en lui même et les infos des emprunteurs, qui peuvent etre plusieurs par projet.

### Infos collectées pour le projet

| nom api                     | contraintes                                                                                     | default                 | description                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `isBorrowerAlone`           | `boolean`                                                                                       | `true`                  | seul ou à deux ? (y a-t-il un co-emprunteur ?)                                                       |
| `projectType`               | `Residence principale - Residence secondaire - investissement locatif` - `Residence principale` | projet pour le logement |
| `projectCity`               | `text`                                                                                          | `N.A.`                  | ville de votre projet                                                                                |
| `projectZipCode`            | `text`                                                                                          | `N.A.`                  | code postal de votre projet                                                                          |
| `projectAssetType`          | `Ancien - Neuf - Vente sur plan (VEFA)`                                                         | `Ancien`                | nature du logement                                                                                   |
| `projectAssetNature`        | `appartement - maison individuelle`                                                             | `Appartemet`            | Nature du logement                                                                                   |
| `assetPrice`                | `int`                                                                                           | `N.A.`                  | prix du bien (FAI)                                                                                   |
| `isWorkPlanned`             | `boolean`                                                                                       | `false`                 | y a-t-il des travaux prévus ?                                                                        |
| `workPlannedCost`           | `int`                                                                                           | `n.a.`                  | cout des travaux prevu, en cts dans la BDD                                                           |
| `finnancialContribution`    | `int`                                                                                           | `n.a.`                  | apport                                                                                               |
| `remainingSavings`          | `int`                                                                                           | `n.a.`                  | ce qu'il restera apres l'achat                                                                       |
| `numberOfDependentChildren` | `int`                                                                                           | 0                       | nombre d'enfants à charge (info emprunteur, mais commune à ts les emprunteurs donc inclue au projet) |

## Infos collectées par emprunteur

| nom api                    | contraintes                                                                                                                                                                                                                                                                                                            | default           | description                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| `age`                      | `int`                                                                                                                                                                                                                                                                                                                  | `n.a.`            | age de la personne au moment du questionnaire                     |
| `livingCity`               | `text`                                                                                                                                                                                                                                                                                                                 | `n.a.`            | ville de residence de l'achetant                                  |
| `livingZipCode`            | `text`                                                                                                                                                                                                                                                                                                                 | `n.a.`            | code postal de residence de l'achetant                            |
| `hosting`                  | `locataires - propriétaires - hebergé gratuitement - logement de fonction`                                                                                                                                                                                                                                             | `locataire`       | mode d'hebergement                                                |
| `rent`                     | `int`                                                                                                                                                                                                                                                                                                                  | `n.a.`            | si locataire, à combien s'eleve votre loyer ?                     |
| `isBorrowerSellingHousing` | `boolean`                                                                                                                                                                                                                                                                                                              | `false`           | si propriétaire, souhaitez-vous vendre votre bien pour acvheter ? |
| `workSituation`            | `CDI (cadre) - CDI (non cadre) - CDI (en période d'essai) - CDD - Titulaire - Profession libérale - Vacataire - Chef d'entreprise - Gérant salarié - Commerçant - Agriculteur - Artisan - Intérimaire - Intermittent du spectacle - auto-entrepreneur - Etudiant - retraité - sans profession - en recherche d'emploi` | `CDI (non cadre)` | situation professionnelle:                                        |
| `jobStartDate`             | `date`                                                                                                                                                                                                                                                                                                                 | `n.a.`            | depuis quand ? donner une date sous le format mois/annee          |
| ``                         | `Mesuel brut - Mensuel net - Annuel brut - Annuel net`                                                                                                                                                                                                                                                                 | `Annuel brut`     | comment souhaitez-vous exprimer votre revenu ? ``                 |
| ``                         | ``                                                                                                                                                                                                                                                                                                                     | ``                |
| ``                         | ``                                                                                                                                                                                                                                                                                                                     | ``                |
| ``                         | ``                                                                                                                                                                                                                                                                                                                     | ``                |
| ``                         | ``                                                                                                                                                                                                                                                                                                                     | ``                |
| ``                         | ``                                                                                                                                                                                                                                                                                                                     | ``                |

-
-
- `
-
-
- Montant du revenu, indiquer le prix en centimes en BDD
- sur combien de mois le revenu est-il versé ? mettre un choix limité dans un select 12,13,14,15
- Avez-vous eu des primes ces trois dernieres années ? (info incluse dans le champ suivant)
- Quel a été ler montant annuel moyen de ces primes
- revenus additionnels ? prevoir quatre champs:
  - revenus locatifs
  - auto-entreprise
  - allocations
  - pension alimentaires
- versez-vous une pension alimentaire ? Son montant ? (la presence d'un montant vaudra pour boolean)

## Pour chaque emprunteur, on peut renseigner plusieurs credits en cours, on le fait dans un table à part, avec une relation one to many

- type de credit `credit immobilier - crédit conso - crédit voiture - crédit étudiant - LOA ou leasing - Autre crédit`
- mensualité (enregistrer le montant en centimes)
- date de fin
