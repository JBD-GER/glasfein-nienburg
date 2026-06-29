import { Seo } from "../components/Seo";

export function ImprintPage() {
  return (
    <>
      <Seo
        title="Impressum | Glasfein GbR"
        description="Impressum der Glasfein GbR mit Angaben gemäß § 5 TMG und Kontaktdaten."
        path="/impressum"
      />

      <section className="subpage-hero section-shell subpage-hero-compact">
        <div className="subpage-copy reveal">
          <p className="eyebrow">Impressum</p>
          <h1>Rechtliche Angaben</h1>
          <p className="lead">Die folgenden Informationen entsprechen den Angaben der bisherigen Glasfein-Unternehmensseite.</p>
        </div>
      </section>

      <section className="section-shell legal-card reveal">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>Glasfein GbR<br />Großer Kamp 7a<br />31633 Leese</p>

        <h2>Vertreten durch</h2>
        <p>Gunther Gamradt und Steffi Gamradt</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: 01636304419 / 01636304459
          <br />
          E-Mail: <a href="mailto:glasfein@gmail.com">glasfein@gmail.com</a>
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />DE318231105</p>

        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: Glasreiniger
          <br />
          Zuständige Kammer: Handwerkskammer Hannover
          <br />
          Verliehen in: Deutschland
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr/
          </a>.
          {" "}Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.
          Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V.,
          Straßburger Straße 8, 77694 Kehl am Rhein:{" "}
          <a
            href="https://www.verbraucher-schlichter.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.verbraucher-schlichter.de
          </a>.
        </p>
      </section>
    </>
  );
}
