/* Chapitre 2 — Méthodes physiques d'analyse — QUIZ
   Petits exercices faisables de tête + QCM de connaissances et pièges classiques.
*/
definirContenu("chimie/02-methodes-physiques-analyse", "quiz", [

  /* ---------- pH ---------- */
  {
    type: "saisie",
    q: "Une solution a une concentration en ions oxonium [H₃O⁺] = 1,0 × 10⁻⁴ mol·L⁻¹. Quel est son **pH** ?",
    reponses: ["4", "4,0", "4,00", "4.0", "4.00", "ph = 4", "ph=4"],
    solution: "pH = 4,00",
    explication: "Quand la concentration s'écrit 1,0 × 10⁻ⁿ, le pH vaut tout simplement **n** : pas besoin de calculatrice. Ici [H₃O⁺] = 1,0 × 10⁻⁴ donc pH = 4,00.",
  },
  {
    type: "saisie",
    q: "Le pH d'une solution vaut 3,00. Quelle est sa concentration en ions oxonium, en mol·L⁻¹ ?",
    reponses: ["1,0x10-3", "1.0e-3", "1e-3", "10-3", "0,001", "0.001", "1,0 × 10⁻³", "10^-3", "1x10-3"],
    solution: "1,0 × 10⁻³ mol·L⁻¹",
    explication: "On applique [H₃O⁺] = c⁰ × 10⁻ᵖᴴ = 10⁻³ mol·L⁻¹. C'est la relation réciproque du pH : la touche **10ˣ** de la calculatrice, pas la notation scientifique.",
  },
  {
    type: "qcm",
    q: "Le pH d'une solution passe de 2,00 à 4,00. Que devient la concentration en ions H₃O⁺ ?",
    choix: ["Elle est divisée par 100", "Elle est divisée par 2", "Elle est multipliée par 100", "Elle ne change pas"],
    bonne: 0,
    explication: "L'échelle du pH est **logarithmique** : chaque unité de pH en plus correspond à une concentration **divisée par 10**. Deux unités, c'est donc une division par 100 (de 1,0 × 10⁻² à 1,0 × 10⁻⁴ mol·L⁻¹).",
    piege: true,
  },
  {
    type: "saisie",
    q: "Une solution a [H₃O⁺] = 2,0 × 10⁻⁵ mol·L⁻¹. On te donne log(2) = 0,30. Quel est son **pH** ?",
    reponses: ["4,7", "4.7", "4,70", "4.70", "ph = 4,7"],
    solution: "pH = 4,70",
    explication: "pH = −log(2,0 × 10⁻⁵) = −log(2,0) − log(10⁻⁵) = −0,30 + 5,00 = **4,70**. L'astuce : on sépare le nombre et la puissance de dix grâce à log(ab) = log a + log b.",
  },
  {
    type: "qcm",
    q: "Quel instrument donne la mesure de pH la plus **précise** ?",
    choix: ["Le pH-mètre muni d'une sonde (au centième)", "Le papier pH (à l'unité)", "Un indicateur coloré comme le BBT", "Une échelle de teintes"],
    bonne: 0,
    explication: "Le **pH-mètre** mesure au centième d'unité — sa sonde est fragile et doit être protégée. Le papier pH et les indicateurs colorés ne donnent le pH qu'**à l'unité près**.",
  },

  /* ---------- Spectroscopies ---------- */
  {
    type: "qcm",
    q: "Sur un spectre **UV-visible**, que lit-on en ordonnée et en abscisse ?",
    choix: [
      "L'absorbance en ordonnée, la longueur d'onde en abscisse",
      "La transmittance en ordonnée, le nombre d'onde en abscisse",
      "La concentration en ordonnée, l'absorbance en abscisse",
      "L'absorbance en ordonnée, le nombre d'onde en abscisse"
    ],
    bonne: 0,
    explication: "Spectre **UV-visible** : absorbance A (sans unité) en fonction de la longueur d'onde λ en nm. Le choix 2 décrit le spectre **infrarouge** : transmittance T en % en fonction du nombre d'onde σ en cm⁻¹.",
    piege: true,
  },
  {
    type: "qcm",
    q: "Une espèce dissoute absorbe uniquement à 236 nm et 310 nm. Sa solution est-elle colorée ?",
    choix: [
      "Non : ces deux maxima sont dans l'ultraviolet",
      "Oui : toute absorption donne une couleur",
      "Oui : 310 nm correspond au violet",
      "On ne peut pas savoir sans connaître la concentration"
    ],
    bonne: 0,
    explication: "Le domaine **visible** va de 400 à 800 nm. Ici les deux maxima sont en dessous de 400 nm, donc dans l'**UV** : la solution est **incolore**. C'est le cas de l'acide salicylique dissous dans le méthanol.",
  },
  {
    type: "saisie",
    q: "Sur un spectre infrarouge, quelle **liaison** correspond à une bande fine et profonde vers 1 700 cm⁻¹ ?",
    reponses: ["c=o", "co", "la liaison c=o", "liaison c=o", "carbonyle", "c double liaison o"],
    solution: "la liaison C=O",
    explication: "Vers **1 700 cm⁻¹**, bande fine et profonde : c'est la signature du **C=O**. On la retrouve chez les aldéhydes, cétones, acides carboxyliques, esters et amides — le spectre seul ne dit pas laquelle de ces familles, il faut regarder les autres bandes.",
  },
  {
    type: "saisie",
    q: "Sur un spectre infrarouge, quelle **liaison** donne une bande large entre 3 200 et 3 600 cm⁻¹ ?",
    reponses: ["o-h", "oh", "la liaison o-h", "liaison o-h", "hydroxyle", "o h"],
    solution: "la liaison O–H",
    explication: "Une bande **large** vers 3 300 cm⁻¹ signale un **O–H** : alcool ou acide carboxylique. Retiens le mot « large » : la bande N–H, elle, est plus fine et se situe entre 3 100 et 3 500 cm⁻¹, parfois en deux bandes.",
  },
  {
    type: "qcm",
    q: "Une molécule de formule C₄H₈O donne un spectre IR avec une bande à 2 961 cm⁻¹ et une bande fine et profonde à 1 718 cm⁻¹, mais **aucune** bande large vers 3 300 cm⁻¹. De quoi s'agit-il ?",
    choix: [
      "La butanone CH₃–CO–CH₂–CH₃ (une cétone)",
      "Le but-3-én-2-ol CH₃–CH(OH)–CH=CH₂ (un alcool)",
      "Un acide carboxylique",
      "On ne peut pas trancher"
    ],
    bonne: 0,
    explication: "La bande à 1 718 cm⁻¹ prouve un **C=O**, et l'**absence** de bande large vers 3 300 cm⁻¹ exclut le O–H, donc l'alcool. Celle à 2 961 cm⁻¹ correspond aux C–H, présents partout : elle ne permet pas de trancher. Reste la **butanone**.",
  },
  {
    type: "qcm",
    q: "Sur un spectre infrarouge, une transmittance T = 100 % à un nombre d'onde donné signifie que l'espèce…",
    choix: ["n'absorbe pas à ce nombre d'onde", "absorbe totalement à ce nombre d'onde", "est très concentrée", "contient une liaison C=O"],
    bonne: 0,
    explication: "La transmittance mesure ce qui **passe** : T = 100 % veut dire qu'aucune radiation n'est absorbée. Une bande d'absorption est donc un **creux** qui descend vers le bas, contrairement au spectre UV-visible où l'absorption est un pic vers le haut.",
    piege: true,
  },

  /* ---------- Conductance et conductivité ---------- */
  {
    type: "saisie",
    q: "On mesure u = 0,50 V aux bornes d'une cellule et un courant i = 1,0 × 10⁻⁴ A. Quelle est la **conductance** G, en siemens ?",
    reponses: ["2,0x10-4", "2.0e-4", "2e-4", "0,0002", "0.0002", "2 x 10-4", "2,0 × 10⁻⁴"],
    solution: "G = 2,0 × 10⁻⁴ S",
    explication: "G = i / u = 1,0 × 10⁻⁴ / 0,50 = **2,0 × 10⁻⁴ S**. Diviser par 0,50, c'est multiplier par 2 : faisable de tête.",
  },
  {
    type: "qcm",
    q: "Quelle grandeur ne dépend **que de la solution**, et pas de la cellule utilisée ?",
    choix: ["La conductivité σ", "La conductance G", "La résistance R", "L'intensité i"],
    bonne: 0,
    explication: "La **conductance G** dépend de l'aire S des électrodes et de leur distance ℓ : elle change si on change de cellule. La **conductivité σ = G·ℓ/S** élimine cette géométrie, il ne reste que les caractéristiques de la solution (température, nature et concentration des ions). C'est pour cela qu'on caractérise une solution par σ.",
    piege: true,
  },
  {
    type: "saisie",
    q: "Convertis une concentration de 5,0 × 10⁻³ mol·L⁻¹ en **mol·m⁻³**.",
    reponses: ["5", "5,0", "5.0", "5 mol/m3", "5,0 mol·m-3", "5 mol m-3"],
    solution: "5,0 mol·m⁻³",
    explication: "1 L = 10⁻³ m³, donc **1 mol·L⁻¹ = 10³ mol·m⁻³** : on multiplie par mille. 5,0 × 10⁻³ × 10³ = **5,0 mol·m⁻³**. C'est la conversion à ne jamais oublier avant d'appliquer la loi de Kohlrausch.",
  },
  {
    type: "qcm",
    q: "Dans la loi de Kohlrausch σ = Σ λᵢ[Xᵢ], en quelle unité doivent être exprimées les concentrations ?",
    choix: ["En mol·m⁻³", "En mol·L⁻¹", "En g·L⁻¹", "Peu importe, le résultat est le même"],
    bonne: 0,
    explication: "Les λ sont en S·m²·mol⁻¹, donc les concentrations doivent être en **mol·m⁻³** pour que σ sorte en S·m⁻¹. Oublier cette conversion, c'est se tromper d'un **facteur 1000** : c'est l'erreur la plus fréquente du chapitre.",
    piege: true,
  },
  {
    type: "saisie",
    q: "Une solution de chlorure de sodium NaCl a une concentration c. Quelle est la concentration en ions chlorure [Cl⁻], en fonction de c ?",
    reponses: ["c", "= c", "[cl-] = c", "egale a c", "c tout simplement"],
    solution: "[Cl⁻] = c",
    explication: "L'équation de dissolution est NaCl(s) → Na⁺(aq) + Cl⁻(aq) : un seul ion chlorure par motif, donc [Cl⁻] = **c**. Attention au réflexe : avec Ni(NO₃)₂, il y a **deux** nitrates par motif et [NO₃⁻] = 2c.",
  },
  {
    type: "qcm",
    q: "Pour une solution de nitrate de nickel Ni(NO₃)₂ de concentration c, comment s'écrit la conductivité ?",
    choix: [
      "σ = (λ(Ni²⁺) + 2 λ(NO₃⁻)) × c",
      "σ = (λ(Ni²⁺) + λ(NO₃⁻)) × c",
      "σ = (2 λ(Ni²⁺) + λ(NO₃⁻)) × c",
      "σ = λ(Ni²⁺) × λ(NO₃⁻) × c"
    ],
    bonne: 0,
    explication: "La dissolution donne Ni(NO₃)₂(s) → Ni²⁺ + **2** NO₃⁻, donc [Ni²⁺] = c et [NO₃⁻] = **2c**. En remplaçant dans σ = λ(Ni²⁺)[Ni²⁺] + λ(NO₃⁻)[NO₃⁻], on factorise par c et le coefficient 2 reste devant le nitrate.",
  },
  {
    type: "qcm",
    q: "Quel ion possède la **plus grande** conductivité molaire ionique ?",
    choix: ["H₃O⁺", "Na⁺", "Cl⁻", "SO₄²⁻"],
    bonne: 0,
    explication: "H₃O⁺ atteint 35,0 × 10⁻³ S·m²·mol⁻¹, loin devant tous les autres (HO⁻ arrive deuxième avec 19,8 × 10⁻³, Na⁺ ferme la marche à 5,0 × 10⁻³). Retiens que **H₃O⁺ et HO⁻ conduisent beaucoup mieux** que les autres ions : ça servira pour interpréter les courbes de dosage.",
  },

  /* ---------- Dosage par étalonnage ---------- */
  {
    type: "qcm",
    q: "Dans un graphique d'étalonnage, que met-on en abscisse ?",
    choix: [
      "La concentration des solutions étalons",
      "L'absorbance mesurée",
      "La conductance mesurée",
      "Le volume de solution"
    ],
    bonne: 0,
    explication: "La grandeur mesurée (absorbance, conductance ou conductivité) va en **ordonnée**, la **concentration** en abscisse. On mesure ensuite la grandeur pour la solution inconnue et on lit son abscisse sur la courbe.",
  },
  {
    type: "qcm",
    q: "Pour un dosage par étalonnage **spectrophotométrique**, à quelle longueur d'onde fait-on les mesures ?",
    choix: [
      "À λ(max), le maximum d'absorption de l'espèce",
      "À 400 nm, début du visible",
      "À n'importe quelle longueur d'onde",
      "À la longueur d'onde où l'absorbance est nulle"
    ],
    bonne: 0,
    explication: "On repère d'abord **λ(max)** sur le spectre d'absorption de l'espèce. C'est là que l'absorbance varie le plus quand la concentration change : la mesure est la plus sensible et la plus précise.",
  },
  {
    type: "qcm",
    q: "Dans la loi de Beer-Lambert A = ε·ℓ·c, quelle est l'unité de ℓ ?",
    choix: ["Le centimètre (cm)", "Le mètre (m)", "Le millimètre (mm)", "ℓ n'a pas d'unité"],
    bonne: 0,
    explication: "Attention, ce n'est pas l'unité SI ici : ℓ est l'épaisseur de solution traversée, en **centimètres**, c en mol·L⁻¹ et ε en L·mol⁻¹·cm⁻¹. A, lui, est sans unité. C'est la seule formule du chapitre où on ne convertit pas en mètres.",
    piege: true,
  },
  {
    type: "qcm",
    q: "Pour réaliser un dosage conductimétrique par étalonnage, la solution doit contenir…",
    choix: [
      "un seul soluté apporté",
      "au moins deux solutés",
      "obligatoirement un acide",
      "une espèce colorée"
    ],
    bonne: 0,
    explication: "Avec plusieurs solutés, chacun contribuerait à la conductivité et la mesure ne serait plus proportionnelle à la seule concentration cherchée. Même logique en spectrophotométrie : il faut **un seul soluté absorbant**.",
  },

  /* ---------- Gaz parfait ---------- */
  {
    type: "saisie",
    q: "Convertis une température de 27 °C en **kelvins**.",
    reponses: ["300", "300,15", "300.15", "300 k", "300,15 k", "300,2"],
    solution: "300,15 K (soit 300 K)",
    explication: "T = θ + 273,15 = 27 + 273,15 = **300,15 K**. Dans PV = nRT, la température doit **toujours** être en kelvins : utiliser des degrés Celsius fausse complètement le résultat.",
  },
  {
    type: "saisie",
    q: "Convertis un volume de 250 mL en **mètres cubes**.",
    reponses: ["2,5x10-4", "2.5e-4", "2,5 × 10⁻⁴", "0,00025", "0.00025", "2,5 10-4", "250x10-6", "2.5x10-4"],
    solution: "2,5 × 10⁻⁴ m³",
    explication: "1 mL = 1 cm³ = 10⁻⁶ m³, donc 250 mL = 250 × 10⁻⁶ = **2,5 × 10⁻⁴ m³**. Dans PV = nRT, le volume doit être en m³ et la pression en pascals.",
  },
  {
    type: "qcm",
    q: "Quelle valeur de la constante des gaz parfaits R faut-il retenir ?",
    choix: ["8,31 J·mol⁻¹·K⁻¹", "6,02 × 10²³ mol⁻¹", "9,81 N·kg⁻¹", "1,013 × 10⁵ Pa"],
    bonne: 0,
    explication: "R = **8,31 J·mol⁻¹·K⁻¹**. Les autres valeurs sont des grandeurs classiques à ne pas confondre : 6,02 × 10²³ est la constante d'Avogadro, 9,81 l'intensité de pesanteur et 1,013 × 10⁵ Pa la pression atmosphérique.",
    piege: true,
  },
  {
    type: "qcm",
    q: "Dans lequel de ces cas le modèle du gaz parfait **ne convient pas** ?",
    choix: [
      "L'air d'une bouteille de plongée, à plusieurs bars",
      "L'air d'une montgolfière, à pression ambiante",
      "Le dichlore d'une éprouvette à 1,013 × 10⁵ Pa",
      "L'air d'une salle de classe"
    ],
    bonne: 0,
    explication: "Le modèle vaut pour des pressions **inférieures à 5 × 10⁵ Pa**, soit 5 bar. La bouteille de plongée dépasse largement : les entités y sont trop proches pour être considérées sans interaction. Les trois autres situations sont à pression ambiante.",
  },
  {
    type: "saisie",
    q: "À 25 °C sous 1,01 × 10⁵ Pa, le volume molaire vaut 24,5 L·mol⁻¹. Quelle quantité de matière, en moles, y a-t-il dans 49,0 L de dioxygène ?",
    reponses: ["2", "2,0", "2.0", "2,00", "2 mol", "2,0 mol"],
    solution: "n = 2,0 mol",
    explication: "n = V / Vₘ = 49,0 / 24,5 = **2,0 mol**. Le volume molaire ne dépend **pas du gaz** (loi d'Avogadro-Ampère) : le résultat serait identique avec du diazote ou du dioxyde de carbone.",
  },
  {
    type: "qcm",
    q: "Deux ballons de même volume, à la même température et à la même pression, contiennent l'un du dihydrogène, l'autre du dioxyde de carbone. Que peut-on dire ?",
    choix: [
      "Ils contiennent la même quantité de matière",
      "Le ballon de CO₂ contient plus de moles, car ses molécules sont plus lourdes",
      "Le ballon de H₂ contient plus de moles, car ses molécules sont plus petites",
      "On ne peut rien dire sans connaître les masses molaires"
    ],
    bonne: 0,
    explication: "C'est la **loi d'Avogadro-Ampère** : à température et pression données, le volume molaire est le même pour tous les gaz, donc des volumes égaux contiennent la même quantité de matière. La masse, elle, sera très différente — mais on parle bien ici de moles, pas de grammes.",
    piege: true,
  },
]);
