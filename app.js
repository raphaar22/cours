/* ============================================================
   Physique-Chimie · Terminale — logique de l'application
   Sans framework : navigation par ancre (#/…), rendu Markdown
   (marked) + formules (KaTeX), recherche, cartes mémo.
   ============================================================ */

(function () {
  "use strict";

  const principal = document.getElementById("contenu");
  const TYPES = {
    cours: "Cours",
    vocabulaire: "Vocabulaire",
    fiche: "Fiche",
    cartes: "Cartes",
    quiz: "Quiz",
    donnees: "Données",
  };
  const TITRES_BLOCS = {
    definition: "Définition",
    exemple: "Exemple",
    remarque: "Remarque",
    unites: "Unités",
    securite: "Sécurité",
    maths: "Maths",
    conseil: "Conseil",
    methode: "Méthode",
    vocabulaire: "Vocabulaire",
    attention: "Attention",
  };

  /* ---------- Thème clair / sombre ---------- */
  function lireTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function appliquerTheme(theme) {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
  }
  appliquerTheme(lireTheme());
  document.getElementById("bouton-theme").addEventListener("click", function () {
    const actuel = document.documentElement.getAttribute("data-theme")
      || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const nouveau = actuel === "dark" ? "light" : "dark";
    appliquerTheme(nouveau);
    try { localStorage.setItem("theme", nouveau); } catch (e) { /* stockage indisponible */ }
  });

  /* ---------- Téléphone ou ordinateur ? ---------- */
  const petitEcran = window.matchMedia("(max-width: 979px)");
  function estMobile() { return petitEcran.matches; }

  /* ---------- Outils ---------- */
  function echapper(texte) {
    return String(texte)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  const TABLE_INDICES = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "⁺": "+", "⁻": "-", "ℓ": "l", "→": "->", "⇌": "=", "×": "x", "·": ".", "−": "-" };
  function normaliser(texte) {
    return String(texte)
      .replace(/[₀-₉⁰-⁹⁺⁻ℓ→⇌×·−]/g, function (c) { return TABLE_INDICES[c] || c; })
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  }
  function slug(texte) {
    return normaliser(texte).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
  }
  function chapitreParId(id) {
    return CHAPITRES.find(function (c) { return c.id === id; });
  }
  function lienChapitre(chap, type, section) {
    return "#/" + chap.id + "/" + type + (section ? "?s=" + encodeURIComponent(section) : "");
  }
  function texteBrut(markdown) {
    /* Version « texte » d'un Markdown, pour la recherche et les extraits */
    return String(markdown)
      .replace(/^:::.*$/gm, " ")
      .replace(/\$\$([\s\S]*?)\$\$/g, " $1 ")
      .replace(/\$([^$\n]+?)\$/g, " $1 ")
      .replace(/\\(text|mathrm|ce)\{([^}]*)\}/g, "$2")
      .replace(/[\\{}]/g, " ")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/[*_`>|]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* ---------- Rendu Markdown + blocs + formules ---------- */
  marked.setOptions({ gfm: true, breaks: false });

  function proteger(markdown, reserve) {
    /* Met les formules de côté pour que marked ne les abîme pas */
    return String(markdown)
      .replace(/\$\$([\s\S]*?)\$\$/g, function (m) { reserve.push(m); return "MATHTOKEN" + (reserve.length - 1) + "END"; })
      .replace(/\$([^$\n]+?)\$/g, function (m) { reserve.push(m); return "MATHTOKEN" + (reserve.length - 1) + "END"; });
  }
  function restaurer(html, reserve) {
    return html.replace(/MATHTOKEN(\d+)END/g, function (m, n) { return echapper(reserve[Number(n)]); });
  }

  function rendreBlocs(markdown, reserve) {
    /* Transforme les blocs ::: type Titre … ::: en HTML, le reste passe par marked */
    const lignes = String(markdown).split("\n");
    const blocs = [];
    const sortie = [];
    let i = 0;
    while (i < lignes.length) {
      const m = lignes[i].match(/^:::\s*([a-z]+)(?:\s+(.*))?\s*$/);
      if (m) {
        const type = m[1];
        const titre = (m[2] || "").trim();
        const interieur = [];
        let profondeur = 1;
        i++;
        while (i < lignes.length) {
          if (/^:::\s*[a-z]+/.test(lignes[i])) profondeur++;
          else if (/^:::\s*$/.test(lignes[i])) { profondeur--; if (profondeur === 0) break; }
          interieur.push(lignes[i]);
          i++;
        }
        i++; /* saute la ligne ::: de fin */
        blocs.push(rendreBloc(type, titre, interieur.join("\n"), reserve));
        sortie.push("", "BLOCTOKEN" + (blocs.length - 1) + "END", "");
      } else {
        sortie.push(lignes[i]);
        i++;
      }
    }
    let html = marked.parse(sortie.join("\n"));
    html = html.replace(/<p>BLOCTOKEN(\d+)END<\/p>/g, function (m, n) { return blocs[Number(n)]; });
    return html;
  }

  function rendreBloc(type, titre, interieur, reserve) {
    if (type === "equation") {
      const lignes = interieur.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
      return '<div class="equation">' + lignes.map(function (l) { return "<p>" + marked.parseInline(l) + "</p>"; }).join("") + "</div>";
    }
    if (type === "formule") {
      const parties = interieur.split(/^\s*---\s*$/m);
      const exp = marked.parse(parties[0] || "");
      const legende = (parties[1] || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean)
        .map(function (l) { return "<p>" + marked.parseInline(l) + "</p>"; }).join("");
      return '<div class="formule"><div class="formule-exp">' + exp + '</div>' +
        (legende ? '<div class="formule-legende">' + legende + '</div>' : "") + "</div>";
    }
    const libelle = titre || TITRES_BLOCS[type] || type;
    return '<div class="bloc bloc-' + type + '"><span class="bloc-titre">' + echapper(libelle) + "</span>" +
      rendreBlocs(interieur, reserve) + "</div>";
  }

  function rendreMarkdown(markdown) {
    const reserve = [];
    const protege = proteger(markdown, reserve);
    return restaurer(rendreBlocs(protege, reserve), reserve)
      .replace(/<table>/g, '<div class="tableau"><table>')
      .replace(/<\/table>/g, "</table></div>");
  }
  function rendreEnLigne(markdown) {
    const reserve = [];
    return restaurer(marked.parseInline(proteger(markdown, reserve)), reserve);
  }
  function rendreFormules(element) {
    if (typeof renderMathInElement !== "function") return;
    renderMathInElement(element, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
      strict: "ignore",
      trust: false,
    });
  }

  /* ---------- Chargement des fichiers de contenu ---------- */
  function chargerContenu(termine) {
    const fichiers = [];
    CHAPITRES.forEach(function (chap) {
      chap.fichiers.forEach(function (f) { fichiers.push("contenu/" + chap.id + "/" + f + ".js"); });
    });
    let restants = fichiers.length;
    if (!restants) return termine();
    fichiers.forEach(function (src) {
      const s = document.createElement("script");
      s.src = src;
      s.onload = s.onerror = function () { if (--restants === 0) termine(); };
      document.body.appendChild(s);
    });
  }

  /* ---------- Barre d'onglets du bas (téléphone) ---------- */
  const ICONES = {
    accueil: '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>',
    cours: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>',
    vocabulaire: '<path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    fiche: '<path d="M6 3h9l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h7M9 17h5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    cartes: '<rect x="3" y="7" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M8 4h10a3 3 0 0 1 3 3v9" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
    quiz: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.2 2.4c-.5.2-.8.7-.8 1.2v.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1.05" fill="currentColor"/>',
    donnees: '<rect x="3.5" y="4.5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M3.5 9.5h17M9.5 9.5V20M3.5 15h17" fill="none" stroke="currentColor" stroke-width="1.9"/>',
  };
  const COURTS = { cours: "Cours", vocabulaire: "Vocab", fiche: "Fiche", quiz: "Quiz", cartes: "Cartes", donnees: "Données" };

  function majBarreOnglets(chap, type) {
    const barre = document.getElementById("barre-onglets");
    let html = '<a href="#/"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONES.accueil + "</svg><span>Accueil</span></a>";
    html += chap.fichiers.map(function (f) {
      return '<a href="' + lienChapitre(chap, f) + '"' + (f === type ? ' aria-current="page"' : "") + '>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONES[f] || ICONES.cours) + "</svg><span>" + COURTS[f] + "</span></a>";
    }).join("");
    barre.innerHTML = html;
    barre.hidden = false;
    document.body.classList.add("avec-barre");
  }
  function masquerBarreOnglets() {
    const barre = document.getElementById("barre-onglets");
    barre.hidden = true;
    barre.innerHTML = "";
    document.body.classList.remove("avec-barre");
  }

  /* ---------- Barre de progression et bouton de remontée ---------- */
  const boutonHaut = document.getElementById("bouton-haut");
  const barreProgression = document.getElementById("barre-progression").firstElementChild;
  boutonHaut.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  function majProgression() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    barreProgression.style.width = (h > 40 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0) + "%";
    boutonHaut.classList.toggle("visible", y > 700);
  }
  window.addEventListener("scroll", majProgression, { passive: true });
  window.addEventListener("resize", majProgression);

  /* ---------- Impression : même rendu sur téléphone et sur ordinateur ---------- */
  let replieesAvantImpression = [];
  function deplierPourImpression() {
    replieesAvantImpression = Array.prototype.slice.call(document.querySelectorAll("details:not([open])"));
    replieesAvantImpression.forEach(function (d) { d.open = true; });
  }
  function replierApresImpression() {
    replieesAvantImpression.forEach(function (d) { d.open = false; });
    replieesAvantImpression = [];
  }
  window.addEventListener("beforeprint", deplierPourImpression);
  window.addEventListener("afterprint", replierApresImpression);

  /* Installée sur l'écran d'accueil, iOS n'autorise pas l'impression : on passe par Safari. */
  function appliInstallee() {
    return (window.navigator.standalone === true)
      || window.matchMedia("(display-mode: standalone)").matches;
  }
  function imprimer() {
    if (appliInstallee()) {
      const message = document.getElementById("message-impression");
      if (message) { message.hidden = false; return; }
    }
    deplierPourImpression();
    window.print();
    setTimeout(replierApresImpression, 1500);
  }

  /* ---------- Plan repliable (téléphone) ---------- */
  function construireAccordeon(article) {
    const enfants = Array.from(article.children);
    if (!enfants.some(function (e) { return e.tagName === "H2" || e.tagName === "H3"; })) return;

    const plan = document.createElement("div");
    plan.className = "plan";
    let groupe = null;       /* bloc d'une grande partie (h2) */
    let cible = null;        /* où déposer le contenu courant */

    function nouvelleSection(titre) {
      const details = document.createElement("details");
      details.className = "section";
      const summary = document.createElement("summary");
      summary.appendChild(titre);
      const corps = document.createElement("div");
      corps.className = "section-corps";
      details.appendChild(summary);
      details.appendChild(corps);
      (groupe || plan).appendChild(details);
      return corps;
    }

    enfants.forEach(function (el) {
      if (el.tagName === "H2") {
        groupe = document.createElement("div");
        groupe.className = "partie";
        plan.appendChild(groupe);
        /* Le titre de partie reste visible ; il devient repliable s'il n'a pas de sous-section */
        groupe._titre = el;
        groupe._aSousSection = false;
        cible = null;
      } else if (el.tagName === "H3") {
        if (groupe && !groupe._aSousSection) {
          groupe._aSousSection = true;
          const h2 = groupe._titre;
          if (h2) { h2.className = "partie-titre"; groupe.insertBefore(h2, groupe.firstChild); }
          if (groupe._intro) groupe.insertBefore(groupe._intro, null);
        }
        cible = nouvelleSection(el);
      } else {
        if (!groupe) { plan.appendChild(el); return; }          /* introduction du chapitre */
        if (cible) { cible.appendChild(el); return; }           /* contenu d'une sous-section */
        if (!groupe._intro) {                                   /* contenu juste sous le titre de partie */
          groupe._intro = document.createElement("div");
          groupe._intro.className = "partie-intro";
          groupe.appendChild(groupe._intro);
        }
        groupe._intro.appendChild(el);
      }
    });

    /* Les parties sans sous-section deviennent elles-mêmes repliables */
    Array.from(plan.querySelectorAll(".partie")).forEach(function (g) {
      if (g._aSousSection) {
        if (g._titre && !g.contains(g._titre)) g.insertBefore(g._titre, g.firstChild);
        return;
      }
      const details = document.createElement("details");
      details.className = "section";
      const summary = document.createElement("summary");
      if (g._titre) summary.appendChild(g._titre);
      const corps = document.createElement("div");
      corps.className = "section-corps";
      if (g._intro) while (g._intro.firstChild) corps.appendChild(g._intro.firstChild);
      details.appendChild(summary);
      details.appendChild(corps);
      g.innerHTML = "";
      g.appendChild(details);
    });

    article.innerHTML = "";
    const sections = plan.querySelectorAll("details.section");
    if (sections.length > 1) {
      const outils = document.createElement("div");
      outils.className = "plan-outils";
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "bouton bouton-petit";
      bouton.textContent = "Tout déplier";
      bouton.addEventListener("click", function () {
        const ouvrir = bouton.textContent === "Tout déplier";
        sections.forEach(function (d) { d.open = ouvrir; });
        bouton.textContent = ouvrir ? "Tout replier" : "Tout déplier";
        majProgression();
      });
      outils.appendChild(bouton);
      article.appendChild(outils);
    }
    article.appendChild(plan);
    article.addEventListener("toggle", majProgression, true);
  }

  /* ---------- Tableaux empilés (téléphone) ---------- */
  function preparerTableaux(racine) {
    Array.from(racine.querySelectorAll("table")).forEach(function (table) {
      const entetes = Array.from(table.querySelectorAll("thead th")).map(function (th) { return th.textContent.trim(); });
      if (entetes.length < 3) return;   /* deux colonnes : le tableau tient déjà dans l'écran */
      Array.from(table.querySelectorAll("tbody tr")).forEach(function (tr) {
        Array.from(tr.children).forEach(function (td, i) {
          if (i === 0 && !entetes[0]) { td.className = "cellule-titre"; return; }
          td.setAttribute("data-label", entetes[i] || "");
        });
      });
      const enveloppe = table.closest(".tableau");
      if (enveloppe) enveloppe.classList.add("tableau-empile");
    });
  }

  /* ---------- Navigation ---------- */
  function lireRoute() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const q = hash.indexOf("?");
    const chemin = (q >= 0 ? hash.slice(0, q) : hash).replace(/^\/+|\/+$/g, "");
    const params = new URLSearchParams(q >= 0 ? hash.slice(q + 1) : "");
    return { segments: chemin ? chemin.split("/") : [], params: params };
  }

  function naviguer() {
    const route = lireRoute();
    const seg = route.segments;
    window.scrollTo({ top: 0, behavior: "auto" });
    if (seg.length === 0) return afficherAccueil();
    if (seg[0] === "recherche") return afficherRecherche(route.params.get("q") || "");
    const chap = chapitreParId(seg[0] + "/" + (seg[1] || ""));
    if (!chap) return afficherIntrouvable();
    const type = chap.fichiers.includes(seg[2]) ? seg[2] : chap.fichiers[0];
    if (seg[2] !== type) { location.replace("#/" + chap.id + "/" + type); return; }
    afficherChapitre(chap, type, route.params.get("s"));
  }

  /* ---------- Accueil ---------- */
  function afficherAccueil() {
    document.title = "Physique-Chimie · Terminale";
    masquerBarreOnglets();
    const ordre = ["chimie", "physique", "annexes"];
    let html = '<section class="accueil-tete"><p class="surtitre">Terminale · spécialité</p>' +
      "<h1>Physique-Chimie</h1><p>Le cours complet, le vocabulaire, une fiche résumé et des cartes mémo pour chaque chapitre.</p>" +
      '<form class="recherche-forme" id="forme-recherche" role="search"><input type="search" name="q" placeholder="Rechercher dans tous les cours (pH, conductivité, amphotère…)" aria-label="Rechercher"><button class="bouton bouton-primaire" type="submit">Chercher</button></form></section>';
    ordre.forEach(function (m) {
      const info = MATIERES[m];
      const chapitres = CHAPITRES.filter(function (c) { return c.matiere === m; });
      html += '<section class="matiere"><div class="matiere-tete"><h2>' + echapper(info.nom) + "</h2><span>" + echapper(info.description) + "</span></div>";
      if (!chapitres.length) {
        html += '<p class="vide">Aucun chapitre pour l\'instant — ils arriveront au fil de l\'année.</p>';
      } else {
        html += '<div class="grille-chapitres">' + chapitres.map(carteChapitre).join("") + "</div>";
      }
      html += "</section>";
    });
    principal.innerHTML = html;
    document.getElementById("forme-recherche").addEventListener("submit", function (e) {
      e.preventDefault();
      const q = this.elements.q.value.trim();
      location.hash = "#/recherche" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }

  function carteChapitre(chap) {
    const numero = chap.numero ? "Chapitre " + chap.numero : (chap.pages ? echapper(chap.pages) : "");
    return '<a class="carte-chapitre" href="' + lienChapitre(chap, chap.fichiers[0]) + '">' +
      (numero ? '<div class="numero">' + numero + "</div>" : "") +
      "<h3>" + echapper(chap.titre) + "</h3><p>" + echapper(chap.sousTitre || "") + "</p>" +
      '<div class="onglets-mini">' + chap.fichiers.map(function (f) { return "<span>" + TYPES[f] + "</span>"; }).join("") + "</div></a>";
  }

  /* ---------- Page chapitre ---------- */
  function afficherChapitre(chap, type, section) {
    const donnees = CONTENU[chap.id] || {};
    document.title = chap.titre + " · " + TYPES[type];
    const matiere = MATIERES[chap.matiere];
    let html = '<p class="fil"><a href="#/">Accueil</a> › ' + echapper(matiere.nom) +
      (chap.numero ? " › Chapitre " + chap.numero : "") + "</p>" +
      '<header class="chapitre-tete"><h1>' + echapper(chap.titre) + "</h1>" +
      (chap.sousTitre ? '<p class="sous-titre">' + echapper(chap.sousTitre) + "</p>" : "") + "</header>";
    if (chap.fichiers.length > 1) {
      html += '<nav class="onglets" aria-label="Parties du chapitre">' + chap.fichiers.map(function (f) {
        return '<a class="onglet" href="' + lienChapitre(chap, f) + '"' + (f === type ? ' aria-current="page"' : "") + ">" + TYPES[f] + "</a>";
      }).join("") + "</nav>";
    }
    html += '<div id="zone"></div>';
    principal.innerHTML = html;
    majBarreOnglets(chap, type);
    const zone = document.getElementById("zone");
    const valeur = donnees[type];
    if (valeur === undefined) {
      zone.innerHTML = '<p class="vide">Cette partie n\'est pas encore rédigée.</p>';
      return;
    }
    if (type === "cours" || type === "donnees") afficherCours(zone, chap, type, valeur, section);
    else if (type === "vocabulaire") afficherVocabulaire(zone, valeur);
    else if (type === "fiche") afficherFiche(zone, chap, valeur, section);
    else if (type === "cartes") afficherCartes(zone, chap, valeur);
    else if (type === "quiz") afficherQuiz(zone, chap, valeur);
  }

  function afficherCours(zone, chap, type, markdown, section) {
    zone.innerHTML = '<div class="cours-grille"><details class="sommaire" id="sommaire"><summary>Sommaire</summary></details>' +
      '<article class="article" id="article"></article></div>';
    const article = document.getElementById("article");
    article.innerHTML = rendreMarkdown(markdown);
    rendreFormules(article);
    construireSommaire(article, document.getElementById("sommaire"), chap, type);
    if (estMobile()) { construireAccordeon(article); preparerTableaux(article); }
    allerA(section);
    majProgression();
  }

  function construireSommaire(article, sommaire, chap, type) {
    const titres = Array.from(article.querySelectorAll("h2, h3"));
    const vus = {};
    titres.forEach(function (h) {
      let id = slug(h.textContent);
      if (vus[id]) id += "-" + (++vus[id]); else vus[id] = 1;
      h.id = id;
    });
    if (!titres.length) { sommaire.remove(); return; }
    let html = '<p class="titre-sommaire">Sommaire</p><ol>';
    let ouvert = false;
    titres.forEach(function (h) {
      const lien = '<a href="' + lienChapitre(chap, type, h.id) + '" data-cible="' + h.id + '">' + echapper(h.textContent) + "</a>";
      if (h.tagName === "H2") {
        if (ouvert) html += "</ol></li>";
        html += "<li>" + lien + "<ol>";
        ouvert = true;
      } else {
        if (!ouvert) { html += "<li><ol>"; ouvert = true; }
        html += "<li>" + lien + "</li>";
      }
    });
    if (ouvert) html += "</ol></li>";
    html += "</ol>";
    sommaire.insertAdjacentHTML("beforeend", html);
    /* Sur grand écran, le sommaire est toujours déplié (colonne de gauche) */
    const grandEcran = window.matchMedia("(min-width: 980px)");
    function ajusterSommaire() { if (grandEcran.matches) sommaire.open = true; }
    ajusterSommaire();
    if (grandEcran.addEventListener) grandEcran.addEventListener("change", ajusterSommaire);
    sommaire.addEventListener("click", function (e) {
      const a = e.target.closest("a[data-cible]");
      if (!a) return;
      e.preventDefault();
      history.replaceState(null, "", a.getAttribute("href"));
      allerA(a.dataset.cible);
      if (window.innerWidth < 980) sommaire.removeAttribute("open");
    });
    /* Surligne la section visible dans le sommaire */
    if ("IntersectionObserver" in window) {
      const liens = {};
      sommaire.querySelectorAll("a[data-cible]").forEach(function (a) { liens[a.dataset.cible] = a; });
      const obs = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (en.isIntersecting) {
            Object.keys(liens).forEach(function (k) { liens[k].classList.remove("actif"); });
            if (liens[en.target.id]) liens[en.target.id].classList.add("actif");
          }
        });
      }, { rootMargin: "-10% 0px -75% 0px" });
      titres.forEach(function (h) { obs.observe(h); });
    }
  }

  function allerA(id) {
    if (!id) return;
    const cible = document.getElementById(id);
    if (!cible) return;
    /* Sur téléphone la section visée peut être repliée : on l'ouvre d'abord */
    let parent = cible.parentElement;
    while (parent) {
      if (parent.tagName === "DETAILS") parent.open = true;
      parent = parent.parentElement;
    }
    cible.scrollIntoView({ block: "start" });
    cible.classList.add("cible");
    setTimeout(function () { cible.classList.remove("cible"); }, 2000);
  }

  /* ---------- Vocabulaire ---------- */
  function afficherVocabulaire(zone, liste) {
    const termes = liste.slice().sort(function (a, b) { return normaliser(a.terme).localeCompare(normaliser(b.terme)); });
    zone.innerHTML = '<div class="vocabulaire-outils"><input class="champ" type="search" id="filtre-vocab" placeholder="Filtrer les termes…" aria-label="Filtrer"><span id="vocab-compte"></span></div><dl class="definitions" id="definitions"></dl>';
    const dl = document.getElementById("definitions");
    const compte = document.getElementById("vocab-compte");
    function dessiner(filtre) {
      const f = normaliser(filtre || "");
      const visibles = termes.filter(function (t) { return !f || normaliser(t.terme + " " + t.definition).includes(f); });
      let html = "";
      let lettre = "";
      visibles.forEach(function (t) {
        const l = normaliser(t.terme).charAt(0).toUpperCase();
        if (!f && l !== lettre) { lettre = l; html += '<div class="lettre">' + l + "</div>"; }
        html += "<dt>" + rendreEnLigne(t.terme) + "</dt><dd>" + rendreMarkdown(t.definition) + "</dd>";
      });
      dl.innerHTML = html || '<p class="vide">Aucun terme ne correspond.</p>';
      compte.textContent = visibles.length + " terme" + (visibles.length > 1 ? "s" : "");
      rendreFormules(dl);
      majProgression();
    }
    dessiner("");
    document.getElementById("filtre-vocab").addEventListener("input", function () { dessiner(this.value); });
  }

  /* ---------- Fiche résumé ---------- */
  function afficherFiche(zone, chap, markdown, section) {
    zone.innerHTML = '<div class="fiche"><div class="fiche-outils"><button class="bouton bouton-petit" type="button" id="imprimer">Imprimer / PDF</button></div>' +
      '<p class="message" id="message-impression" hidden>Depuis l\'application installée sur l\'écran d\'accueil, iOS n\'autorise pas l\'impression. ' +
      'Ouvre <a href="' + location.href + '" target="_blank" rel="noopener">cette page dans Safari</a>, puis Partager → Imprimer pour obtenir le PDF.</p>' +
      '<div class="cours-grille"><details class="sommaire" id="sommaire"><summary>Sommaire</summary></details><article class="article" id="article"></article></div></div>';
    const article = document.getElementById("article");
    article.innerHTML = rendreMarkdown(markdown);
    rendreFormules(article);
    construireSommaire(article, document.getElementById("sommaire"), chap, "fiche");
    if (estMobile()) {
      construireAccordeon(article);
      preparerTableaux(article);
      /* Sur téléphone, le bouton d'impression rejoint la ligne « Tout déplier » */
      const outils = article.querySelector(".plan-outils");
      const imprimer = document.getElementById("imprimer");
      if (outils && imprimer) {
        outils.insertBefore(imprimer, outils.firstChild);
        const ancien = zone.querySelector(".fiche-outils");
        if (ancien) ancien.remove();
      }
    }
    document.getElementById("imprimer").addEventListener("click", imprimer);
    allerA(section);
    majProgression();
  }

  /* ---------- Cartes mémo ---------- */
  function hacher(texte) {
    let h = 5381;
    for (let i = 0; i < texte.length; i++) h = ((h << 5) + h + texte.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  function lireEtats(chap) {
    try { return JSON.parse(localStorage.getItem("cartes:" + chap.id) || "{}"); } catch (e) { return {}; }
  }
  function ecrireEtats(chap, etats) {
    try { localStorage.setItem("cartes:" + chap.id, JSON.stringify(etats)); } catch (e) { /* stockage indisponible */ }
  }

  function afficherCartes(zone, chap, cartes) {
    const toutes = cartes.map(function (c, i) { return { q: c.q, r: c.r, cle: hacher(c.q), indice: i }; });
    let etats = lireEtats(chap);
    let seulementARevoir = false;
    let ordre = toutes.slice();
    let position = 0;
    let retournee = false;

    zone.innerHTML =
      '<div class="cartes">' +
      '<div class="cartes-outils"><div class="cartes-compteur" id="compteur"></div>' +
      '<div class="cartes-actions"><label><input type="checkbox" id="filtre-revoir"> ' + (estMobile() ? "À revoir" : "Seulement « à revoir »") + '</label>' +
      '<button class="bouton bouton-petit" type="button" id="melanger">Mélanger</button>' +
      '<button class="bouton bouton-petit" type="button" id="reinitialiser">Réinitialiser</button></div></div>' +
      '<div class="barre" id="barre"></div>' +
      '<div id="scene"></div>' +
      "</div>";

    const scene = document.getElementById("scene");

    function liste() {
      return seulementARevoir ? ordre.filter(function (c) { return etats[c.cle] === "revoir"; }) : ordre;
    }
    function compter() {
      let ok = 0, non = 0;
      toutes.forEach(function (c) { if (etats[c.cle] === "su") ok++; else if (etats[c.cle] === "revoir") non++; });
      return { ok: ok, non: non, total: toutes.length };
    }
    function dessinerCompteur() {
      const n = compter();
      const l = liste();
      document.getElementById("compteur").innerHTML =
        "<span>Carte " + (l.length ? Math.min(position + 1, l.length) : 0) + " / " + l.length + "</span>" +
        '<span class="ok">' + n.ok + " sue" + (n.ok > 1 ? "s" : "") + "</span>" +
        '<span class="non">' + n.non + " à revoir</span>";
      const pOk = n.total ? (100 * n.ok / n.total) : 0;
      const pNon = n.total ? (100 * n.non / n.total) : 0;
      document.getElementById("barre").innerHTML = '<div class="ok" style="width:' + pOk + '%"></div><div class="non" style="width:' + pNon + '%"></div>';
    }
    function reduitMouvement() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    /* Une carte : recto question, verso réponse. La carte du dessus est cliquable. */
    function htmlCarte(c, devant) {
      const etat = etats[c.cle];
      const badge = etat === "su" ? '<span class="etat ok">Sue</span>'
        : etat === "revoir" ? '<span class="etat non">À revoir</span>' : "";
      const balise = devant ? "button" : "div";
      return "<" + balise + ' class="carte"' + (devant ? ' id="carte" type="button" aria-label="Retourner la carte"' : ' aria-hidden="true"') + ">" +
        '<div class="face face-recto"><span class="etiquette">Question</span>' + badge +
        "<div>" + rendreMarkdown(c.q) + "</div>" +
        (devant ? '<span class="indice">Toucher pour retourner</span>' : "") + "</div>" +
        '<div class="face face-verso"><span class="etiquette">Réponse</span><div>' + rendreMarkdown(c.r) + "</div></div>" +
        "</" + balise + ">";
    }

    function finSerie() {
      dessinerCompteur();
      const n = compter();
      scene.innerHTML = '<div class="cartes-fin"><h3>Fin de la série</h3><p>' + n.ok + " sue" + (n.ok > 1 ? "s" : "") + ", " + n.non + " à revoir." +
        '</p><p><button class="bouton bouton-primaire" type="button" id="recommencer">Recommencer</button> ' +
        (n.non ? '<button class="bouton" type="button" id="revoir-seulement">Revoir les ' + n.non + " à revoir</button>" : "") + "</p></div>";
      document.getElementById("recommencer").addEventListener("click", function () { position = 0; dessinerCarte(); });
      const b = document.getElementById("revoir-seulement");
      if (b) b.addEventListener("click", function () {
        seulementARevoir = true; document.getElementById("filtre-revoir").checked = true; position = 0; dessinerCarte();
      });
    }

    function dessinerCarte(entree) {
      const l = liste();
      dessinerCompteur();
      if (!l.length) {
        scene.innerHTML = '<div class="cartes-fin"><h3>' + (seulementARevoir ? "Rien à revoir !" : "Aucune carte") + "</h3><p>" +
          (seulementARevoir ? "Toutes les cartes marquées « à revoir » ont été revues. Décoche le filtre pour tout reprendre." : "") + "</p></div>";
        return;
      }
      if (position >= l.length) position = l.length - 1;
      const c = l[position];
      const suivante = l[position + 1];
      scene.innerHTML =
        '<div class="carte-pile">' +
        (suivante ? '<div class="carte-enveloppe arriere" id="arriere">' + htmlCarte(suivante, false) + "</div>" : "") +
        '<div class="carte-enveloppe avant" id="avant">' + htmlCarte(c, true) + "</div>" +
        "</div>" +
        '<div class="cartes-reponses"><button class="bouton bouton-non" type="button" id="non">À revoir</button><button class="bouton bouton-ok" type="button" id="ok">Je sais</button></div>' +
        '<div class="cartes-nav"><button class="bouton bouton-petit" type="button" id="precedent"' + (position === 0 ? " disabled" : "") + '>← Précédente</button>' +
        '<span class="aide">Espace : retourner · 1 : à revoir · 2 : je sais</span>' +
        '<button class="bouton bouton-petit" type="button" id="suivant"' + (position >= l.length - 1 ? " disabled" : "") + ">Suivante →</button></div>" +
        (estMobile() ? '<p class="cartes-astuce">Touche la carte pour la retourner · balaye pour changer de carte</p>' : "");
      rendreFormules(scene);
      const avant = document.getElementById("avant");
      const carte = document.getElementById("carte");
      if (retournee) carte.classList.add("retournee");
      installerBalayage(avant, carte);
      carte.addEventListener("click", retourner);
      document.getElementById("non").addEventListener("click", function () { marquer("revoir"); });
      document.getElementById("ok").addEventListener("click", function () { marquer("su"); });
      document.getElementById("precedent").addEventListener("click", function () { aller(position - 1, true); });
      document.getElementById("suivant").addEventListener("click", function () { aller(position + 1, true); });
      if (entree && !reduitMouvement()) {
        avant.style.transition = "none";
        avant.style.transform = "translateX(-115%) rotate(-8deg)";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { avant.style.transition = ""; avant.style.transform = ""; });
        });
      }
    }

    /* Envoie la carte du dessus hors de l'écran, la suivante prend sa place. */
    function envoyer(direction, apres) {
      const avant = document.getElementById("avant");
      if (!avant || reduitMouvement()) { apres(); return; }
      const arriere = document.getElementById("arriere");
      avant.style.transition = "transform .3s cubic-bezier(.4,0,.8,.4), opacity .3s ease-in";
      avant.style.transform = "translateX(" + (direction * 125) + "%) rotate(" + (direction * 13) + "deg)";
      avant.style.opacity = "0";
      if (arriere) {
        arriere.style.transition = "transform .3s cubic-bezier(.2,.7,.3,1), opacity .3s ease-out";
        arriere.style.transform = "none";
        arriere.style.opacity = "1";
      }
      setTimeout(apres, 285);
    }

    function retourner() {
      retournee = !retournee;
      document.getElementById("carte").classList.toggle("retournee", retournee);
    }

    /* Balayage : la carte suit le doigt, puis part si le geste est assez ample. */
    function installerBalayage(avant, carte) {
      if (!avant || !carte) return;
      const arriere = document.getElementById("arriere");
      let x0 = 0, y0 = 0, dx = 0, actif = false, glisse = false;

      avant.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) return;
        x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
        dx = 0; actif = true; glisse = false;
      }, { passive: true });

      avant.addEventListener("touchmove", function (e) {
        if (!actif) return;
        dx = e.touches[0].clientX - x0;
        const dy = e.touches[0].clientY - y0;
        if (!glisse && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
          glisse = true;
          avant.style.transition = "none";
          if (arriere) arriere.style.transition = "none";
        }
        if (!glisse) return;
        avant.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 26) + "deg)";
        const p = Math.min(Math.abs(dx) / 140, 1);
        if (arriere) arriere.style.transform = "scale(" + (0.94 + 0.06 * p) + ") translateY(" + (20 - 20 * p) + "px)";
      }, { passive: true });

      avant.addEventListener("touchend", function () {
        if (!actif) return;
        actif = false;
        if (!glisse) return;
        /* Un balayage ne doit pas retourner la carte */
        carte.addEventListener("click", function bloque(ev) {
          ev.stopPropagation(); ev.preventDefault();
          carte.removeEventListener("click", bloque, true);
        }, true);
        const l = liste();
        avant.style.transition = "";
        if (arriere) arriere.style.transition = "";
        if (dx < -60 && position < l.length - 1) { aller(position + 1, true); return; }
        if (dx > 60 && position > 0) { aller(position - 1, true); return; }
        /* Geste trop court : la carte revient en place */
        avant.style.transform = "";
        if (arriere) arriere.style.transform = "";
      });
    }

    function aller(p, anime) {
      const l = liste();
      if (p < 0 || p >= l.length) return;
      if (anime && p === position + 1) {
        envoyer(-1, function () { position = p; retournee = false; dessinerCarte(); });
      } else if (anime && p === position - 1) {
        envoyer(1, function () { position = p; retournee = false; dessinerCarte(); });
      } else {
        position = p; retournee = false; dessinerCarte();
      }
    }
    function marquer(valeur) {
      const l = liste();
      if (!l.length) return;
      etats[l[position].cle] = valeur;
      ecrireEtats(chap, etats);
      retournee = false;
      if (seulementARevoir && valeur === "su") { envoyer(-1, function () { dessinerCarte(); }); return; }
      if (position < l.length - 1) { envoyer(-1, function () { position++; dessinerCarte(); }); return; }
      envoyer(-1, finSerie);
    }
    function melanger() {
      for (let i = ordre.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = ordre[i]; ordre[i] = ordre[j]; ordre[j] = t;
      }
      position = 0; retournee = false; dessinerCarte();
    }

    document.getElementById("filtre-revoir").addEventListener("change", function () {
      seulementARevoir = this.checked; position = 0; retournee = false; dessinerCarte();
    });
    document.getElementById("melanger").addEventListener("click", melanger);
    document.getElementById("reinitialiser").addEventListener("click", function () {
      if (!confirm("Effacer ta progression sur les cartes de ce chapitre ?")) return;
      etats = {}; ecrireEtats(chap, etats); position = 0; retournee = false; dessinerCarte();
    });
    document.addEventListener("keydown", function raccourcis(e) {
      if (!document.getElementById("scene")) { document.removeEventListener("keydown", raccourcis); return; }
      if (e.target.matches("input, textarea")) return;
      if (e.key === " ") { e.preventDefault(); if (document.getElementById("carte")) retourner(); }
      else if (e.key === "1") marquer("revoir");
      else if (e.key === "2") marquer("su");
      else if (e.key === "ArrowLeft") aller(position - 1);
      else if (e.key === "ArrowRight") aller(position + 1);
    });
    dessinerCarte();
  }

  /* ---------- Quiz : QCM et petits exercices à faire de tête ---------- */
  function lireEtatsQuiz(chap) {
    try { return JSON.parse(localStorage.getItem("quiz:" + chap.id) || "{}"); } catch (e) { return {}; }
  }
  function ecrireEtatsQuiz(chap, etats) {
    try { localStorage.setItem("quiz:" + chap.id, JSON.stringify(etats)); } catch (e) { /* stockage indisponible */ }
  }

  /* Un nombre écrit de n'importe quelle façon : 3,2 × 10⁻³ · 3.2e-3 · 0,0032 */
  function versNombre(texte) {
    const t = normaliser(texte).replace(/\s/g, "").replace(/,/g, ".")
      .replace(/x10\^?/g, "e").replace(/\*10\^?/g, "e");
    return /^-?\d+(\.\d+)?(e-?\+?\d+)?$/.test(t) ? Number(t) : null;
  }
  /* Comparaison souple : accents, espaces, tirets, articles et états physiques ignorés */
  function normaliserReponse(texte) {
    return normaliser(texte)
      .replace(/\((aq|s|g|l)\)/g, "")
      .replace(/^(les|le|la|l|un|une|des|de|d)\s+/, "")
      .replace(/[\s'’\-–—_.,;:!?()]/g, "");
  }
  function reponseJuste(donnee, attendues) {
    const n = versNombre(donnee);
    for (let i = 0; i < attendues.length; i++) {
      const a = attendues[i];
      const na = versNombre(a);
      if (n !== null && na !== null) {
        if (Math.abs(n - na) <= Math.max(Math.abs(na) * 0.011, 1e-12)) return true;
      } else if (normaliserReponse(donnee) === normaliserReponse(a)) return true;
    }
    return false;
  }

  function afficherQuiz(zone, chap, questions) {
    const toutes = questions.map(function (q, i) {
      const copie = {};
      Object.keys(q).forEach(function (k) { copie[k] = q[k]; });
      copie.cle = hacher(q.q);
      copie.rang = i;
      return copie;
    });
    let etats = lireEtatsQuiz(chap);
    let ordre = toutes.slice();
    let position = 0;
    let seulementRatees = false;
    let serie = { juste: 0, faites: 0 };

    zone.innerHTML =
      '<div class="quiz">' +
      '<div class="quiz-tete"><div class="quiz-compteur" id="quiz-compteur"></div>' +
      '<div class="cartes-actions"><label><input type="checkbox" id="filtre-ratees"> ' + (estMobile() ? "Ratées" : "Seulement les ratées") + '</label>' +
      '<button class="bouton bouton-petit" type="button" id="quiz-melanger">Mélanger</button>' +
      '<button class="bouton bouton-petit" type="button" id="quiz-reset">Réinitialiser</button></div></div>' +
      '<div class="barre" id="quiz-barre"></div>' +
      '<div id="quiz-zone"></div></div>';

    const zoneQ = document.getElementById("quiz-zone");

    function liste() {
      return seulementRatees ? ordre.filter(function (q) { return etats[q.cle] === "faux"; }) : ordre;
    }
    function compter() {
      let ok = 0, faux = 0;
      toutes.forEach(function (q) { if (etats[q.cle] === "ok") ok++; else if (etats[q.cle] === "faux") faux++; });
      return { ok: ok, faux: faux, total: toutes.length };
    }
    function dessinerCompteur() {
      const n = compter();
      const l = liste();
      document.getElementById("quiz-compteur").innerHTML =
        "<span>Question " + (l.length ? Math.min(position + 1, l.length) : 0) + " / " + l.length + "</span>" +
        '<span class="ok">' + n.ok + " réussie" + (n.ok > 1 ? "s" : "") + "</span>" +
        '<span class="non">' + n.faux + " à refaire</span>";
      const pOk = n.total ? (100 * n.ok / n.total) : 0;
      const pFaux = n.total ? (100 * n.faux / n.total) : 0;
      document.getElementById("quiz-barre").innerHTML =
        '<div class="ok" style="width:' + pOk + '%"></div><div class="non" style="width:' + pFaux + '%"></div>';
    }

    function dessiner() {
      const l = liste();
      dessinerCompteur();
      if (!l.length) {
        zoneQ.innerHTML = '<div class="cartes-fin"><h3>' + (seulementRatees ? "Rien à refaire !" : "Aucune question") + "</h3><p>" +
          (seulementRatees ? "Tu as repris toutes les questions ratées. Décoche le filtre pour refaire la série entière." : "") + "</p></div>";
        return;
      }
      if (position >= l.length) position = l.length - 1;
      const q = l[position];
      const etiquette = q.type === "saisie" ? "Exercice" : (q.piege ? "Attention au piège" : "Question");
      let html = '<div class="quiz-carte"><span class="quiz-etiquette' + (q.piege ? " piege" : "") + '">' + etiquette + "</span>" +
        '<div class="quiz-question">' + rendreMarkdown(q.q) + "</div>";
      if (q.type === "saisie") {
        html += '<form class="quiz-saisie" id="quiz-forme" autocomplete="off">' +
          '<input class="champ" type="text" id="quiz-champ" placeholder="Ta réponse…" aria-label="Ta réponse" ' +
          'autocapitalize="off" autocorrect="off" spellcheck="false">' +
          '<button class="bouton bouton-primaire" type="submit">Valider</button></form>';
      } else {
        html += '<div class="quiz-choix" id="quiz-choix">' + q.choix.map(function (c, i) {
          return '<button class="quiz-choix-bouton" type="button" data-i="' + i + '">' +
            '<span class="quiz-lettre">' + "ABCDEF".charAt(i) + "</span><span>" + rendreEnLigne(c) + "</span></button>";
        }).join("") + "</div>";
      }
      html += '<div id="quiz-retour"></div></div>';
      zoneQ.innerHTML = html;
      rendreFormules(zoneQ);

      if (q.type === "saisie") {
        document.getElementById("quiz-forme").addEventListener("submit", function (e) {
          e.preventDefault();
          const donnee = document.getElementById("quiz-champ").value.trim();
          if (!donnee) return;
          corriger(q, reponseJuste(donnee, q.reponses), donnee);
        });
      } else {
        Array.prototype.forEach.call(document.querySelectorAll(".quiz-choix-bouton"), function (b) {
          b.addEventListener("click", function () { corriger(q, Number(b.dataset.i) === q.bonne, null, Number(b.dataset.i)); });
        });
      }
    }

    function corriger(q, juste, donnee, choisi) {
      etats[q.cle] = juste ? "ok" : "faux";
      ecrireEtatsQuiz(chap, etats);
      serie.faites++;
      if (juste) serie.juste++;
      dessinerCompteur();

      if (q.type === "saisie") {
        const champ = document.getElementById("quiz-champ");
        champ.disabled = true;
        champ.classList.add(juste ? "juste" : "faux");
        document.querySelector("#quiz-forme button").hidden = true;
      } else {
        Array.prototype.forEach.call(document.querySelectorAll(".quiz-choix-bouton"), function (b) {
          const i = Number(b.dataset.i);
          b.disabled = true;
          if (i === q.bonne) b.classList.add("juste");
          else if (i === choisi) b.classList.add("faux");
        });
      }

      const solution = q.type === "saisie" ? (q.solution || q.reponses[0]) : q.choix[q.bonne];
      const l = liste();
      const dernier = position >= l.length - 1;
      document.getElementById("quiz-retour").innerHTML =
        '<div class="quiz-verdict ' + (juste ? "juste" : "faux") + '">' +
        "<strong>" + (juste ? "Bonne réponse" : "Faux") + "</strong>" +
        (juste ? "" : " — la réponse attendue était : <em>" + rendreEnLigne(solution) + "</em>") + "</div>" +
        '<div class="quiz-explication">' + rendreMarkdown(q.explication) + "</div>" +
        '<div class="quiz-suite"><button class="bouton bouton-primaire" type="button" id="quiz-suivante">' +
        (dernier ? "Voir le résultat" : "Question suivante →") + "</button></div>";
      rendreFormules(document.getElementById("quiz-retour"));
      const suivante = document.getElementById("quiz-suivante");
      suivante.addEventListener("click", function () {
        if (dernier) { finQuiz(); return; }
        position++; dessiner();
        zoneQ.scrollIntoView({ block: "start", behavior: "smooth" });
      });
      suivante.focus({ preventScroll: true });
    }

    function finQuiz() {
      dessinerCompteur();
      const n = compter();
      const note = serie.faites ? Math.round(100 * serie.juste / serie.faites) : 0;
      let mot = "À retravailler";
      if (note >= 90) mot = "Excellent";
      else if (note >= 70) mot = "Bien";
      else if (note >= 50) mot = "Moyen";
      zoneQ.innerHTML = '<div class="cartes-fin"><h3>' + serie.juste + " / " + serie.faites + " — " + mot + "</h3>" +
        "<p>Sur l'ensemble du chapitre : " + n.ok + " question" + (n.ok > 1 ? "s" : "") + " réussie" + (n.ok > 1 ? "s" : "") +
        ", " + n.faux + " à refaire.</p>" +
        '<p><button class="bouton bouton-primaire" type="button" id="quiz-recommencer">Recommencer</button> ' +
        (n.faux ? '<button class="bouton" type="button" id="quiz-ratees">Refaire les ' + n.faux + " ratée" + (n.faux > 1 ? "s" : "") + "</button>" : "") + "</p></div>";
      document.getElementById("quiz-recommencer").addEventListener("click", function () {
        position = 0; serie = { juste: 0, faites: 0 }; dessiner();
      });
      const b = document.getElementById("quiz-ratees");
      if (b) b.addEventListener("click", function () {
        seulementRatees = true; document.getElementById("filtre-ratees").checked = true;
        position = 0; serie = { juste: 0, faites: 0 }; dessiner();
      });
    }

    document.getElementById("filtre-ratees").addEventListener("change", function () {
      seulementRatees = this.checked; position = 0; serie = { juste: 0, faites: 0 }; dessiner();
    });
    document.getElementById("quiz-melanger").addEventListener("click", function () {
      for (let i = ordre.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = ordre[i]; ordre[i] = ordre[j]; ordre[j] = t;
      }
      position = 0; serie = { juste: 0, faites: 0 }; dessiner();
    });
    document.getElementById("quiz-reset").addEventListener("click", function () {
      if (!confirm("Effacer ta progression sur le quiz de ce chapitre ?")) return;
      etats = {}; ecrireEtatsQuiz(chap, etats); position = 0; serie = { juste: 0, faites: 0 }; dessiner();
    });

    dessiner();
  }

  /* ---------- Recherche ---------- */
  function afficherRecherche(requete) {
    document.title = "Recherche · Physique-Chimie";
    masquerBarreOnglets();
    principal.innerHTML = '<section class="accueil-tete"><p class="fil"><a href="#/">Accueil</a> › Recherche</p><h1>Rechercher</h1>' +
      '<form class="recherche-forme" id="forme-recherche" role="search"><input type="search" name="q" value="' + echapper(requete) + '" placeholder="Un mot, une formule, une notion…" aria-label="Rechercher" autofocus><button class="bouton bouton-primaire" type="submit">Chercher</button></form></section>' +
      '<div class="resultats" id="resultats"></div>';
    document.getElementById("forme-recherche").addEventListener("submit", function (e) {
      e.preventDefault();
      const q = this.elements.q.value.trim();
      location.hash = "#/recherche" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
    const zone = document.getElementById("resultats");
    if (!requete.trim()) { zone.innerHTML = '<p class="note-etat">Tape un mot-clé : la recherche parcourt les cours, le vocabulaire, les fiches et les cartes de tous les chapitres.</p>'; return; }
    const groupes = chercher(requete);
    if (!groupes.length) { zone.innerHTML = '<p class="vide">Aucun résultat pour « ' + echapper(requete) + " ».</p>"; return; }
    zone.innerHTML = groupes.map(function (g) {
      return '<div class="resultat-groupe"><h2>' + echapper(g.chap.titre) + " <span>· " + echapper(MATIERES[g.chap.matiere].nom) + "</span></h2>" +
        g.resultats.map(function (r) {
          return '<a class="resultat" href="' + r.lien + '"><span class="ou">' + echapper(r.ou) + '</span><p class="extrait">' + r.extrait + "</p></a>";
        }).join("") + "</div>";
    }).join("");
  }

  function chercher(requete) {
    const q = normaliser(requete.trim());
    if (!q) return [];
    const groupes = [];
    CHAPITRES.forEach(function (chap) {
      const donnees = CONTENU[chap.id] || {};
      const resultats = [];
      chap.fichiers.forEach(function (type) {
        const valeur = donnees[type];
        if (valeur === undefined) return;
        if (type === "cours" || type === "donnees" || type === "fiche") {
          /* Découpe par section pour pointer vers le bon endroit */
          const sections = String(valeur).split(/^(?=#{2,3}\s)/m);
          let trouves = 0;
          sections.forEach(function (sec) {
            if (trouves >= 4) return;
            const titreM = sec.match(/^#{2,3}\s+(.*)$/m);
            const titre = titreM ? titreM[1].trim() : "";
            const brut = texteBrut(sec);
            const idx = normaliser(brut).indexOf(q);
            if (idx < 0) return;
            trouves++;
            resultats.push({
              ou: TYPES[type] + (titre ? " · " + texteBrut(titre) : ""),
              lien: lienChapitre(chap, type, titre ? slug(texteBrut(titre)) : ""),
              extrait: extraireNormalise(brut, q, idx, requete),
            });
          });
        } else if (type === "vocabulaire") {
          valeur.forEach(function (t) {
            const brut = texteBrut(t.terme + " — " + t.definition);
            const idx = normaliser(brut).indexOf(q);
            if (idx >= 0) resultats.push({ ou: "Vocabulaire", lien: lienChapitre(chap, type), extrait: extraireNormalise(brut, q, idx, requete) });
          });
        } else if (type === "quiz") {
          let trouves = 0;
          valeur.forEach(function (question) {
            if (trouves >= 3) return;
            const brut = texteBrut(question.q + " " + (question.explication || ""));
            const idx = normaliser(brut).indexOf(q);
            if (idx >= 0) { trouves++; resultats.push({ ou: "Quiz", lien: lienChapitre(chap, type), extrait: extraireNormalise(brut, q, idx, requete) }); }
          });
        } else if (type === "cartes") {
          let trouves = 0;
          valeur.forEach(function (c) {
            if (trouves >= 3) return;
            const brut = texteBrut(c.q + " → " + c.r);
            const idx = normaliser(brut).indexOf(q);
            if (idx >= 0) { trouves++; resultats.push({ ou: "Carte mémo", lien: lienChapitre(chap, type), extrait: extraireNormalise(brut, q, idx, requete) }); }
          });
        }
      });
      if (resultats.length) groupes.push({ chap: chap, resultats: resultats });
    });
    return groupes;
  }

  function extraireNormalise(brut, q, idxNormalise, requete) {
    /* L'index est calculé sur le texte normalisé ; les longueurs peuvent différer un peu
       (accents décomposés). On cherche donc l'extrait autour de l'index, puis on surligne
       en ignorant les accents et la casse. */
    const debut = Math.max(0, idxNormalise - 70);
    const fin = Math.min(brut.length, idxNormalise + q.length + 110);
    const morceau = (debut > 0 ? "… " : "") + brut.slice(debut, fin) + (fin < brut.length ? " …" : "");
    /* surlignage tolérant : on compare caractère normalisé par caractère normalisé */
    let sortie = "";
    let i = 0;
    while (i < morceau.length) {
      let j = i, k = 0, ok = true;
      while (k < q.length && j < morceau.length) {
        const cn = normaliser(morceau[j]);
        if (cn.length === 0) { j++; continue; }
        if (q.substr(k, cn.length) !== cn) { ok = false; break; }
        k += cn.length; j++;
      }
      if (ok && k >= q.length && j > i) { sortie += "<mark>" + echapper(morceau.slice(i, j)) + "</mark>"; i = j; }
      else { sortie += echapper(morceau[i]); i++; }
    }
    return sortie;
  }

  function afficherIntrouvable() {
    document.title = "Page introuvable";
    masquerBarreOnglets();
    principal.innerHTML = '<p class="fil"><a href="#/">Accueil</a></p><h1>Page introuvable</h1><p class="note-etat">Ce chapitre n\'existe pas (ou pas encore).</p>';
  }

  /* ---------- Hors ligne (service worker, seulement en https) ---------- */
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").then(function () {
      const etat = document.getElementById("pied-etat");
      if (etat) etat.textContent = "Disponible hors ligne.";
    }).catch(function () { /* pas grave */ });
  }

  /* ---------- Démarrage ---------- */
  chargerContenu(function () {
    window.addEventListener("hashchange", naviguer);
    if (petitEcran.addEventListener) petitEcran.addEventListener("change", naviguer);
    naviguer();
  });
})();
