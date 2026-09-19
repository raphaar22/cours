/* Chapitre 2 — Méthodes physiques d'analyse d'un système chimique — COURS (manuel p. 62 à 67)
   Écrit en Markdown. Blocs disponibles :
   ::: definition | exemple | remarque | unites | securite | maths | conseil | methode | attention
   ::: equation   (équations chimiques centrées, une par ligne)
   ::: formule    (formule puis --- puis la légende, une ligne par grandeur)
   Les formules mathématiques s'écrivent entre $ … $ (en ligne) ou $$ … $$ (centrées).
*/
definirContenu("chimie/02-methodes-physiques-analyse", "cours", String.raw`
Analyser un système chimique, c'est identifier les espèces présentes et mesurer leur concentration. Ce chapitre rassemble les **méthodes physiques** qui permettent de le faire sans transformer le système : la mesure du pH, les spectroscopies UV-visible et infrarouge, la conductimétrie, les dosages par étalonnage, et l'équation des gaz parfaits pour les gaz.

## 1. pH d'une solution aqueuse

### a. Définition du pH

::: definition
Le **pH** d'une solution est lié à la **concentration en ions oxonium H₃O⁺** dans la solution par la relation :

::: formule
$$\mathrm{pH} = -\log\left(\frac{[\mathrm{H_3O^+}]}{c^0}\right)$$
---
[H₃O⁺] en moles par litre (mol·L⁻¹)
pH sans unité
:::

$c^0$ est une **concentration standard** valant exactement 1 mol·L⁻¹.

Et réciproquement :

::: formule
$$[\mathrm{H_3O^+}] = c^0 \times 10^{-\mathrm{pH}}$$
:::

Ces relations sont valables pour des concentrations en ions oxonium H₃O⁺ **ou** en ions hydroxyde HO⁻ **inférieures à 1,0 × 10⁻¹ mol·L⁻¹**.
:::

::: remarque
$c^0$ vaut exactement 1 mol·L⁻¹ : son nombre de chiffres significatifs ne modifie pas le résultat. Pour simplifier, on peut écrire $\mathrm{pH} = -\log([\mathrm{H_3O^+}])$ et $[\mathrm{H_3O^+}] = 10^{-\mathrm{pH}}$ en sous-entendant que la concentration est en mol·L⁻¹. Diviser par $c^0$ sert seulement à rendre la quantité **sans unité** (on ne peut pas prendre le logarithme d'une grandeur qui a une unité).
:::

::: exemple
À partir de la mesure du pH d'un jus de citron, égal à 2,50, on peut déterminer la concentration en ions oxonium :

$$[\mathrm{H_3O^+}] = c^0 \times 10^{-\mathrm{pH}} = 10^{-2{,}50} = 3{,}2 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$$
:::

::: remarque
- Pour calculer le pH ou la concentration en ions oxonium, on utilise les touches **log** et **10ˣ** de la calculatrice, à ne pas confondre avec les touches de notation scientifique (×10ˣ, EE) ni avec « × 1 0 ^ ».
- On peut aussi calculer le pH d'une solution **sans calculatrice** quand la concentration est une puissance de dix : si pH = 3,00 alors [H₃O⁺] = 1,0 × 10⁻³ mol·L⁻¹ ; de même si [H₃O⁺] = 1,0 × 10⁻⁵ mol·L⁻¹ alors pH = 5,00.
- On peut aussi utiliser une **aide au calcul**. Soit une solution d'acide nitrique où [H₃O⁺] = 2,0 × 10⁻³ mol·L⁻¹ ; on dispose de l'aide au calcul log(2) = 0,30. Le pH de la solution est :

$$\mathrm{pH} = -\log\left(\frac{[\mathrm{H_3O^+}]}{c^0}\right) = -\log\left(\frac{2{,}0 \times 10^{-3}}{1}\right) = -\log(2{,}0 \times 10^{-3})$$

$$\mathrm{pH} = -\log(2{,}0) - \log(10^{-3}) = -0{,}30 + 3{,}00 = 2{,}70$$
:::

::: maths
- La fonction réciproque du logarithme décimal $\log$ est la **puissance de dix** : $10^{\log(a)} = a$ et $\log(10^{x}) = x$.
- Soient $a$ et $b$ deux réels strictement positifs :

$$\log(ab) = \log(a) + \log(b) \qquad\qquad \log\left(\frac{a}{b}\right) = \log(a) - \log(b)$$
:::

Le pH est **faible si [H₃O⁺] est grande**, et inversement : plus une solution est acide (concentrée en H₃O⁺), plus son pH est petit.

| pH | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [H₃O⁺] (mol·L⁻¹) | 10⁻¹ | 10⁻² | 10⁻³ | 10⁻⁴ | 10⁻⁵ | 10⁻⁶ | 10⁻⁷ | 10⁻⁸ | 10⁻⁹ | 10⁻¹⁰ | 10⁻¹¹ | 10⁻¹² | 10⁻¹³ |

::: exemple
Si le pH d'une solution vaut 2,00 et si l'on **divise la concentration en ions oxonium par dix**, alors le pH de la solution vaut 3,00. En effet, la concentration en ions oxonium passe de 1,0 × 10⁻² mol·L⁻¹ à 1,0 × 10⁻³ mol·L⁻¹.

De même, si on divise la concentration en ions oxonium par 100, le pH passe de 2,00 à 4,00, pour les mêmes raisons.
:::

::: conseil Pour comprendre
Le pH est une échelle **logarithmique** : **+1 unité de pH = concentration en H₃O⁺ divisée par 10**. Une solution de pH 2 est donc dix fois plus concentrée en H₃O⁺ qu'une solution de pH 3, et cent fois plus qu'une solution de pH 4. C'est pour cela qu'une petite variation de pH correspond à une grande variation de concentration.
:::

### b. Mesure du pH

La mesure la plus précise (au **centième d'unité**) se fait à l'aide d'un **pH-mètre** muni d'une sonde. La sonde de pH est fragile et doit être protégée lors des mesures.

Le pH peut aussi se mesurer à l'aide de **papier pH** ou d'un **indicateur coloré**, espèce chimique comme le bleu de bromothymol (BBT), ou mélange d'espèces chimiques, dont la couleur varie selon le pH. Ils permettent de mesurer le pH **à l'unité près**. Une liste d'indicateurs colorés est disponible dans la page « Données utiles ».

::: remarque
Le BBT est jaune en milieu acide (pH < 6,0), bleu en milieu basique (pH > 7,6) et vert entre les deux (zone de virage).
:::

## 2. Spectroscopie UV-visible et infrarouge

### a. Spectre UV-visible

::: definition
Un **spectre UV-visible** est un graphique qui représente l'**absorbance** d'une espèce chimique en fonction de la **longueur d'onde** (en nm) de la radiation. L'absorbance est une grandeur **sans unité**.
:::

L'allure du spectre UV-visible dépend :

- de la **concentration** de l'espèce absorbante,
- de la **nature du solvant** utilisé,
- de l'**espèce chimique** étudiée.

On peut donc parfois utiliser le spectre UV-visible pour **identifier** une espèce chimique.

::: exemple
L'écorce du saule blanc contient entre autres une espèce chimique : l'**acide salicylique**. Le spectre de cette espèce dissoute dans le méthanol présente **deux maxima** : λ<sub>1,max</sub> = 236 nm et λ<sub>2,max</sub> = 310 nm (l'absorbance est nulle au-delà de 360 nm).

Cette solution **n'est pas colorée** car elle n'absorbe pas dans le domaine visible (400 nm – 800 nm) : elle n'absorbe que dans l'ultraviolet.
:::

::: conseil Pour comprendre
Une solution est colorée si elle absorbe une partie de la lumière **visible** (400 à 800 nm) : sa couleur est alors la couleur complémentaire de celle qu'elle absorbe. Si tous ses maxima d'absorption sont dans l'UV (en dessous de 400 nm), elle est incolore.
:::

### b. Spectroscopie infrarouge

::: definition
Un **spectre infrarouge** représente la **transmittance T** (en %) d'une espèce chimique en fonction du **nombre d'onde σ** (inverse de la longueur d'onde, en cm⁻¹).
:::

L'analyse d'un spectre infrarouge peut permettre d'**identifier une espèce chimique ou un groupe caractéristique**, car les **bandes d'absorption** observées sur le spectre sont caractéristiques d'une **liaison chimique**.

::: methode Identifier une molécule à partir de son spectre IR
1. **Repérer les liaisons chimiques** grâce aux nombres d'onde correspondant aux bandes d'absorption (voir le tableau ci-dessous).
2. **Identifier les groupes caractéristiques** correspondants.
3. **Rechercher ces groupes** dans la formule de la molécule.
:::

::: remarque
La transmittance T vaut **100 %** à une longueur d'onde donnée si l'espèce chimique **n'absorbe pas** la radiation à cette longueur d'onde. Elle est **inférieure** s'il y a absorption. Sur un spectre IR, une bande d'absorption est donc un **creux** vers le bas.
:::

::: exemple
La formule C₄H₈O peut correspondre aux deux molécules suivantes :

- **a.** CH₃–CO–CH₂–CH₃ (une cétone : la butanone),
- **b.** CH₃–CH(OH)–CH=CH₂ (un alcool avec une double liaison C=C).

Pour déterminer à quelle molécule correspond le spectre IR étudié, on détermine les nombres d'onde des deux bandes d'absorption maximale : une bande au voisinage de **2 900 cm⁻¹** (2 961 cm⁻¹) et une aux alentours de **1 700 cm⁻¹** (1 718 cm⁻¹, fine et profonde).

La première bande correspond à la liaison **C–H**, la seconde bande correspond à une liaison **C=O**. Il n'y a en revanche pas de bande large entre 3 200 et 3 600 cm⁻¹, donc pas de liaison O–H.

La molécule est donc la molécule **a**, la **butanone**.
:::

Fonctions et liaisons donnant des bandes d'absorption :

| Famille | Groupe caractéristique | Liaisons et nombres d'onde (cm⁻¹) |
|---|---|---|
| Alcool | –O–H | O–H : 3 200 à 3 600 (bande large) |
| Acide carboxylique | –COOH (carboxyle) | O–H : 3 200 à 3 600 ; C=O : vers 1 700, bande fine et profonde |
| Aldéhyde | –CHO (carbonyle en bout de chaîne) | C–H : 2 800 ; C=O : vers 1 700, bande fine et profonde |
| Cétone | –CO– (carbonyle en milieu de chaîne) | C=O : vers 1 700, bande fine et profonde |
| Ester | –COO– | C–O : 1 300 ; C=O : vers 1 700, bande fine et profonde |
| Amide | –CO–NH– | N–H : 3 100 à 3 500, parfois deux bandes ; C=O : vers 1 700, bande fine et profonde |
| Amine | –NH– ou –NH₂ | N–H : 3 100 à 3 500, parfois deux bandes |

::: conseil Pour comprendre
Trois repères suffisent souvent : une **bande large vers 3 300 cm⁻¹** signale un O–H (alcool ou acide), une **bande fine et profonde vers 1 700 cm⁻¹** signale un C=O (aldéhyde, cétone, acide, ester, amide), et une bande vers 2 900 cm⁻¹ correspond aux C–H présents dans presque toutes les molécules organiques (elle ne permet pas de trancher).
:::

## 3. Conductance et conductivité

### a. Conductance

On considère une **solution électrolytique**, c'est-à-dire une solution qui contient des ions. On y plonge une **cellule de conductimétrie**, constituée de deux électrodes planes conductrices placées face à face.

Insérée dans un circuit comportant un générateur, cette cellule se comporte comme un **conducteur ohmique de résistance R**. En effet, la tension $u$ entre ses bornes et l'intensité $i$ du courant qui la traverse sont liées par la loi d'Ohm : $u = R\,i$.

La **conductance** $G$ de cette cellule est l'inverse de sa résistance : $G = \dfrac{1}{R}$.

::: definition
La **conductance G** d'une cellule de conductimétrie plongée dans une solution est égale au quotient de l'intensité $i$ du courant qui la parcourt par la tension $u$ entre ses bornes :

::: formule
$$G = \frac{i}{u}$$
---
G en siemens (S)
i en ampères (A)
u en volts (V)
:::
:::

::: remarque
Montage pour mesurer la conductance : le générateur (GBF) doit être réglé sur une tension **sinusoïdale de fréquence 1 kHz** ; le voltmètre et l'ampèremètre doivent être en **mode AC** (alternatif). On n'utilise pas de courant continu, qui provoquerait des réactions aux électrodes (électrolyse) et fausserait la mesure.
:::

::: exemple
On introduit deux électrodes dans une solution de chlorure de sodium. On mesure une tension $u$ = 0,50 V et une intensité de courant $i$ = 124 μA. La conductance $G$ est égale à :

$$G = \frac{i}{u} = \frac{124 \times 10^{-6}}{0{,}50} = 2{,}5 \times 10^{-4}\ \mathrm{S}$$
:::

Dans un tel montage, la conductance $G$ dépend de :

- l'**aire S** de la surface immergée des électrodes,
- la **distance ℓ** entre les électrodes,
- la **température** de la solution,
- la **concentration** et la **nature** de chaque ion.

Les deux premiers paramètres sont des caractéristiques **géométriques de la cellule**, les deux derniers des caractéristiques **de la solution**.

### b. Conductivité

Dans des conditions usuelles, la conductance $G$ est **proportionnelle à l'aire S** des électrodes immergées et **inversement proportionnelle à la distance ℓ** qui les sépare. On peut donc exprimer $G$ par la relation :

$$G = \sigma\,\frac{S}{\ell}$$

où $\sigma$ est une grandeur nommée **conductivité de la solution**. La conductivité $\sigma$ dépend donc **uniquement des caractéristiques de la solution** (température, nature et concentration des ions), et plus de la cellule utilisée.

::: definition
La **conductivité σ** est définie par la relation :

::: formule
$$\sigma = G\,\frac{\ell}{S}$$
---
G en siemens (S)
S en mètres carrés (m²)
ℓ en mètres (m)
σ en siemens par mètre (S·m⁻¹)
:::
:::

La conductivité se mesure à l'aide d'un **conductimètre** relié à une cellule de conductimétrie. Le quotient $\dfrac{\ell}{S}$ est parfois appelé **constante de cellule**, exprimé en m⁻¹ ou en cm⁻¹.

::: remarque
C'est parfois le quotient $\dfrac{S}{\ell}$ qui est nommé constante de cellule. Il est alors exprimé en mètres ou en centimètres. Il faut donc regarder l'unité pour savoir de quel quotient il s'agit.
:::

::: exemple
Soit une cellule de conductimétrie composée de deux électrodes de superficie $S$ = 1,0 cm², soit $S$ = 1,0 × 10⁻⁴ m², et distantes de $\ell$ = 2,0 cm = 2,0 × 10⁻² m.

Si l'on mesure, à l'aide de cette cellule, dans une solution, une conductance $G$ = 1,2 × 10⁻³ S, alors la conductivité de cette solution est égale à :

$$\sigma = G\,\frac{\ell}{S} = \frac{1{,}2 \times 10^{-3} \times 2{,}0 \times 10^{-2}}{1{,}0 \times 10^{-4}} = 2{,}4 \times 10^{-1}\ \mathrm{S \cdot m^{-1}}$$
:::

::: attention Coquille du manuel
Dans le manuel, l'application numérique de cet exemple est écrite avec des valeurs qui ne correspondent pas aux données de l'énoncé (elle donne 6,0 × 10⁻³ S·m⁻¹). Le calcul ci-dessus reprend les données de l'énoncé (G = 1,2 × 10⁻³ S, ℓ = 2,0 × 10⁻² m, S = 1,0 × 10⁻⁴ m²) et donne 0,24 S·m⁻¹. Ce qui compte, c'est la méthode : convertir en unités SI, puis appliquer σ = G·ℓ/S.
:::

::: conseil Pour comprendre
Conductance et conductivité ne sont pas la même chose : la **conductance G** est une propriété de la **cellule plongée dans la solution** (elle change si on change d'électrodes), alors que la **conductivité σ** est une propriété de la **solution seule**. C'est pour cela qu'on utilise σ pour caractériser une solution.
:::

### c. Loi de Kohlrausch

La conductivité $\sigma$ d'une solution dépend de la **nature des ions** en solution ainsi que de leur **concentration**. L'influence de la nature de l'ion est caractérisée par la **conductivité molaire ionique λ**, exprimée en S·m²·mol⁻¹, qui dépend de la température. La **loi de Kohlrausch** (du physicien allemand Friedrich Wilhelm Georg Kohlrausch, 1840-1910) permet de calculer la conductivité d'une solution.

::: definition Loi de Kohlrausch
La conductivité $\sigma$ d'une solution contenant les ions $\mathrm{X}_i$ est égale à la **somme des produits** de la concentration $[\mathrm{X}_i]$ de chaque ion par sa conductivité molaire ionique $\lambda_{\mathrm{X}_i}$ :

::: formule
$$\sigma = \sum_i \lambda_{\mathrm{X}_i}\,[\mathrm{X}_i]$$
---
σ en siemens par mètre (S·m⁻¹)
λ en siemens mètre carré par mole (S·m²·mol⁻¹)
[Xᵢ] en **moles par mètre cube** (mol·m⁻³)
:::

La loi de Kohlrausch n'est valable que pour des concentrations **assez faibles**, inférieures à 1,0 × 10⁻² mol·L⁻¹ (ou 10 mol·m⁻³).
:::

Exemples de conductivités molaires ioniques à 25 °C (un tableau plus complet se trouve dans la page « Données utiles ») :

| Ion | λ (S·m²·mol⁻¹) |
|---|---|
| H₃O⁺ | 35,0 × 10⁻³ |
| HO⁻ | 19,8 × 10⁻³ |
| Na⁺ | 5,0 × 10⁻³ |
| Cl⁻ | 7,6 × 10⁻³ |
| NO₃⁻ | 7,1 × 10⁻³ |
| K⁺ | 7,3 × 10⁻³ |
| SO₄²⁻ | 16,0 × 10⁻³ |
| Ni²⁺ | 10,8 × 10⁻³ |

::: conseil Pour comprendre
Les ions H₃O⁺ et HO⁻ conduisent beaucoup mieux le courant que les autres (λ deux à cinq fois plus grande) : c'est un point utile pour interpréter les courbes de conductimétrie plus tard dans l'année.
:::

::: exemple
Soit une solution contenant les ions suivants :

| Ion | H₃O⁺ | NO₃⁻ | SO₄²⁻ |
|---|---|---|---|
| Concentration (mol·L⁻¹) | 2,00 × 10⁻² | 1,00 × 10⁻² | 5,00 × 10⁻³ |

D'après la loi de Kohlrausch, la conductivité de cette solution s'écrit :

$$\sigma = \lambda_{\mathrm{H_3O^+}}[\mathrm{H_3O^+}] + \lambda_{\mathrm{NO_3^-}}[\mathrm{NO_3^-}] + \lambda_{\mathrm{SO_4^{2-}}}[\mathrm{SO_4^{2-}}]$$

Pour la calculer, il faut **convertir les concentrations en mol·m⁻³** (on multiplie par 10³) :

| Ion | H₃O⁺ | NO₃⁻ | SO₄²⁻ |
|---|---|---|---|
| Concentration (mol·m⁻³) | 20,0 | 10,0 | 5,00 |

La conductivité de la solution est donc égale à :

$$\sigma = 35{,}0 \times 10^{-3} \times 20{,}0 + 7{,}1 \times 10^{-3} \times 10{,}0 + 16{,}0 \times 10^{-3} \times 5{,}00 = 8{,}51 \times 10^{-1}\ \mathrm{S \cdot m^{-1}}$$
:::

### d. Conductivité et concentration d'une solution

Si la solution ne contient qu'**un seul soluté**, l'**équation de dissolution** permet de connaître la relation entre les concentrations des ions et la concentration $c$ de la solution. On peut alors exprimer la conductivité de la solution en fonction de sa concentration, et donc **retrouver la concentration à partir d'une mesure de conductivité**.

::: unites
Les concentrations, dans la loi de Kohlrausch, doivent être exprimées en **moles par mètre cube**. Il faut se rappeler que :

$$1\ \mathrm{m^3} = 1 \times 10^{3}\ \mathrm{L} \qquad \text{ou} \qquad 1\ \mathrm{L} = 10^{-3}\ \mathrm{m^3}$$

Par conséquent :

$$1\ \mathrm{mol \cdot L^{-1}} = \frac{1\ \mathrm{mol}}{1\ \mathrm{L}} = \frac{1\ \mathrm{mol}}{10^{-3}\ \mathrm{m^3}} = 10^{3}\ \mathrm{mol \cdot m^{-3}}$$

Réciproquement : $1\ \mathrm{mol \cdot m^{-3}} = 1 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$.

**Attention**, les conductivités molaires ioniques λ sont parfois données en **mS·m²·mol⁻¹** (1 mS = 10⁻³ S).
:::

::: exemple
Soit une solution de **nitrate de nickel** de concentration $c$. On mesure sa conductivité $\sigma$ = 5,00 × 10⁻² S·m⁻¹.

L'équation de dissolution est :

::: equation
Ni(NO₃)₂(s) → Ni²⁺(aq) + 2 NO₃⁻(aq)
:::

Vu la stœchiométrie de la réaction de dissolution, les concentrations des ions sont liées à la concentration $c$ par $[\mathrm{Ni^{2+}}] = c$ et $[\mathrm{NO_3^-}] = 2c$.

D'après la loi de Kohlrausch, la conductivité de cette solution s'écrit :

$$\sigma = \lambda_{\mathrm{Ni^{2+}}}[\mathrm{Ni^{2+}}] + \lambda_{\mathrm{NO_3^-}}[\mathrm{NO_3^-}]$$

Compte tenu des expressions des concentrations des ions, elle s'écrit aussi :

$$\sigma = \lambda_{\mathrm{Ni^{2+}}} \times c + \lambda_{\mathrm{NO_3^-}} \times 2c = \left(\lambda_{\mathrm{Ni^{2+}}} + 2\,\lambda_{\mathrm{NO_3^-}}\right) c$$

donc la concentration $c$ est :

$$c = \frac{\sigma}{\lambda_{\mathrm{Ni^{2+}}} + 2\,\lambda_{\mathrm{NO_3^-}}} = \frac{5{,}00 \times 10^{-2}}{10{,}8 \times 10^{-3} + 2 \times 7{,}1 \times 10^{-3}} = 2{,}00\ \mathrm{mol \cdot m^{-3}} = 2{,}00 \times 10^{-3}\ \mathrm{mol \cdot L^{-1}}$$
:::

::: methode Trouver une concentration à partir de la conductivité
1. Écrire l'**équation de dissolution** du soluté et en déduire la concentration de chaque ion en fonction de $c$ (attention aux coefficients : 2 NO₃⁻ donne [NO₃⁻] = 2c).
2. Écrire la **loi de Kohlrausch** et **factoriser** par $c$.
3. Isoler $c$, faire le calcul avec les λ en S·m²·mol⁻¹ : le résultat est en **mol·m⁻³**.
4. Convertir en mol·L⁻¹ en **divisant par 10³**.
:::

## 4. Dosage par étalonnage

### a. Principe d'un dosage par étalonnage

Un **dosage par étalonnage** utilise une **courbe d'étalonnage** pour déterminer la concentration d'une solution. Son protocole est le suivant :

::: methode Protocole d'un dosage par étalonnage
1. **Préparer une échelle de concentrations** de **solutions étalons** (solutions filles de concentrations connues) par **dilution** d'une solution contenant l'espèce chimique à doser à une concentration connue.
2. Pour chaque solution, **mesurer la grandeur physique** utilisée (absorbance, conductance ou conductivité : voir ci-après).
3. Avec les points de mesure, **tracer le graphique d'étalonnage**, présentant la grandeur utilisée en **ordonnée** et la concentration en **abscisse**.
4. Tracer la **courbe-modèle** au plus près des points expérimentaux (souvent une droite passant par l'origine).
5. **Mesurer la grandeur** utilisée pour la solution de concentration inconnue.
6. En **déduire graphiquement** la concentration de cette solution (on lit l'abscisse du point de la courbe qui a cette ordonnée).
:::

::: remarque
Lorsque les solutions étalons sont colorées, elles forment une **échelle de teintes**. On peut alors utiliser la grandeur **absorbance**.
:::

::: conseil Pour comprendre
Le principe est toujours le même : on cherche une grandeur physique **proportionnelle à la concentration** (absorbance, conductivité…), on « calibre » la relation avec des solutions dont on connaît la concentration, puis on s'en sert **à l'envers** pour la solution inconnue. La mesure sur la solution inconnue doit tomber **dans la plage** des solutions étalons, sinon la lecture n'est pas fiable.
:::

### b. Dosage par étalonnage conductimétrique

::: definition
On peut réaliser un dosage par étalonnage en mesurant la **conductance** ou la **conductivité** d'une solution électrolytique contenant **un seul soluté apporté** (un seul solide ionique dissous).
:::

::: exemple
On cherche la concentration d'une solution de chlorure de potassium. Une **droite d'étalonnage** est tracée à partir de mesures de conductance de portions de solutions étalons de chlorure de potassium (concentrations de 1 à 8 mmol·L⁻¹ ; la conductance est proportionnelle à la concentration, la droite passe par l'origine).

Puis la conductance est mesurée pour la solution de concentration inconnue. Elle vaut $G$ = 2,8 × 10⁻³ S, soit 2,8 mS.

On en déduit la concentration de la solution à l'aide de la droite d'étalonnage : on repère 2,8 mS sur l'axe des ordonnées, on rejoint la droite puis on lit l'abscisse : $c$ = 4,7 mmol·L⁻¹, soit $c$ = 4,7 × 10⁻³ mol·L⁻¹.
:::

::: attention Coquille du manuel
Le texte du manuel indique « c = 4,7 × 10⁻² mol·L⁻¹ », mais son graphique est gradué en mmol·L⁻¹ et la lecture donne 4,7 mmol·L⁻¹, soit 4,7 × 10⁻³ mol·L⁻¹ (ce qui est d'ailleurs cohérent avec le domaine de validité de la loi de Kohlrausch, inférieur à 10⁻² mol·L⁻¹). Retenir la lecture graphique.
:::

### c. Dosage par étalonnage spectrophotométrique

::: definition Rappel de la loi de Beer-Lambert
Pour une solution contenant **un seul soluté absorbant**, à une longueur d'onde λ donnée, l'absorbance $A_\lambda$ est **proportionnelle** à la concentration du soluté $c$ et à l'épaisseur $\ell$ de solution traversée :

::: formule
$$A_\lambda = \varepsilon\,\ell\,c$$
---
A sans unité
ℓ en centimètres (cm)
c en moles par litre (mol·L⁻¹)
ε en litres par mole et par centimètre (L·mol⁻¹·cm⁻¹)
:::

$\varepsilon$ est le **coefficient d'absorption molaire** de l'espèce colorée ; il dépend de l'espèce, de la longueur d'onde et du solvant.

Cette loi n'est valable que pour des solutions de **concentrations peu élevées** (inférieures à 0,1 mol·L⁻¹ en général).
:::

Pour une solution contenant **un seul soluté absorbant**, on peut utiliser l'absorbance pour réaliser un dosage par étalonnage.

::: exemple
On réalise le dosage par étalonnage spectrophotométrique d'une solution d'**hélianthine**.

1. On repère la **longueur d'onde du maximum d'absorption** λ<sub>max</sub> sur le spectre d'absorption de l'hélianthine (environ 510 nm) : c'est à cette longueur d'onde que la mesure est la plus sensible.
2. On mesure l'**absorbance de solutions étalons** à cette longueur d'onde pour tracer le graphique et la **droite d'étalonnage** (elle passe par l'origine : A est proportionnelle à c).
3. On mesure l'absorbance de la solution inconnue (A = 0,30) et on **détermine graphiquement** sa concentration : environ 0,66 × 10⁻⁵ mol·L⁻¹.
:::

::: conseil Pour comprendre
Pourquoi se placer à λ<sub>max</sub> ? Parce que c'est là que l'absorbance varie le plus quand la concentration change : les mesures y sont plus précises et moins sensibles à une petite erreur de réglage de la longueur d'onde.
:::

## 5. Gaz parfait et quantité de matière

Un gaz est constitué de molécules ou d'atomes en **mouvement incessant et désordonné**. On parle de **gaz parfait** lorsque les entités sont suffisamment éloignées les unes des autres pour **ne pas être en interaction** et lorsque la somme de leurs volumes propres est **très inférieure au volume total**. Le modèle du gaz parfait sera présenté plus précisément dans le chapitre 15.

::: unites
**Unités de pression**

- Unité SI : le **pascal** (Pa). 1 hPa = 1 × 10² Pa.
- Unité courante : le **bar**. 1 bar = 1 × 10⁵ Pa (proche de la pression atmosphérique : 1 013 hPa).

**Unités de température**

- Unité SI : le **kelvin** (K).
- Les températures θ en degrés Celsius (°C) et $T$ en kelvins (K) sont liées par la relation : $T = \theta + 273{,}15$.
:::

### a. Équation d'état du gaz parfait

::: definition
Soit un échantillon de gaz parfait renfermant une quantité de matière $n$ de gaz et occupant un volume $V$. En notant $P$ la pression dans ce gaz et $T$ sa température absolue, l'**équation d'état du gaz parfait** s'écrit :

::: formule
$$P\,V = n\,R\,T$$
---
P en pascals (Pa)
V en mètres cubes (m³)
n en moles (mol)
T en kelvins (K)
:::

$R$ est la **constante des gaz parfaits** : $R$ = 8,31 J·mol⁻¹·K⁻¹.
:::

::: exemple
Soit une éprouvette contenant $V$ = 200 mL de dichlore gazeux à une température θ = 25,0 °C et une pression $P$ = 1,013 × 10⁵ Pa.

- La température absolue est $T$ = 25,0 + 273,15 = 298,15 K, soit 298,2 K.
- Le volume occupé par le gaz est $V$ = 200 × 10⁻⁶ m³ (1 mL = 1 cm³ = 10⁻⁶ m³).

La quantité de matière de dichlore dans cette éprouvette est donc :

$$n = \frac{P\,V}{R\,T} = \frac{1{,}013 \times 10^{5} \times 200 \times 10^{-6}}{8{,}31 \times 298{,}2} = 8{,}18 \times 10^{-3}\ \mathrm{mol}$$
:::

::: attention Unités
Dans $PV = nRT$, il faut **tout convertir en unités SI** avant de calculer : la pression en Pa (pas en bar ni en hPa), le volume en m³ (pas en L ni en mL), la température en K (pas en °C). Conversions : 1 L = 10⁻³ m³ ; 1 mL = 10⁻⁶ m³ ; 1 bar = 10⁵ Pa.
:::

Cette équation est valable pour des pressions **inférieures à 5 × 10⁵ Pa** (5 bar). Donc, dans les conditions usuelles de température et de pression, le modèle du gaz parfait permet de décrire **l'ensemble des gaz**.

::: exemple
L'air contenu dans une **montgolfière** peut être considéré comme un gaz parfait car sa pression est proche de la pression atmosphérique.

Au contraire, l'air contenu dans une **bouteille de plongée**, dans laquelle la pression est de plusieurs bars, ne peut pas être considéré comme parfait.
:::

### b. Volume molaire

::: definition
Le **volume molaire des gaz** $V_m$ est le **volume par mole de gaz** pour une température et une pression données. Il **ne dépend pas du gaz** considéré : c'est la **loi d'Avogadro-Ampère** (Amedeo Avogadro, 1776-1856, et André-Marie Ampère, 1775-1836).
:::

On peut calculer la valeur du volume molaire d'un gaz à une pression donnée et une température donnée en utilisant l'équation d'état des gaz parfaits :

::: formule
$$V_m = \frac{V}{n} = \frac{R\,T}{P}$$
---
Vₘ en mètres cubes par mole (m³·mol⁻¹), souvent converti en L·mol⁻¹
T en kelvins (K)
P en pascals (Pa)
:::

::: exemple
- À $P$ = 1,01 × 10⁵ Pa et à 25,00 °C ($T$ = 298,15 K), le volume molaire est égal à :

$$V_m = \frac{R\,T}{P} = \frac{8{,}31 \times 298{,}15}{1{,}01 \times 10^{5}} = 2{,}45 \times 10^{-2}\ \mathrm{m^3 \cdot mol^{-1}} = 24{,}5\ \mathrm{L \cdot mol^{-1}}$$

- À $P$ = 1,01 × 10⁵ Pa et à 0,00 °C ($T$ = 273,15 K), le volume molaire est égal à :

$$V_m = \frac{R\,T}{P} = \frac{8{,}31 \times 273{,}15}{1{,}01 \times 10^{5}} = 2{,}25 \times 10^{-2}\ \mathrm{m^3 \cdot mol^{-1}} = 22{,}5\ \mathrm{L \cdot mol^{-1}}$$
:::

::: conseil Pour comprendre
Le volume molaire permet de passer directement d'un volume de gaz à une quantité de matière : $n = \dfrac{V}{V_m}$. Retenir l'ordre de grandeur : environ **24 L·mol⁻¹ à température ambiante** et **22,4 L·mol⁻¹ à 0 °C**, quel que soit le gaz. Le volume molaire augmente avec la température et diminue avec la pression.
:::
`);
