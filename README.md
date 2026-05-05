# glasfein-nienburg

Relaunch der Glasfein-Website als React-App auf Basis von Vite.

## Stack

- React
- Vite
- React Router
- React Helmet Async

## Seiten

- `/` Startseite
- `/kontakt` Kontakt
- `/karriere` Karriere
- `/impressum` Impressum
- `/datenschutz` Datenschutz

## Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Hinweise

- Statische Assets liegen unter `public/assets`.
- SEO-Metadaten und strukturierte Daten werden pro Route in React gesetzt.
- Für klassisches Apache-Hosting liegt ein SPA-Fallback in `public/.htaccess`.
