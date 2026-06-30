/* app.js — rendering, sorting, search, and theme for the portfolio page.
 * You normally never need to touch this file; edit projects.js instead. */
(function () {
  "use strict";

  var CFG = window.PORTFOLIO || { owner: "", title: "Projects", subtitle: "", projects: [] };
  var OWNER = CFG.owner || "";
  var PROJECTS = Array.isArray(CFG.projects) ? CFG.projects.slice() : [];

  var LS = {
    sortKey: "portfolio.sortKey",
    sortDir: "portfolio.sortDir",
    theme: "portfolio.theme",
  };

  /* ---- state ---- */
  var state = {
    sortKey: load(LS.sortKey, "updated"),   // "updated" | "title"
    sortDir: load(LS.sortDir, "desc"),      // "asc" | "desc"
    query: "",
  };
  if (state.sortKey !== "updated" && state.sortKey !== "title") state.sortKey = "updated";
  if (state.sortDir !== "asc" && state.sortDir !== "desc") state.sortDir = "desc";

  /* ---- icons ---- */
  var ICON = {
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
    lock: '<svg class="lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    check: '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>',
  };

  /* ---- helpers ---- */
  function load(k, dflt) { try { var v = localStorage.getItem(k); return v === null ? dflt : v; } catch (e) { return dflt; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function siteUrl(p) {
    if (p.site) return p.site;
    return "https://" + OWNER.toLowerCase() + ".github.io/" + p.repo + "/";
  }
  function repoUrl(p) {
    if (p.repoUrl) return p.repoUrl;
    return "https://github.com/" + OWNER + "/" + p.repo;
  }

  function relTime(dateStr) {
    var d = new Date(dateStr + "T00:00:00");
    if (isNaN(d)) return "";
    var now = new Date();
    var days = Math.floor((now - d) / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return days + " days ago";
    if (days < 14) return "1 week ago";
    if (days < 31) return Math.floor(days / 7) + " weeks ago";
    if (days < 61) return "1 month ago";
    if (days < 365) return Math.floor(days / 30) + " months ago";
    var yrs = Math.floor(days / 365);
    return yrs === 1 ? "1 year ago" : yrs + " years ago";
  }
  function absDate(dateStr) {
    var d = new Date(dateStr + "T00:00:00");
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function matches(p, q) {
    if (!q) return true;
    var hay = [p.title, p.description, p.repo].concat(p.tags || []).join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (term) { return hay.indexOf(term) !== -1; });
  }

  function compare(a, b) {
    var r;
    if (state.sortKey === "title") {
      r = String(a.title).localeCompare(String(b.title), undefined, { sensitivity: "base" });
    } else {
      r = String(a.updated || "").localeCompare(String(b.updated || ""));
    }
    return state.sortDir === "asc" ? r : -r;
  }

  /* ---- rendering ---- */
  function cardHtml(p) {
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    var lock = p.private ? ICON.lock : "";
    var rel = relTime(p.updated);
    var abs = absDate(p.updated);
    return (
      '<article class="card">' +
        "<h2>" + esc(p.title) + "</h2>" +
        '<p class="desc">' + esc(p.description) + "</p>" +
        (tags ? '<div class="tags">' + tags + "</div>" : "") +
        '<div class="spacer"></div>' +
        '<div class="meta" title="Updated ' + esc(abs) + '">' + ICON.calendar +
          "<span>Updated " + esc(rel) + "</span></div>" +
        '<div class="links">' +
          '<a class="btn btn-primary" href="' + esc(siteUrl(p)) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(p.title) + ' live site">' +
            ICON.external + "<span>Live site</span></a>" +
          '<a class="btn btn-ghost" href="' + esc(repoUrl(p)) + '" target="_blank" rel="noopener" title="' +
            (p.private ? "Private repo — opens for you when signed in to GitHub" : "View source on GitHub") +
            '" aria-label="' + esc(p.title) + ' source code on GitHub">' +
            ICON.github + "<span>Code</span>" + lock + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function render() {
    var grid = document.getElementById("grid");
    var visible = PROJECTS.filter(function (p) { return matches(p, state.query); }).sort(compare);

    if (visible.length === 0) {
      grid.innerHTML = '<div class="empty">No projects match “' + esc(state.query) + "”.</div>";
    } else {
      grid.innerHTML = visible.map(cardHtml).join("");
    }

    var count = document.getElementById("count");
    var total = PROJECTS.length;
    count.textContent = state.query
      ? visible.length + " of " + total + " project" + (total === 1 ? "" : "s")
      : total + " project" + (total === 1 ? "" : "s");

    // sort UI sync
    Array.prototype.forEach.call(document.querySelectorAll(".segmented button"), function (b) {
      b.classList.toggle("active", b.getAttribute("data-sort") === state.sortKey);
    });
    var dir = document.getElementById("dir-btn");
    dir.setAttribute("data-dir", state.sortDir);
    var label;
    if (state.sortKey === "title") label = state.sortDir === "asc" ? "A → Z" : "Z → A";
    else label = state.sortDir === "asc" ? "Oldest first" : "Newest first";
    dir.setAttribute("title", label);
    dir.setAttribute("aria-label", "Sort direction: " + label);
  }

  /* ---- events ---- */
  function setSort(key) {
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc"; // re-click flips direction
    } else {
      state.sortKey = key;
      state.sortDir = key === "title" ? "asc" : "desc"; // sensible default per field
    }
    save(LS.sortKey, state.sortKey);
    save(LS.sortDir, state.sortDir);
    render();
  }
  function flipDir() {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    save(LS.sortDir, state.sortDir);
    render();
  }

  /* ---- themes ----
   * To add a theme: add a palette block in index.html under [data-theme="<key>"]
   * and add a matching entry here (key, label, and 3 preview swatch colors). */
  var THEMES = [
    { key: "midnight",  label: "Midnight",   dots: ["#181a23", "#818cf8", "#a78bfa"] },
    { key: "vaporwave", label: "Vapor Wave", dots: ["#241342", "#ff5fbf", "#34e0e0"] },
    { key: "forest",    label: "Forest",     dots: ["#14201a", "#34d399", "#a3e635"] },
    { key: "sunset",    label: "Sunset",     dots: ["#26171a", "#fb923c", "#f472b6"] },
    { key: "daylight",  label: "Daylight",   dots: ["#ffffff", "#6366f1", "#8b5cf6"] },
  ];
  var DEFAULT_THEME = "midnight";

  function validTheme(k) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].key === k) return true; return false; }
  function savedTheme() { var t = load(LS.theme, ""); return validTheme(t) ? t : DEFAULT_THEME; }
  function applyTheme(k) { document.documentElement.setAttribute("data-theme", validTheme(k) ? k : DEFAULT_THEME); }
  function setTheme(k) { applyTheme(k); save(LS.theme, k); markActiveTheme(k); }

  function markActiveTheme(k) {
    Array.prototype.forEach.call(document.querySelectorAll(".theme-opt"), function (b) {
      var on = b.getAttribute("data-theme-key") === k;
      b.classList.toggle("active", on);
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  function buildThemeMenu() {
    var pop = document.getElementById("theme-pop");
    if (!pop) return;
    pop.innerHTML = '<div class="head">Theme</div>' + THEMES.map(function (t) {
      var sw = t.dots.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("");
      return '<button type="button" class="theme-opt" role="menuitemradio" aria-checked="false" data-theme-key="' + t.key + '">' +
        '<span class="swatch">' + sw + "</span>" +
        '<span class="label">' + esc(t.label) + "</span>" +
        ICON.check + "</button>";
    }).join("");
    Array.prototype.forEach.call(pop.querySelectorAll(".theme-opt"), function (b) {
      b.addEventListener("click", function () { setTheme(b.getAttribute("data-theme-key")); closeThemeMenu(); });
    });
  }

  function onDocClick(e) { if (!e.target.closest(".theme-menu")) closeThemeMenu(); }
  function onKey(e) { if (e.key === "Escape") closeThemeMenu(); }
  function openThemeMenu() {
    var pop = document.getElementById("theme-pop");
    pop.hidden = false;
    document.getElementById("theme-btn").setAttribute("aria-expanded", "true");
    setTimeout(function () { document.addEventListener("click", onDocClick); document.addEventListener("keydown", onKey); }, 0);
  }
  function closeThemeMenu() {
    var pop = document.getElementById("theme-pop");
    pop.hidden = true;
    document.getElementById("theme-btn").setAttribute("aria-expanded", "false");
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
  }
  function toggleThemeMenu() {
    var pop = document.getElementById("theme-pop");
    if (pop.hidden) openThemeMenu(); else closeThemeMenu();
  }

  /* ---- init ---- */
  function init() {
    document.title = CFG.title || "Projects";
    var titleEl = document.getElementById("site-title");
    if (titleEl) titleEl.innerHTML = esc(CFG.title || "Projects").replace(/\.?$/, '<span class="dot">.</span>');
    var subEl = document.getElementById("site-sub");
    if (subEl) subEl.textContent = CFG.subtitle || "";
    var repoLink = document.getElementById("repo-link");
    if (repoLink) repoLink.href = "https://github.com/" + OWNER + "/Portfolio";

    buildThemeMenu();
    applyTheme(savedTheme());
    markActiveTheme(savedTheme());
    document.getElementById("theme-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      toggleThemeMenu();
    });

    document.getElementById("dir-btn").addEventListener("click", flipDir);
    Array.prototype.forEach.call(document.querySelectorAll(".segmented button"), function (b) {
      b.addEventListener("click", function () { setSort(b.getAttribute("data-sort")); });
    });
    var search = document.getElementById("search");
    search.addEventListener("input", function () { state.query = search.value.trim(); render(); });

    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
