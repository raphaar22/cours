/* Chapitre 2 — Méthodes physiques d'analyse — FICHE RÉSUMÉ (l'essentiel à retenir) */
definirContenu("chimie/02-methodes-physiques-analyse", "fiche", String.raw`
## 1. pH

::: formule
$$\mathrm{pH} = -\log\left(\frac{[\mathrm{H_3O^+}]}{c^0}\right) \qquad\qquad [\mathrm{H_3O^+}] = c^0 \times 10^{-\mathrm{pH}}$$
---
[H₃O⁺] en mol·L⁻¹ · pH sans unité · c⁰ = 1 mol·L⁻¹ exactement
Valable pour [H₃O⁺] ou [HO⁻] < 1,0 × 10⁻¹ mol·L⁻¹
:::

- pH **faible** ⇔ [H₃O⁺] **grande**. Échelle logarithmique : **[H₃O⁺] ÷ 10 ⇒ pH + 1** ; ÷ 100 ⇒ pH + 2.
- Sans calculatrice : [H₃O⁺] = 1,0 × 10⁻ⁿ mol·L⁻¹ ⇔ pH = n,00.
- Maths : $\log(ab) = \log a + \log b$ ; $\log(a/b) = \log a - \log b$ ; $\log(10^x) = x$. Ex. : [H₃O⁺] = 2,0 × 10⁻³ et log 2 = 0,30 ⇒ pH = −0,30 + 3,00 = 2,70.
- Touches calculatrice : **log** et **10ˣ** (pas la notation scientifique).
- **Mesure** : pH-mètre (au centième, sonde fragile) ; papier pH ou indicateur coloré (à l'unité). BBT : jaune (acide) / bleu (basique).

## 2. Spectroscopies

| | UV-visible | Infrarouge (IR) |
|---|---|---|
| Ordonnée | **Absorbance A** (sans unité) | **Transmittance T** (en %) |
| Abscisse | **Longueur d'onde λ** (nm) | **Nombre d'onde σ** = 1/λ (cm⁻¹) |
| Sert à | identifier une espèce (allure dépend de l'espèce, de sa concentration, du solvant) ; doser (Beer-Lambert) | identifier des **liaisons** donc des **groupes caractéristiques** |

- Une solution est **colorée** si elle absorbe dans le **visible (400–800 nm)** ; incolore si elle n'absorbe que dans l'UV (ex. acide salicylique : maxima à 236 et 310 nm).
- T = 100 % ⇔ pas d'absorption ; une bande d'absorption est un **creux**.

::: methode Lire un spectre IR
1. Repérer les nombres d'onde des bandes → liaisons. 2. En déduire les groupes caractéristiques. 3. Les retrouver dans la formule.
:::

| Liaison | Nombre d'onde (cm⁻¹) | Famille |
|---|---|---|
| O–H | 3 200 à 3 600, **large** | alcool, acide carboxylique |
| N–H | 3 100 à 3 500, parfois deux bandes | amine, amide |
| C–H | vers 2 800 – 3 000 | presque toutes (aldéhyde : 2 800) |
| C=O | vers 1 700, **fine et profonde** | aldéhyde, cétone, acide carboxylique, ester, amide |
| C–O | 1 300 | ester |

## 3. Conductance et conductivité

::: formule
$$G = \frac{i}{u} \qquad\qquad \sigma = G\,\frac{\ell}{S}$$
---
G en S · i en A · u en V
σ en S·m⁻¹ · ℓ en m · S en m² · ℓ/S = constante de cellule (m⁻¹)
:::

- **G** dépend de la cellule (S, ℓ) **et** de la solution ; **σ** ne dépend que de la **solution** (température, nature et concentration des ions).
- Montage : GBF sinusoïdal **1 kHz**, voltmètre et ampèremètre en **AC**.

::: definition Loi de Kohlrausch
$$\sigma = \sum_i \lambda_{\mathrm{X}_i}\,[\mathrm{X}_i]$$

σ en S·m⁻¹, λ en S·m²·mol⁻¹, **[Xᵢ] en mol·m⁻³**. Valable pour c < 1,0 × 10⁻² mol·L⁻¹ (10 mol·m⁻³).
:::

- **Conversion obligatoire** : 1 mol·L⁻¹ = 10³ mol·m⁻³ (car 1 L = 10⁻³ m³) ; 1 mol·m⁻³ = 10⁻³ mol·L⁻¹. Attention aux λ parfois en mS·m²·mol⁻¹.
- λ à retenir en ordre de grandeur : H₃O⁺ (35,0 × 10⁻³) ≫ HO⁻ (19,8 × 10⁻³) > SO₄²⁻ (16,0 × 10⁻³) > les autres (5 à 11 × 10⁻³ S·m²·mol⁻¹).

::: methode Concentration d'une solution à un seul soluté
Équation de dissolution → concentrations des ions en fonction de c (ex. Ni(NO₃)₂ : [Ni²⁺] = c, [NO₃⁻] = 2c) → Kohlrausch : σ = (λ<sub>Ni²⁺</sub> + 2 λ<sub>NO₃⁻</sub>)·c → c = σ / (λ<sub>Ni²⁺</sub> + 2 λ<sub>NO₃⁻</sub>) en **mol·m⁻³** → ÷ 10³ pour avoir des mol·L⁻¹.
:::

## 4. Dosage par étalonnage

::: methode Protocole
1. Préparer une **échelle de solutions étalons** (dilutions d'une solution de concentration connue).
2. Mesurer la grandeur (A, G ou σ) pour chaque étalon.
3. Tracer le **graphique d'étalonnage** : grandeur en ordonnée, concentration en abscisse ; tracer la **courbe-modèle**.
4. Mesurer la grandeur pour la solution inconnue et **lire graphiquement** sa concentration.
:::

- **Conductimétrique** : solution avec **un seul soluté apporté** ; G ou σ proportionnelle à c.
- **Spectrophotométrique** : **un seul soluté absorbant**, mesures à **λ<sub>max</sub>** ; loi de **Beer-Lambert** :

::: formule
$$A_\lambda = \varepsilon\,\ell\,c$$
---
A sans unité · ℓ en cm · c en mol·L⁻¹ · ε en L·mol⁻¹·cm⁻¹ (coefficient d'absorption molaire)
Valable pour c < 0,1 mol·L⁻¹ environ
:::

## 5. Gaz parfait

::: formule
$$P\,V = n\,R\,T \qquad\qquad V_m = \frac{V}{n} = \frac{R\,T}{P}$$
---
P en **Pa** · V en **m³** · n en mol · T en **K** · R = 8,31 J·mol⁻¹·K⁻¹
:::

- **Conversions** : T(K) = θ(°C) + 273,15 ; 1 bar = 10⁵ Pa ; 1 hPa = 10² Pa ; 1 L = 10⁻³ m³ ; 1 mL = 10⁻⁶ m³.
- Gaz parfait : entités sans interaction, volume propre négligeable. Valable pour **P < 5 × 10⁵ Pa** ⇒ tous les gaz dans les conditions usuelles (montgolfière : oui ; bouteille de plongée à plusieurs bars : non).
- **Volume molaire** Vₘ : même pour tous les gaz à T et P données (**loi d'Avogadro-Ampère**). Sous 1,01 × 10⁵ Pa : **24,5 L·mol⁻¹ à 25 °C**, **22,5 L·mol⁻¹ à 0 °C**. Et n = V / Vₘ.
`);
