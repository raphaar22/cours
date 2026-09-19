/* Chapitre 1 — Réactions acide-base — QUIZ
   Deux types de questions :
     { type: "qcm",    q, choix: [...], bonne: indice, explication, piege: true (facultatif) }
     { type: "saisie", q, reponses: [toutes les formulations acceptées], solution, explication }
   Les réponses tapées sont comparées sans tenir compte des accents, des espaces,
   des tirets, des articles ni des états physiques (aq), (s), (g), (ℓ).
*/
definirContenu("chimie/01-reactions-acide-base", "quiz", [

  /* ---------- Les bases de la théorie ---------- */
  {
    type: "qcm",
    q: "Au sens de Brönsted, un **acide** est une espèce chimique capable de…",
    choix: ["céder un ion hydrogène H⁺", "capter un ion hydrogène H⁺", "céder un électron", "capter un électron"],
    bonne: 0,
    explication: "Un **acide cède** un ion H⁺ : AH = A⁻ + H⁺. C'est la **base** qui capte un H⁺. Céder ou capter un **électron**, c'est l'oxydoréduction, une autre famille de réactions.",
  },
  {
    type: "qcm",
    q: "Au sens de Brönsted, une **base** est une espèce chimique capable de…",
    choix: ["capter un ion hydrogène H⁺", "céder un ion hydrogène H⁺", "capter un ion hydroxyde HO⁻", "libérer un ion hydroxyde HO⁻"],
    bonne: 0,
    explication: "Une **base capte** un ion H⁺ : A⁻ + H⁺ = AH. Attention, « libérer un ion HO⁻ » est l'ancienne définition d'Arrhenius, plus restrictive : l'ammoniac NH₃ est une base de Brönsted alors qu'il ne contient aucun HO⁻.",
    piege: true,
  },
  {
    type: "saisie",
    q: "Combien d'**électrons** possède un ion hydrogène H⁺ ?",
    reponses: ["0", "zero", "aucun", "il n'en a aucun", "zéro"],
    solution: "0 (aucun)",
    explication: "L'atome d'hydrogène n'a qu'un seul électron. En le perdant, il devient H⁺ : il ne reste que le **noyau**, c'est-à-dire un proton, avec une **lacune électronique**. C'est cette lacune qu'un doublet non liant de la base vient combler.",
  },
  {
    type: "qcm",
    q: "Pourquoi écrit-on les demi-équations acido-basiques avec un signe **=** et non avec une flèche → ?",
    choix: [
      "Parce qu'elles sont formelles : l'ion H⁺ seul n'existe pas en solution",
      "Parce que la réaction est toujours totale",
      "Parce que la réaction se fait dans les deux sens en même temps",
      "Parce que c'est une convention sans signification"
    ],
    bonne: 0,
    explication: "Une demi-équation est une **écriture formelle** : elle sert seulement à montrer le transfert de H⁺. Dans la réalité, un ion H⁺ ne se promène jamais seul en solution, il passe directement d'un acide à une base. L'équation **bilan**, elle, s'écrit bien avec une flèche →.",
  },

  /* ---------- Reconnaître acide et base ---------- */
  {
    type: "saisie",
    q: "Dans la réaction NH₃ + H₃O⁺ → NH₄⁺ + H₂O, quelle espèce joue le rôle d'**acide** ?",
    reponses: ["h3o+", "ion oxonium", "l'ion oxonium", "oxonium", "h3o", "H₃O⁺"],
    solution: "H₃O⁺ (l'ion oxonium)",
    explication: "H₃O⁺ **perd** un H⁺ et devient H₂O : c'est donc l'acide. NH₃ **gagne** un H⁺ et devient NH₄⁺ : c'est la base. Méthode : compare chaque réactif à son produit et regarde qui a perdu un H.",
  },
  {
    type: "saisie",
    q: "Quelle est la **base conjuguée** de l'acide éthanoïque CH₃–COOH ?",
    reponses: ["ch3coo-", "ch3-coo-", "ion ethanoate", "l'ion ethanoate", "ethanoate", "ch3coo", "CH₃COO⁻", "acetate", "ion acetate"],
    solution: "CH₃–COO⁻ (l'ion éthanoate)",
    explication: "L'acide cède le H⁺ de son groupe **carboxyle –COOH** (c'est la liaison O–H qui est polarisée, pas les C–H du CH₃). Il reste CH₃–COO⁻. Le couple s'écrit CH₃–COOH / CH₃–COO⁻.",
  },
  {
    type: "saisie",
    q: "Quel est l'**acide conjugué** de l'ammoniac NH₃ ?",
    reponses: ["nh4+", "ion ammonium", "l'ion ammonium", "ammonium", "nh4", "NH₄⁺"],
    solution: "NH₄⁺ (l'ion ammonium)",
    explication: "L'acide conjugué d'une base, c'est la base **plus un H⁺** : NH₃ + H⁺ = NH₄⁺. Le couple s'écrit NH₄⁺ / NH₃, l'acide toujours à gauche.",
  },
  {
    type: "qcm",
    q: "Dans une formule, à quoi reconnaît-on un **acide** de Brönsted ?",
    choix: [
      "À un atome d'hydrogène lié à un atome d'oxygène ou d'azote",
      "À la présence d'un atome d'hydrogène, quel qu'il soit",
      "À une charge positive sur la molécule",
      "À un doublet non liant sur l'oxygène"
    ],
    bonne: 0,
    explication: "Il faut une **liaison polarisée** O–H ou N–H (l'écart d'électronégativité dépasse 0,4) : l'hydrogène y est appauvri en électrons et peut partir en H⁺. Un H lié à un carbone ne part pas, et le méthane CH₄ n'est pas un acide bien qu'il ait quatre hydrogènes.",
    piege: true,
  },
  {
    type: "qcm",
    q: "Dans une formule, à quoi reconnaît-on une **base** de Brönsted ?",
    choix: [
      "À un atome d'oxygène ou d'azote portant un doublet non liant",
      "À la présence d'un ion hydroxyde HO⁻ dans la formule",
      "À une charge négative, obligatoirement",
      "À une double liaison C=O"
    ],
    bonne: 0,
    explication: "C'est le **doublet non liant** de l'oxygène ou de l'azote qui vient combler la lacune électronique du H⁺. La charge négative aide mais n'est pas obligatoire : NH₃ et la méthylamine CH₃–NH₂ sont neutres et pourtant basiques.",
  },

  /* ---------- Couples et ions spectateurs ---------- */
  {
    type: "qcm",
    q: "Comment s'écrit, par convention, un couple acide-base ?",
    choix: ["AH / A⁻ : l'acide à gauche", "A⁻ / AH : la base à gauche", "AH + A⁻", "A⁻ → AH"],
    bonne: 0,
    explication: "La forme **acide est toujours à gauche**, la forme basique à droite. Cela ne veut pas dire que la base porte une charge négative : le couple NH₄⁺ / NH₃ a une base neutre.",
  },
  {
    type: "saisie",
    q: "Dans l'acide chlorhydrique (H₃O⁺(aq), Cl⁻(aq)), quel ion est **spectateur** ?",
    reponses: ["cl-", "ion chlorure", "l'ion chlorure", "chlorure", "cl", "Cl⁻"],
    solution: "Cl⁻ (l'ion chlorure)",
    explication: "Les propriétés acides viennent **uniquement** de l'ion oxonium H₃O⁺. L'ion chlorure ne fait qu'assurer la neutralité électrique de la solution : il n'apparaît pas dans l'équation de la réaction. Même logique pour NO₃⁻ dans l'acide nitrique et Na⁺ dans la soude.",
  },
  {
    type: "qcm",
    q: "À quoi sont dues les propriétés basiques d'une solution de soude (Na⁺(aq), HO⁻(aq)) ?",
    choix: ["Uniquement à l'ion hydroxyde HO⁻", "Uniquement à l'ion sodium Na⁺", "Aux deux ions à parts égales", "À la molécule NaOH restée entière en solution"],
    bonne: 0,
    explication: "Seul **HO⁻** capte les ions H⁺. Na⁺ est un ion spectateur. Et en solution, la soude est entièrement dissociée : il n'y a pas de « molécule NaOH » qui flotte.",
    piege: true,
  },
  {
    type: "qcm",
    q: "Quel est le couple acide-base auquel appartient l'ion carbonate CO₃²⁻ en tant que **base** ?",
    choix: ["HCO₃⁻ / CO₃²⁻", "H₂CO₃ / HCO₃⁻", "CO₃²⁻ / HCO₃⁻", "H₂CO₃ / CO₃²⁻"],
    bonne: 0,
    explication: "CO₃²⁻ capte un H⁺ et devient HCO₃⁻ : son acide conjugué est donc l'ion hydrogénocarbonate, et le couple s'écrit **HCO₃⁻ / CO₃²⁻** (acide à gauche). Un couple ne diffère jamais que d'**un seul** H⁺, ce qui élimine H₂CO₃ / CO₃²⁻.",
  },

  /* ---------- Espèces amphotères ---------- */
  {
    type: "saisie",
    q: "Comment appelle-t-on une espèce qui peut se comporter **à la fois** comme un acide et comme une base ?",
    reponses: ["amphotere", "une espece amphotere", "espece amphotere", "amphotère", "ampholyte"],
    solution: "une espèce amphotère",
    explication: "Elle appartient à **deux couples** : une fois comme acide, une fois comme base. Exemples : l'eau H₂O (couples H₃O⁺/H₂O et H₂O/HO⁻), l'ion hydrogénocarbonate HCO₃⁻, et le zwitterion des acides α-aminés.",
  },
  {
    type: "saisie",
    q: "Écris les **deux couples** auxquels appartient l'eau (sépare-les par une virgule).",
    reponses: ["h3o+/h2o, h2o/ho-", "h3o+/h2o h2o/ho-", "h2o/ho-, h3o+/h2o", "h3o+/h2o et h2o/ho-", "h2o/ho- et h3o+/h2o", "h3o/h2o, h2o/ho"],
    solution: "H₃O⁺ / H₂O et H₂O / HO⁻",
    explication: "L'eau est la **base** du couple H₃O⁺/H₂O (elle peut capter un H⁺ pour donner H₃O⁺) et l'**acide** du couple H₂O/HO⁻ (elle peut céder un H⁺ pour donner HO⁻). C'est pour cela qu'elle est amphotère.",
  },
  {
    type: "qcm",
    q: "L'ion hydrogénocarbonate HCO₃⁻ réagit avec l'ammoniac NH₃, qui est une base. Quel rôle joue alors HCO₃⁻ ?",
    choix: ["Un acide : il cède un H⁺ et devient CO₃²⁻", "Une base : il capte un H⁺ et devient H₂CO₃", "Un ion spectateur", "Il ne réagit pas avec une base"],
    bonne: 0,
    explication: "Face à une **base**, qui ne peut que capter un H⁺, l'espèce amphotère est obligée de jouer l'**acide** : HCO₃⁻ + NH₃ → CO₃²⁻ + NH₄⁺. Face à un acide comme l'acide citrique, c'est l'inverse : HCO₃⁻ joue la base.",
    piege: true,
  },

  /* ---------- Écrire une équation ---------- */
  {
    type: "qcm",
    q: "On fait réagir l'acide éthanoïque CH₃–COOH avec les ions hydroxyde HO⁻. Quelle est l'équation de la réaction ?",
    choix: [
      "CH₃–COOH + HO⁻ → CH₃–COO⁻ + H₂O",
      "CH₃–COOH + HO⁻ → CH₃–COOH₂⁺ + O²⁻",
      "CH₃–COO⁻ + H₂O → CH₃–COOH + HO⁻",
      "CH₃–COOH + H₂O → CH₃–COO⁻ + H₃O⁺"
    ],
    bonne: 0,
    explication: "Couples en jeu : CH₃–COOH / CH₃–COO⁻ et H₂O / HO⁻. On croise l'**acide du premier** avec la **base du second** : CH₃–COOH cède son H⁺ à HO⁻, qui devient H₂O. La proposition 3 est la réaction inverse, et la 4 fait réagir l'acide avec l'eau, ce qui n'est pas ce qu'on demande.",
  },
  {
    type: "saisie",
    q: "Lors d'un détartrage, les ions oxonium H₃O⁺ réagissent avec les ions carbonate CO₃²⁻ du tartre. Quels sont les **deux produits** formés ? (sépare-les par une virgule)",
    reponses: ["h2o, hco3-", "hco3-, h2o", "h2o et hco3-", "hco3- et h2o", "eau, hco3-", "h2o hco3-", "l'eau et l'ion hydrogenocarbonate", "eau et ion hydrogenocarbonate"],
    solution: "H₂O et HCO₃⁻",
    explication: "H₃O⁺ cède un H⁺ et devient H₂O ; CO₃²⁻ capte ce H⁺ et devient HCO₃⁻. L'équation est H₃O⁺ + CO₃²⁻ → H₂O + HCO₃⁻. Les ions Cl⁻ et Ca²⁺ sont spectateurs et n'apparaissent pas.",
  },
  {
    type: "qcm",
    q: "Pour écrire l'équation d'une réaction acide-base à partir de deux couples, on fait réagir…",
    choix: [
      "l'acide d'un couple avec la base de l'autre couple",
      "les deux acides entre eux",
      "les deux bases entre elles",
      "l'acide et la base du même couple"
    ],
    bonne: 0,
    explication: "On écrit les deux couples l'un sous l'autre et on relie « en croix » : l'**acide** de l'un cède son H⁺ à la **base** de l'autre. Les produits sont la base du premier couple et l'acide du second. L'acide et la base d'un même couple ne réagissent pas ensemble.",
  },
  {
    type: "qcm",
    q: "Une réaction acide-base est-elle toujours **totale** ?",
    choix: ["Non, pas toujours", "Oui, toujours", "Oui, si l'un des réactifs est un ion", "Oui, si la solution est diluée"],
    bonne: 0,
    explication: "Le cours le précise explicitement : « Une telle réaction n'est pas toujours totale. » Certaines s'arrêtent avant que le réactif limitant ait disparu — on parlera d'équilibre plus tard dans l'année.",
    piege: true,
  },

  /* ---------- Identifier et pH ---------- */
  {
    type: "qcm",
    q: "Comment reconnaît-on qu'une équation modélise une réaction **acide-base** ?",
    choix: [
      "Une espèce perd un H⁺ et une autre en gagne un",
      "Une espèce perd un électron et une autre en gagne un",
      "Un précipité se forme",
      "La solution change de couleur"
    ],
    bonne: 0,
    explication: "Le marqueur, c'est le **transfert d'un ion H⁺** : compare chaque réactif à son produit ; l'un a exactement un H de moins, l'autre un H de plus. Le transfert d'électrons, c'est l'oxydoréduction. Un changement de couleur peut accompagner la réaction (indicateur coloré) mais ne la définit pas.",
  },
  {
    type: "qcm",
    q: "On ajoute de la soude à une solution d'acide éthanoïque contenant du BBT. La solution passe du jaune au bleu. Qu'en déduit-on ?",
    choix: [
      "Le pH a augmenté : une réaction acide-base a eu lieu",
      "Le pH a diminué : la solution est devenue plus acide",
      "Le BBT a été détruit par la soude",
      "Rien, le BBT change de couleur avec le temps"
    ],
    bonne: 0,
    explication: "Le BBT est **jaune en milieu acide** et **bleu en milieu basique**. Le passage au bleu signale donc une **augmentation du pH**, donc une baisse de la concentration en H₃O⁺ : le milieu est bien le siège d'une réaction acide-base (CH₃–COOH + HO⁻ → CH₃–COO⁻ + H₂O).",
  },
  {
    type: "qcm",
    q: "Quelle précaution est **inutile** quand on manipule des acides et des bases concentrés ?",
    choix: [
      "Chauffer la solution avant de la verser",
      "Porter une blouse, des gants et des lunettes",
      "Éviter de mélanger un acide et une base sans précaution",
      "Ne pas verser d'eau dans une solution concentrée"
    ],
    bonne: 0,
    explication: "Chauffer ne sert à rien et aggrave le danger. Les trois autres sont les consignes du cours : ces substances sont **corrosives** (elles réagissent avec l'eau de la peau et provoquent des brûlures), d'où blouse, gants et lunettes, et pas d'eau ajoutée dans une solution concentrée.",
    piege: true,
  },
]);
