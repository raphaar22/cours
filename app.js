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
  }

  function afficherCours(zone, chap, type, markdown, section) {
    zone.innerHTML = '<div class="cours-grille"><details class="sommaire" id="sommaire"><summary>Sommaire</summary></details>' +
      '<article class="article" id="article"></article></div>';
    const article = document.getElementById("article");
    article.innerHTML = rendreMarkdown(markdown);
    rendreFormules(article);
    construireSommaire(article, document.getElementById("sommaire"), chap, type);
    allerA(section);
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
    }
    dessiner("");
    document.getElementById("filtre-vocab").addEventListener("input", function () { dessiner(this.value); });
  }

  /* ---------- Fiche résumé ---------- */
  function afficherFiche(zone, chap, markdown, section) {
    zone.innerHTML = '<div class="fiche"><div class="fiche-outils"><button class="bouton bouton-petit" type="button" id="imprimer">Imprimer / PDF</button></div>' +
      '<div class="cours-grille"><details class="sommaire" id="sommaire"><summary>Sommaire</summary></details><article class="article" id="article"></article></div></div>';
    const article = document.getElementById("article");
    article.innerHTML = rendreMarkdown(markdown);
    rendreFormules(article);
    construireSommaire(article, document.getElementById("sommaire"), chap, "fiche");
    document.getElementById("imprimer").addEventListener("click", function () { window.print(); });
    allerA(section);
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
      '<div class="groupe"><label><input type="checkbox" id="filtre-revoir"> Seulement « à revoir »</label>' +
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
    function dessinerCarte() {
      const l = liste();
      dessinerCompteur();
      if (!l.length) {
        scene.innerHTML = '<div class="cartes-fin"><h3>' + (seulementARevoir ? "Rien à revoir !" : "Aucune carte") + "</h3><p>" +
          (seulementARevoir ? "Toutes les cartes marquées « à revoir » ont été revues. Décoche le filtre pour tout reprendre." : "") + "</p></div>";
        return;
      }
      if (position >= l.length) position = l.length - 1;
      const c = l[position];
      const etat = etats[c.cle];
      const badge = etat === "su" ? '<span class="etat ok">Sue</span>' : etat === "revoir" ? '<span class="etat non">À revoir</span>' : "";
      scene.innerHTML =
        '<div class="carte-scene"><button class="carte' + (retournee ? " retournee" : "") + '" type="button" id="carte" aria-label="Retourner la carte">' +
        '<div class="face face-recto"><span class="etiquette">Question</span>' + badge + '<div>' + rendreMarkdown(c.q) + '</div><span class="indice">Toucher pour retourner</span></div>' +
        '<div class="face face-verso"><span class="etiquette">Réponse</span><div>' + rendreMarkdown(c.r) + "</div></div>" +
        "</button></div>" +
        '<div class="cartes-reponses"><button class="bouton bouton-non" type="button" id="non">À revoir</button><button class="bouton bouton-ok" type="button" id="ok">Je sais</button></div>' +
        '<div class="cartes-nav"><button class="bouton bouton-petit" type="button" id="precedent"' + (position === 0 ? " disabled" : "") + '>← Précédente</button>' +
        '<span class="aide">Espace : retourner · 1 : à revoir · 2 : je sais</span>' +
        '<button class="bouton bouton-petit" type="button" id="suivant"' + (position >= l.length - 1 ? " disabled" : "") + ">Suivante →</button></div>";
      rendreFormules(scene);
      document.getElementById("carte").addEventListener("click", retourner);
      document.getElementById("non").addEventListener("click", function () { marquer("revoir"); });
      document.getElementById("ok").addEventListener("click", function () { marquer("su"); });
      document.getElementById("precedent").addEventListener("click", function () { aller(position - 1); });
      document.getElementById("suivant").addEventListener("click", function () { aller(position + 1); });
    }
    function retourner() {
      retournee = !retournee;
      document.getElementById("carte").classList.toggle("retournee", retournee);
    }
    function aller(p) {
      const l = liste();
      if (p < 0 || p >= l.length) return;
      position = p; retournee = false; dessinerCarte();
    }
    function marquer(valeur) {
      const l = liste();
      if (!l.length) return;
      etats[l[position].cle] = valeur;
      ecrireEtats(chap, etats);
      retournee = false;
      if (seulementARevoir && valeur === "su") { dessinerCarte(); return; }
      if (position < l.length - 1) position++;
      else {
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
        return;
      }
      dessinerCarte();
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

  /* ---------- Recherche ---------- */
  function afficherRecherche(requete) {
    document.title = "Recherche · Physique-Chimie";
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
    naviguer();
  });
})();
