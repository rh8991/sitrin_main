# Citrine Holdings – Landing Page (GitHub Pages)

Static RTL landing page for **סיטרין אחזקות**.

## Structure
- `index.html` – main page
- `assets/css/main.css` – styles
- `assets/js/app.js` – interactions (reveal, smooth scroll, form)
- `assets/icons/favicon.svg` – favicon
- `data/` (optional) – JSON-driven content
- `.nojekyll` – disable Jekyll on Pages

## Run locally
Open `index.html` directly or run a static server:
```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy (GitHub Pages)
1. Push to a GitHub repo.
2. GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)**.
3. Open `https://<USER>.github.io/<REPO>/`.

## Forms
By default uses `mailto:` fallback. To use a real provider:
- **Formspree**: replace the submission block in `assets/js/app.js` with a `fetch` to your endpoint.
- **EmailJS**: include their script in `index.html` and call `emailjs.send(...)`.

## License
MIT
