/* ============================================================================
 *  projects.js  —  the ONLY file you edit to manage your portfolio.
 * ----------------------------------------------------------------------------
 *  To add a project, copy one { ... } block into the `projects` array below.
 *  Order does not matter — the page sorts itself (default: newest first).
 *
 *  Fields per project:
 *    title        (required)  Display name shown on the card.
 *    repo         (required)  GitHub repo name under `owner`. The "Code" link
 *                             is built as  https://github.com/<owner>/<repo>
 *    description  (required)  One sentence describing the project.
 *    updated      (required)  Last-updated date, "YYYY-MM-DD".
 *    site         (optional)  Live URL. If omitted, it defaults to
 *                             https://<owner-lowercase>.github.io/<repo>/
 *                             Set it explicitly for custom domains.
 *    tags         (optional)  Array of short strings shown as little pills.
 *    private      (optional)  true if the GitHub repo is private. Adds a small
 *                             lock on the "Code" link (the link still works for
 *                             you when you're signed in to GitHub).
 * ========================================================================== */

window.PORTFOLIO = {
  owner: "MagitekZed",
  title: "Zach's Projects",
  subtitle: "A hub linking to all of my live web projects.",

  projects: [
    {
      title: "PDF Splitter",
      repo: "PDF-Splitter",
      site: "https://magitekzed.github.io/PDF-Splitter/",
      description: "Fully in-browser, private PDF splitter that slices big PDFs — like RPG sourcebooks — into token-sized chunks ready to feed an AI.",
      updated: "2026-06-30",
      tags: ["pdf", "tabletop", "ai"],
      private: false,
    },
    {
      title: "YouTube Roulette",
      repo: "ytroulette",
      site: "https://magitekzed.github.io/ytroulette/",
      description: "Jackbox-style multiplayer party game where players search YouTube with random terms, pick the weirdest videos, and vote to win.",
      updated: "2026-06-23",
      tags: ["party game", "multiplayer", "supabase"],
      private: false,
    },
    {
      title: "MCU Multiverse Timeline",
      repo: "mcu-timeline",
      site: "https://magitekzed.github.io/mcu-timeline/",
      description: "Interactive Marvel Cinematic Universe explorer charting characters across in-universe and release-order timelines, with crossovers and canon status.",
      updated: "2026-06-21",
      tags: ["marvel", "timeline", "react"],
      private: true,
    },
    {
      title: "Maze Walker",
      repo: "Maze-Walker",
      site: "https://magitekzed.github.io/Maze-Walker/",
      description: "Isometric procedural roguelike where your torchlight is vision, time, and health as you descend 12 seeded mazes to steal an idol.",
      updated: "2026-06-19",
      tags: ["roguelike", "three.js", "game"],
      private: true,
    },
    {
      title: "D&D Nexus",
      repo: "DnD-Toolkit",
      site: "https://magitekzed.github.io/DnD-Toolkit/",
      description: "Real-time dual-view DM toolkit for D&D 5e: run combat, track initiative, push maps and audio to players, and take campaign notes.",
      updated: "2026-06-15",
      tags: ["dnd", "tabletop", "supabase"],
      private: true,
    },
    {
      title: "Anime Tracker",
      repo: "Anime-Tracker",
      site: "https://magitekzed.github.io/Anime-Tracker/",
      description: "Personal anime watch-log and watchlist with ratings, status filters, and a taste profile, all in a single dark-themed page.",
      updated: "2026-06-30",
      tags: ["anime", "tracker", "watchlist"],
      private: true,
    },
    {
      title: "My Library",
      repo: "my-library",
      site: "https://magitekzed.github.io/my-library/",
      description: "Offline reading library built from a Goodreads export, with stats, insights, cover art, series tracking, and per-universe timelines.",
      updated: "2026-06-08",
      tags: ["books", "goodreads", "spa"],
      private: true,
    },
    {
      title: "StarWiki",
      repo: "Star-Wiki",
      site: "https://magitekzed.github.io/Star-Wiki/",
      description: "Explore Wikipedia as a 3D starfield, flying article to article along related-link rays and mapping your journey as a constellation.",
      updated: "2026-05-29",
      tags: ["wikipedia", "three.js", "visualization"],
      private: false,
    },
    {
      title: "BB3 League Tracker",
      repo: "BB3-Tracker",
      site: "https://magitekzed.github.io/BB3-Tracker/",
      description: "Web app for running in-person Blood Bowl (BB2025) leagues: standings, teams, treasury, schedules, live match tracking and a rules glossary.",
      updated: "2026-03-20",
      tags: ["blood bowl", "league tracker", "tabletop"],
      private: false,
    },
    {
      title: "Chain Games",
      repo: "Chain-Games",
      site: "https://magitekzed.github.io/Chain-Games/",
      description: "Disc golf scoring app with alternative game modes for tracking rounds and playing friendly variant games.",
      updated: "2026-01-22",
      tags: ["disc golf", "scorekeeper", "sports"],
      private: false,
    },
    {
      title: "Country Outliner",
      repo: "Country-Outliner",
      site: "https://magitekzed.github.io/Country-Outliner/",
      description: "Pick any country and watch its border outline draw itself in animated, GPU-rendered WebGL with neon, blueprint, and wireframe glow themes.",
      updated: "2025-11-02",
      tags: ["webgl", "three.js", "maps"],
      private: true,
    },
    {
      title: "NMS Refiner",
      repo: "NMS-Refiner",
      site: "https://magitekzed.github.io/NMS-Refiner/",
      description: "No Man's Sky refiner recipe lookup tool with item selectors, a crafting progression ladder, and reverse product-to-inputs search.",
      updated: "2025-09-14",
      tags: ["no man's sky", "gaming", "recipe tool"],
      private: true,
    },
    {
      title: "NMS Trade Route Tracker",
      repo: "NMS-Economist",
      site: "https://magitekzed.github.io/NMS-Economist/",
      description: "Local-only tracker that logs No Man's Sky systems, economies, and prices to auto-build optimized trade routes with export and shareable URLs.",
      updated: "2025-09-12",
      tags: ["no man's sky", "gaming", "tracker"],
      private: true,
    },
  ],
};
