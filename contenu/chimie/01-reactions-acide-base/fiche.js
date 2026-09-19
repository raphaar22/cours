/* Chapitre 1 — Réactions acide-base — FICHE RÉSUMÉ (l'essentiel à retenir) */
definirContenu("chimie/01-reactions-acide-base", "fiche", String.raw`
## Définitions (Brönsted, 1923)

::: definition
- **Acide** : espèce qui peut **céder** un ion hydrogène H⁺. Demi-équation : Acide = autre espèce + H⁺
- **Base** : espèce qui peut **capter** un ion hydrogène H⁺. Demi-équation : Base + H⁺ = autre espèce
- Une demi-équation est **formelle** (signe =) : H⁺ n'existe jamais seul en solution.
:::

## Reconnaître un acide ou une base dans une formule

| | Ce qu'on cherche | Pourquoi |
|---|---|---|
| **Acide** | un **H lié à O ou N** (liaison O–H ou N–H) | liaison polarisée (χO − χH > 0,4 ; χN − χH > 0,4) qui peut se rompre en libérant H⁺ |
| **Base** | un **O ou N portant un doublet non liant** (souvent chargé ⊖) | le doublet vient combler la lacune électronique de H⁺ |

## Couples acide-base

::: definition
Acide AH et base A⁻ **conjugués** ne diffèrent que d'**un H⁺** : **AH = A⁻ + H⁺**.

Notation du couple : **AH/A⁻** (acide à gauche, base à droite). La base ne porte pas forcément une charge négative.
:::

Couples à connaître :

| Couple | Écriture |
|---|---|
| Ion oxonium / eau | H₃O⁺ / H₂O |
| Eau / ion hydroxyde | H₂O / HO⁻ |
| Ion ammonium / ammoniac | NH₄⁺ / NH₃ |
| Acide éthanoïque / ion éthanoate | CH₃–COOH / CH₃–COO⁻ |
| Acide carbonique / ion hydrogénocarbonate | H₂CO₃ / HCO₃⁻ |
| Ion hydrogénocarbonate / ion carbonate | HCO₃⁻ / CO₃²⁻ |
| Ion méthylammonium / méthylamine | CH₃–NH₃⁺ / CH₃–NH₂ |

- **Acides carboxyliques** R–COOH → bases conjuguées : **ions carboxylates** R–COO⁻.
- **Amines** R–NH₂ (bases) → acides conjugués : ions R–NH₃⁺.

## Ions spectateurs

- Acide chlorhydrique (H₃O⁺, Cl⁻), acide nitrique (H₃O⁺, NO₃⁻), acide sulfurique (2 H₃O⁺, SO₄²⁻) : seul **H₃O⁺** est responsable de l'acidité.
- Soude (Na⁺, HO⁻), potasse (K⁺, HO⁻) : seul **HO⁻** est responsable de la basicité.
- Les ions spectateurs **n'apparaissent pas** dans les équations de réaction.

## Espèces amphotères

::: definition
Une espèce **amphotère** peut se comporter comme un acide **ou** comme une base : elle appartient à **deux couples**.
:::

- **H₂O** : acide du couple H₂O/HO⁻, base du couple H₃O⁺/H₂O.
- **HCO₃⁻** : acide du couple HCO₃⁻/CO₃²⁻, base du couple H₂CO₃/HCO₃⁻.
- **Zwitterion** des acides α-aminés (glycine) : porte –NH₃⁺ (acide) et –COO⁻ (base).
- Face à une base, l'amphotère joue l'**acide** ; face à un acide, il joue la **base**.

## Écrire l'équation d'une réaction acide-base

::: methode
1. Identifier l'acide A₁H (couple 1) et la base A₂⁻ (couple 2) ; écarter les ions spectateurs.
2. Écrire les demi-équations : A₁H = A₁⁻ + H⁺ et A₂⁻ + H⁺ = A₂H.
3. Additionner membre à membre (les H⁺ se simplifient) :

::: equation
**A₁H + A₂⁻ → A₁⁻ + A₂H**
:::

Raccourci : écrire les deux couples l'un sous l'autre et relier « en croix » l'acide de l'un à la base de l'autre.
:::

- La réaction **n'est pas toujours totale**.
- Exemple (détartrage) : H₃O⁺(aq) + CO₃²⁻(aq) → H₂O(ℓ) + HCO₃⁻(aq)
- Exemple : H₂CO₃(aq) + HO⁻(aq) → HCO₃⁻(aq) + H₂O(ℓ)
- Exemple : NH₃(aq) + H₃O⁺(aq) → NH₄⁺(aq) + H₂O(ℓ)

## Identifier une réaction acide-base

::: definition
Une équation qui fait apparaître un **transfert d'ion H⁺** (une espèce perd exactement un H, une autre en gagne un) est une **réaction acide-base**.
:::

- Le **pH** dépend de la concentration en H₃O⁺ : une réaction acide-base fait **varier le pH** (mise en évidence avec un indicateur coloré, par exemple le BBT : jaune en milieu acide, bleu en milieu basique).

## Sécurité

::: securite
Acides et bases sont **corrosifs** (ils réagissent avec l'eau de la peau) : blouse, gants, lunettes. Ne pas mélanger acides et bases sans précaution ; ne jamais verser d'eau dans une solution concentrée.
:::
`);
