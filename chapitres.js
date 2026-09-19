/*
  Liste des chapitres du site.
  Pour ajouter un chapitre : ajouter une ligne ici, puis créer le dossier
  contenu/<matiere>/<dossier>/ avec les fichiers cours.js, vocabulaire.js, fiche.js, cartes.js.
*/

const MATIERES = {
  chimie: { nom: "Chimie", description: "Constitution et transformations de la matière" },
  physique: { nom: "Physique", description: "Mouvement, énergie, ondes et signaux" },
  annexes: { nom: "Données utiles", description: "Tableaux du rabat du manuel" },
};

const CHAPITRES = [
  {
    id: "chimie/01-reactions-acide-base",
    matiere: "chimie",
    numero: 1,
    titre: "Réactions acide-base",
    sousTitre: "Théorie de Brönsted, couples acide-base, espèces amphotères, écriture des équations",
    pages: "p. 38 à 41",
    fichiers: ["cours", "vocabulaire", "fiche", "cartes"],
  },
  {
    id: "chimie/02-methodes-physiques-analyse",
    matiere: "chimie",
    numero: 2,
    titre: "Méthodes physiques d'analyse d'un système chimique",
    sousTitre: "pH, spectroscopie UV-visible et IR, conductimétrie, dosage par étalonnage, gaz parfait",
    pages: "p. 62 à 67",
    fichiers: ["cours", "vocabulaire", "fiche", "cartes"],
  },
  {
    id: "annexes/donnees-utiles",
    matiere: "annexes",
    titre: "Données utiles",
    sousTitre: "Conductivités molaires ioniques, indicateurs colorés, pKa, lettres grecques, familles organiques, pictogrammes",
    pages: "rabats IV et V",
    fichiers: ["donnees"],
  },
];

/* Registre du contenu : chaque fichier de contenu appelle definirContenu(...) */
const CONTENU = {};
function definirContenu(id, type, valeur) {
  (CONTENU[id] = CONTENU[id] || {})[type] = valeur;
}

/* Rend la liste accessible au service worker (mise en cache hors ligne) */
if (typeof self !== "undefined") {
  self.CHAPITRES = CHAPITRES;
}
