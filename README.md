# Portfolio

A single-page hub that links to all of my projects and their GitHub Pages sites.
Live at **https://magitekzed.github.io/Portfolio/**.

It's plain HTML/CSS/JS — no build step, no dependencies. GitHub Pages serves the
files directly.

## Adding a new project

Edit **[`projects.js`](projects.js)** and add one block to the `projects` array:

```js
{
  title: "My New Thing",
  repo: "My-New-Thing",          // GitHub repo name (the "Code" link is built from this)
  description: "One sentence about what it does.",
  updated: "2026-07-01",         // YYYY-MM-DD
  // optional:
  site: "https://magitekzed.github.io/My-New-Thing/",  // omit to auto-derive from repo
  tags: ["webgl", "game"],
  private: true,                  // adds a small lock on the Code link
},
```

Order doesn't matter — the page sorts itself. Commit and push; Pages redeploys
automatically.

### Field reference

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Display name on the card. |
| `repo` | yes | Repo name under the owner. Code link = `https://github.com/<owner>/<repo>`. |
| `description` | yes | One sentence. |
| `updated` | yes | `YYYY-MM-DD`. Drives the "Updated …" line and the default sort. |
| `site` | no | Live URL. Defaults to `https://<owner>.github.io/<repo>/`. Set for custom domains. |
| `tags` | no | Array of short strings shown as pills. |
| `private` | no | `true` shows a lock on the Code link (it still opens for you when signed in). |

The owner, page title, and subtitle live at the top of `projects.js` under
`window.PORTFOLIO`.

## Features

- Responsive card grid with **5 color themes** — Midnight (default), Vapor Wave,
  Forest, Sunset, and Daylight — picked from the palette button in the header.
  Defaults to Midnight (dark); your choice persists across visits.
- Sort by **Last updated** (default, newest first) or **Title**; click the active
  sort again, or the arrow, to flip direction. Choices persist across visits.
- Live search box that filters by title, description, repo name, and tags.

### Adding a theme

1. Add a palette block in `index.html` under `[data-theme="<key>"]` (copy an
   existing one and change the colors).
2. Add a matching entry to the `THEMES` array near the top of `app.js`
   (`key`, `label`, and three preview swatch colors).

## Files

- `index.html` — markup + styles.
- `projects.js` — **the data you edit.**
- `app.js` — rendering, sorting, search, theme logic.
- `.nojekyll` — tells Pages to serve files as-is (no Jekyll processing).
