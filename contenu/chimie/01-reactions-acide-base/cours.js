/* Chapitre 1 — Réactions acide-base — COURS (manuel p. 38 à 41)
   Écrit en Markdown. Blocs disponibles :
   ::: definition | exemple | remarque | unites | securite | maths | conseil | methode | attention
   ::: equation   (équations chimiques centrées, une par ligne)
   ::: formule    (formule puis --- puis la légende, une ligne par grandeur)
   Les formules mathématiques s'écrivent entre $ … $ (en ligne) ou $$ … $$ (centrées).
*/
definirContenu("chimie/01-reactions-acide-base", "cours", String.raw`
Ce chapitre pose les bases de toute la chimie des acides et des bases de l'année : ce qu'est un acide, ce qu'est une base, comment on les repère dans une formule, comment on écrit l'équation de leur réaction, et comment on reconnaît une réaction acide-base parmi d'autres.

## 1. Théorie de Brönsted des acides et des bases

En 1923, le chimiste danois Joannes Brönsted (1879-1947) et le chimiste anglais Thomas Lowry (1874-1936) énoncent, indépendamment l'un de l'autre et à quelques mois d'intervalle, la même théorie sur les acides et les bases. C'est cette théorie (dite « de Brönsted » ou « de Brönsted-Lowry ») que l'on utilise en Terminale.

### a. Les acides

::: definition
Un **acide de Brönsted** (ou acide, plus simplement) est une espèce chimique **susceptible de céder un ion hydrogène H⁺**.

On traduit ceci par une **demi-équation acido-basique** :

::: equation
**Acide = autre espèce chimique + H⁺**
:::
:::

::: conseil Pour comprendre
Un ion hydrogène H⁺, c'est un atome d'hydrogène qui a perdu son unique électron : il ne reste que le noyau, un proton. « Céder un H⁺ » signifie donc qu'un des atomes d'hydrogène de la molécule s'en va **en laissant ses électrons derrière lui**. L'espèce de départ garde ces électrons et se retrouve avec une charge négative en plus (ou une charge positive en moins).
:::

::: exemple
Les espèces ci-dessous sont des acides au sens de Brönsted, comme le montrent leurs demi-équations :

| Espèce | Demi-équation |
|---|---|
| Ion oxonium H₃O⁺(aq) | H₃O⁺(aq) = H₂O(ℓ) + H⁺ |
| Ion ammonium NH₄⁺(aq) | NH₄⁺(aq) = NH₃(aq) + H⁺ |
| Eau H₂O(ℓ) | H₂O(ℓ) = HO⁻(aq) + H⁺ |
| Acide carbonique H₂CO₃(aq) | H₂CO₃(aq) = HCO₃⁻(aq) + H⁺ |
| Acides carboxyliques, par exemple l'acide éthanoïque CH₃–COOH(aq) | CH₃–COOH(aq) = CH₃–COO⁻(aq) + H⁺ |
:::

::: remarque
Une demi-équation acido-basique est seulement **formelle** : c'est une manière d'indiquer un transfert d'ion hydrogène H⁺, sans que cette étape existe réellement. Dans une solution, un ion H⁺ n'existe jamais seul : il est toujours transféré d'une espèce à une autre (voir la partie 2).
:::

::: remarque
L'acide carbonique H₂CO₃(aq) se forme lors de la dissolution du dioxyde de carbone CO₂(g) dans l'eau. C'est pour cette raison que l'on note parfois cet acide sous la forme « CO₂, H₂O ». Pour montrer son caractère d'acide de Brönsted, il est cependant plus commode de privilégier la notation H₂CO₃(aq).
:::

Certains acides sont des **ions** : ils sont donc accompagnés d'**ions spectateurs**, qui assurent la neutralité électrique de la solution et qui n'apparaissent pas dans les équations de réaction. Ainsi, les propriétés acides :

- de l'acide chlorhydrique (H₃O⁺(aq), Cl⁻(aq)),
- de l'acide nitrique (H₃O⁺(aq), NO₃⁻(aq)),
- de l'acide sulfurique (2 H₃O⁺(aq), SO₄²⁻(aq)),

sont dues **seulement à la présence de l'ion oxonium H₃O⁺(aq)**. Le lac du volcan Kawah Ijen, à Bali, est le lac le plus acide du monde : il contient un mélange de ces acides (chlorhydrique, sulfurique, etc.).

::: vocabulaire
- **Acide carboxylique** : espèce chimique comportant le groupement carboxyle –COOH en bout de chaîne.
- **Amine** : composé organique dérivé de l'ammoniac NH₃ dont au moins un atome d'hydrogène a été remplacé par une chaîne carbonée.
- **Ion carboxylate** : espèce chimique comportant un groupement –COO⁻.
:::

### b. Les bases

::: definition
Une **base de Brönsted** (ou base, plus simplement) est une espèce chimique **susceptible de capter un ion hydrogène H⁺**.

Ceci se traduit formellement par une **demi-équation acido-basique** :

::: equation
**Base + H⁺ = autre espèce chimique**
:::
:::

::: exemple
Les espèces ci-dessous sont des bases au sens de Brönsted, comme le montrent leurs demi-équations :

| Espèce | Demi-équation |
|---|---|
| Ion hydroxyde HO⁻(aq) | HO⁻(aq) + H⁺ = H₂O(ℓ) |
| Ammoniac NH₃(aq) | NH₃(aq) + H⁺ = NH₄⁺(aq) |
| Eau H₂O(ℓ) | H₂O(ℓ) + H⁺ = H₃O⁺(aq) |
| Amines, par exemple la méthylamine CH₃–NH₂(aq) | CH₃–NH₂(aq) + H⁺ = CH₃–NH₃⁺(aq) |
| Ions carboxylates, par exemple l'ion éthanoate CH₃–COO⁻(aq) | CH₃–COO⁻(aq) + H⁺ = CH₃–COOH(aq) |
:::

Certaines bases sont des **ions**, donc accompagnées d'**ions spectateurs**, qui n'apparaissent pas dans les équations de réaction. Ainsi, les propriétés basiques des solutions d'hydroxyde de sodium, ou **soude** (Na⁺(aq), HO⁻(aq)), ou d'hydroxyde de potassium, ou **potasse** (K⁺(aq), HO⁻(aq)), sont dues **seulement à la présence de l'ion hydroxyde HO⁻(aq)**. C'est par exemple le cas des solutions utilisées pour déboucher les canalisations.

::: conseil Pour comprendre
L'eau apparaît dans les deux listes : elle peut céder un H⁺ (elle donne HO⁻) ou en capter un (elle donne H₃O⁺). Ce n'est pas une erreur, c'est le point de départ de la notion d'**espèce amphotère** (partie e).
:::

### c. Structure des acides et des bases

::: definition
La structure d'un **acide** au sens de Brönsted fait apparaître une **liaison polarisée** entre un atome d'hydrogène et un autre atome plus électronégatif (atome d'oxygène, d'azote, etc.).

La **rupture de cette liaison** permet la **libération d'un ion hydrogène H⁺**.
:::

Les liaisons O–H et N–H sont polarisées car les atomes liés ont des électronégativités très différentes : $\chi_\mathrm{O} - \chi_\mathrm{H} > 0{,}4$ et $\chi_\mathrm{N} - \chi_\mathrm{H} > 0{,}4$. L'atome d'oxygène ou d'azote porte une charge partielle négative δ⁻ et l'atome d'hydrogène une charge partielle positive δ⁺ : c'est cet hydrogène « appauvri en électrons » qui peut partir sous forme de H⁺.

::: exemple
Schémas de Lewis d'acides (les liaisons polarisées susceptibles d'être rompues sont celles qui relient un H à un O ou un N) :

- **Ion oxonium H₃O⁺** : un atome d'oxygène portant la charge ⊕, lié à trois atomes d'hydrogène par trois liaisons O–H polarisées ; l'oxygène garde un doublet non liant.
- **Acide éthanoïque CH₃–COOH** : la liaison O–H du groupement carboxyle est polarisée ; c'est cet hydrogène-là (et pas ceux du CH₃, liés à un carbone peu électronégatif) qui est cédé.
- **Ion méthylammonium CH₃–NH₃⁺** : un atome d'azote portant la charge ⊕, lié à trois atomes d'hydrogène par trois liaisons N–H polarisées.
:::

::: definition
Une **base** au sens de Brönsted comporte dans sa structure un atome, tel qu'un atome d'oxygène ou d'azote, portant **un ou plusieurs doublets non liants** susceptibles de venir combler la **lacune électronique** d'un ion hydrogène.

Une base est donc bien capable de **capter un ion hydrogène H⁺**.
:::

Les atomes d'oxygène et d'azote portent des doublets non liants, alors que l'ion hydrogène H⁺ possède une lacune électronique (il n'a plus aucun électron) : le doublet non liant de la base vient former la nouvelle liaison avec H⁺.

::: exemple
Schémas de Lewis de bases :

- **Ion hydroxyde HO⁻** : un atome d'oxygène lié à un hydrogène, portant trois doublets non liants et la charge ⊖.
- **Ion éthanoate CH₃–COO⁻** : l'atome d'oxygène chargé ⊖ du groupement carboxylate porte trois doublets non liants (l'autre oxygène, doublement lié au carbone, en porte deux).
- **Méthylamine CH₃–NH₂** : l'atome d'azote porte un doublet non liant.
:::

::: conseil Pour comprendre
Pour reconnaître un acide dans une formule : chercher un **H lié à un O ou à un N**. Pour reconnaître une base : chercher un **O ou un N avec un doublet non liant** (ou une charge négative). Une même molécule peut avoir les deux, c'est alors une espèce amphotère.
:::

### d. Couples acide-base

Quand un acide AH cède un ion hydrogène H⁺, il forme une espèce A⁻ susceptible de capter un ion hydrogène, c'est-à-dire une **base**. On dit que A⁻ est la **base conjuguée** de l'acide AH (du latin *conjungere*, lier).

De la même façon, quand une base A⁻ capte un ion hydrogène H⁺, elle forme une espèce AH susceptible de céder un ion hydrogène, c'est-à-dire un **acide**. AH est l'**acide conjugué** de la base A⁻.

::: definition
Un acide **AH** et une base **A⁻** conjugués forment un **couple acide-base**, de demi-équation :

::: equation
**AH = A⁻ + H⁺**
:::
:::

Certaines espèces ont des couleurs différentes sous leur forme acide et sous leur forme basique : ce sont des **indicateurs colorés acido-basiques**. Par exemple, l'hélianthine constitue un couple acide-base dont la forme acide est rouge et la forme basique est jaune.

Par convention, un couple acide-base s'écrit **AH/A⁻** : la forme acide AH est indiquée **à gauche**, la forme basique A⁻ **à droite**.

C'est une notation simple, courante, pour un couple acide-base quelconque. Cela ne signifie pas que la base porte toujours une charge négative, comme le montrent les exemples suivants.

::: exemple
| Couple | Écriture |
|---|---|
| Ion oxonium / Eau | H₃O⁺(aq) / H₂O(ℓ) |
| Eau / Ion hydroxyde | H₂O(ℓ) / HO⁻(aq) |
| Ion ammonium / Ammoniac | NH₄⁺(aq) / NH₃(aq) |
| Acide éthanoïque / Ion éthanoate | CH₃–COOH(aq) / CH₃–COO⁻(aq) |
| Acide carbonique / Ion hydrogénocarbonate | H₂CO₃(aq) / HCO₃⁻(aq) |
| Ion hydrogénocarbonate / Ion carbonate | HCO₃⁻(aq) / CO₃²⁻(aq) |
:::

::: conseil Pour comprendre
Dans un couple, l'acide et la base ne diffèrent que d'**un seul H⁺** : la base a exactement un H de moins et une charge de moins (une unité de charge plus négative) que l'acide. Pour passer de l'un à l'autre, on enlève ou on ajoute un H⁺, jamais un H₂ ni un électron.
:::

### e. Espèces amphotères

On remarque que l'eau H₂O est l'**acide conjugué** de l'ion hydroxyde HO⁻(aq) (couple H₂O/HO⁻) et la **base conjuguée** de l'ion oxonium H₃O⁺(aq) (couple H₃O⁺/H₂O).

::: definition
Une espèce qui, comme H₂O, peut se comporter **comme un acide ou comme une base**, est dite **amphotère**.
:::

::: exemple
- L'**ion hydrogénocarbonate HCO₃⁻(aq)** est une espèce amphotère : c'est la base conjuguée de l'acide carbonique H₂CO₃(aq) (couple H₂CO₃/HCO₃⁻) et l'acide conjugué de l'ion carbonate CO₃²⁻(aq) (couple HCO₃⁻/CO₃²⁻).
- Du fait de la présence dans leur structure d'un groupement **carboxyle** et d'un groupement **amino**, les **acides α-aminés** tels que la **glycine** possèdent une forme amphotère portant –NH₃⁺ (forme acide, conjuguée de –NH₂) et –COO⁻ (forme basique, conjuguée de –COOH).
:::

Pour la glycine, cette forme, appelée **zwitterion**, s'écrit H₂C(NH₃⁺)–COO⁻ : elle appartient à deux couples acide-base et est donc amphotère.

::: equation
Couple 1 : H₂C(NH₃⁺)–COOH / H₂C(NH₃⁺)–COO⁻ (le zwitterion est la base)
Couple 2 : H₂C(NH₃⁺)–COO⁻ / H₂C(NH₂)–COO⁻ (le zwitterion est l'acide)
:::

## 2. Transformations acide-base

### a. Écriture des équations

::: definition
Une **transformation acide-base** est modélisée par un **transfert d'un ion hydrogène** qui a lieu entre un **acide A₁H** d'un couple (1), qui cède un ion hydrogène, et une **base A₂⁻** d'un autre couple (2).

L'équation de la réaction s'obtient en faisant la **somme membre à membre des deux demi-équations** traduisant ce transfert :

| | |
|---|---|
| Couple (1) A₁H/A₁⁻ | A₁H = A₁⁻ + H⁺ |
| Couple (2) A₂H/A₂⁻ | A₂⁻ + H⁺ = A₂H |
| **Bilan** | **A₁H + A₂⁻ → A₁⁻ + A₂H** |

Une telle réaction **n'est pas toujours totale**.
:::

::: conseil Pour comprendre
On écrit la première demi-équation dans le sens « l'acide cède H⁺ », la seconde dans le sens « la base capte H⁺ », puis on additionne : les H⁺ se simplifient de part et d'autre, ce qui est normal puisque l'ion H⁺ n'existe pas seul en solution, il ne fait que passer de A₁H à A₂⁻. Le bilan s'écrit avec une flèche → (réaction), alors que les demi-équations s'écrivent avec un signe = (elles sont formelles).
:::

::: exemple
Lors d'un **détartrage** (par exemple d'une bouilloire), il se produit une réaction entre les ions oxonium H₃O⁺(aq) de l'acide chlorhydrique (H₃O⁺(aq), Cl⁻(aq)) et les ions carbonate CO₃²⁻(aq) du tartre CaCO₃(s).

H₃O⁺(aq) est un acide au sens de Brönsted et CO₃²⁻(aq) une base. En effet :

::: equation
H₃O⁺(aq) = H₂O(ℓ) + H⁺
CO₃²⁻(aq) + H⁺ = HCO₃⁻(aq)
:::

L'équation de la réaction modélisant la transformation est donc :

::: equation
H₃O⁺(aq) + CO₃²⁻(aq) → H₂O(ℓ) + HCO₃⁻(aq)
:::
:::

::: conseil
Dans l'exemple du détartrage, les ions chlorure de l'acide chlorhydrique et les ions calcium du tartre ne jouent aucun rôle dans la réaction étudiée : ils n'ont pas été cités. Dans les exercices, pour l'écriture des équations de réaction, il faudra penser à **écarter les ions spectateurs**.
:::

::: remarque
On peut directement obtenir l'équation d'une réaction acide-base, connaissant les couples acide-base mis en jeu, en les écrivant **l'un en dessous de l'autre** et en reliant « en croix » l'acide de l'un à la base de l'autre. Ainsi, pour la réaction entre l'acide carbonique H₂CO₃(aq), acide du couple H₂CO₃(aq)/HCO₃⁻(aq), et les ions hydroxyde HO⁻(aq), base du couple H₂O(ℓ)/HO⁻(aq), l'équation de la réaction qui se produit est :

::: equation
H₂CO₃(aq) + HO⁻(aq) → HCO₃⁻(aq) + H₂O(ℓ)
:::

Autrement dit : les **réactifs** sont l'acide du premier couple et la base du second ; les **produits** sont la base du premier couple et l'acide du second.
:::

Pour les réactions ayant pour réactif une **espèce amphotère**, le sens du transfert est imposé par la nature de l'autre réactif :

- face à une **base**, qui ne peut que capter un ion hydrogène, l'espèce amphotère joue le rôle d'un **acide** cédant cet ion ;
- face à un **acide**, qui cède un ion hydrogène, l'espèce amphotère se comporte comme une **base** captant cet ion.

::: exemple
Les ions hydrogénocarbonate HCO₃⁻(aq) ont un caractère amphotère.

Lors de la réaction entre ces ions et l'acide citrique C₆H₈O₇(aq), qui est un acide, ils jouent le rôle d'une **base** :

::: equation
HCO₃⁻(aq) + C₆H₈O₇(aq) → H₂CO₃(aq) + C₆H₇O₇⁻(aq)
:::

En revanche, lors de la réaction entre ces ions et l'ammoniac NH₃(aq), qui est une base, ils se comportent comme un **acide** :

::: equation
HCO₃⁻(aq) + NH₃(aq) → CO₃²⁻(aq) + NH₄⁺(aq)
:::

Les bulles observées à la surface d'une rondelle de citron plongée dans certaines boissons sont du dioxyde de carbone, formé au cours de la réaction entre l'acide citrique et les ions hydrogénocarbonate présents dans ces boissons (l'acide carbonique H₂CO₃ formé se décompose en CO₂ et H₂O).
:::

### b. Identifier une transformation acide-base

::: definition
Lorsqu'une équation de réaction fait apparaître un **transfert d'ion hydrogène H⁺**, il s'agit d'une **réaction acide-base**.
:::

::: exemple
La réaction qui se produit entre l'ammoniac NH₃(aq) et l'ion oxonium H₃O⁺(aq) est une réaction acide-base au cours de laquelle un ion hydrogène est **cédé par l'ion oxonium** au profit de l'ammoniac :

::: equation
NH₃(aq) + H₃O⁺(aq) → NH₄⁺(aq) + H₂O(ℓ)
:::

- perte de H⁺ : H₃O⁺ devient H₂O ;
- gain de H⁺ : NH₃ devient NH₄⁺.
:::

::: methode Reconnaître une réaction acide-base
1. Repérer, entre un réactif et un produit, une espèce qui a **gagné exactement un H** (et une charge +) : c'est la base qui est devenue son acide conjugué.
2. Repérer l'espèce qui a **perdu exactement un H** : c'est l'acide qui est devenu sa base conjuguée.
3. Si les deux existent, il y a eu transfert d'un H⁺ : la réaction est acide-base. Écrire alors les deux couples mis en jeu.
:::

Comme on le verra dans les chapitres 2 et 7, le **pH** de la solution est lié à la concentration des ions H₃O⁺(aq) en solution. Une réaction acide-base provoque ainsi une **variation de pH**.

::: exemple
Quelques gouttes de BBT (bleu de bromothymol, un indicateur coloré) ajoutées à une solution d'acide éthanoïque CH₃–COOH(aq) donnent à la solution une couleur **jaune**, signe que son pH est bas.

Lorsqu'on ajoute à cette solution une solution d'hydroxyde de sodium (Na⁺(aq), HO⁻(aq)), la couleur change et devient **bleue**, signe que le pH augmente. Le milieu est donc le siège d'une réaction acide-base :

::: equation
CH₃–COOH(aq) + HO⁻(aq) → CH₃–COO⁻(aq) + H₂O(ℓ)
:::
:::

::: securite
Les acides et les bases réagissent avec l'eau, présente dans la peau notamment, et peuvent de ce fait occasionner des **brûlures**. Ce sont des substances **corrosives**, à manipuler avec des protections telles que **blouse, gants et lunettes**.

Il faut également éviter de mélanger sans précautions des solutions d'acides et de bases, ainsi que d'introduire de l'eau dans les solutions concentrées.
:::
`);
