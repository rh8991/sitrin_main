# Citrine Maintnace – Landing Page

Static RTL landing page for a small business with dynamic content via JSON.

## Features

- **Responsive design:** Optimized for mobile and desktop, with a professional dark blue theme.
- **Editable content:**  
  - `/data/content.he.json` contains:
    - `theme`: CSS color variables (`--brand`, `--ink`, etc.).

## Local Development

```bash
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

## Deployment (GitHub Pages)

1. Go to Settings → Pages.
2. Set source to your `main` branch (root).
3. Site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Customization

- **Colors:** Edit in `/data/content.he.json`.
- **Logo:** Update `logo.svg` and adjust `.logo-badge` size in `main.css`.
- **Content:** All sections (header, hero, domains, why, footer) are editable via JSON.

## Structure

- `index.html` – Main landing page, loads all content dynamically from JSON.
- `assets/js/app.js` – Loads JSON, applies theme, and renders all sections.
- `main.css` – Responsive, accessible, and brand-aligned styles.
- `data/content.he.json` – All site content and theme colors.

---

*For questions or improvements, open an issue on GitHub or contact the maintainer.*
