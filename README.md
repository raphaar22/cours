# Cours de Physique-Chimie · Terminale

Site personnel de révision : cours complet, vocabulaire, fiche résumé et cartes mémo pour chaque chapitre.

## Ouvrir le site

- **Sur l'ordinateur** : double-cliquer sur `index.html` (ça marche sans internet).
- **En ligne / sur le téléphone** : une fois le dossier déposé sur GitHub Pages, ouvrir l'adresse du site puis « Ajouter à l'écran d'accueil » pour l'avoir comme une appli (utilisable hors ligne).

## Organisation des fichiers

```
Cours-Physique-Chimie/
  index.html        ← la page (ne pas modifier)
  style.css         ← l'apparence
  app.js            ← le fonctionnement (navigation, recherche, cartes…)
  chapitres.js      ← LA LISTE DES CHAPITRES (à compléter pour ajouter un chapitre)
  sw.js, manifest.json, icones/   ← installation sur téléphone et mode hors ligne
  lib/              ← marked (Markdown) et KaTeX (formules), inclus pour le hors ligne
  contenu/
    chimie/
      01-reactions-acide-base/
        cours.js        ← le cours long (Markdown)
        vocabulaire.js  ← liste de termes { terme, definition }
        fiche.js        ← la fiche résumé (Markdown)
        cartes.js       ← les cartes mémo { q, r }
      02-methodes-physiques-analyse/ …
    physique/  (vide pour l'instant)
    annexes/donnees-utiles/donnees.js  ← tableaux du rabat du manuel
```

## Ajouter un chapitre

1. Créer un dossier `contenu/chimie/03-nom-du-chapitre/` (ou `contenu/physique/…`).
2. Y mettre `cours.js`, `vocabulaire.js`, `fiche.js`, `cartes.js` sur le modèle des chapitres existants
   (l'identifiant passé à `definirContenu(...)` doit être `chimie/03-nom-du-chapitre`).
3. Ajouter le chapitre dans `chapitres.js`.

## Écrire le contenu (Markdown)

Dans `cours.js` et `fiche.js`, le texte est en Markdown avec des blocs spéciaux :

```
::: definition
Texte de la définition.
:::

::: exemple            (aussi : remarque, unites, securite, maths, conseil, methode, attention)
::: conseil Pour comprendre     ← titre personnalisé
::: equation           ← équations chimiques centrées, une par ligne
::: formule            ← une formule, puis --- puis la légende (une ligne par grandeur)
```

Formules mathématiques : `$…$` dans le texte, `$$…$$` centrées (syntaxe LaTeX/KaTeX).
Formules chimiques : écrire directement les indices en Unicode (H₃O⁺, CO₃²⁻, HCO₃⁻).
