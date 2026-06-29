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

## Kontaktformular mit Resend

Das Kontaktformular sendet über `/api/contact` jeweils eine interne Nachricht an Glasfein und eine Bestätigung an den Kunden. Der Resend-Key gehört nicht in Git, sondern in die Umgebung:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=glasfein@gmail.com
CONTACT_FROM_EMAIL=no-reply@glasfein-nienburg.de
CONTACT_FROM_NAME=Glasfein
```

Die Absenderdomain `glasfein-nienburg.de` muss in Resend verifiziert sein, damit `no-reply@glasfein-nienburg.de` senden darf.

## Hinweise

- Statische Assets liegen unter `public/assets`.
- SEO-Metadaten und strukturierte Daten werden pro Route in React gesetzt.
- Für klassisches Apache-Hosting liegt ein SPA-Fallback in `public/.htaccess`.
