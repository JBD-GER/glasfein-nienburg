import { Seo } from "../components/Seo";

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Datenschutz | Glasfein GbR"
        description="Datenschutzhinweise der Glasfein GbR für die Nutzung dieser Website und Kontaktanfragen."
        path="/datenschutz"
      />

      <section className="subpage-hero section-shell subpage-hero-compact">
        <div className="subpage-copy reveal">
          <p className="eyebrow">Datenschutz</p>
          <h1>Hinweise zur Verarbeitung personenbezogener Daten</h1>
          <p className="lead">Diese Seite beschreibt in allgemeiner Form, welche Daten bei der Nutzung der Website und bei Kontaktanfragen verarbeitet werden können.</p>
        </div>
      </section>

      <section className="section-shell legal-card reveal">
        <h2>1. Verantwortlicher</h2>
        <p>
          Glasfein GbR
          <br />
          Von-Münchhausen-Str. 25
          <br />
          31595 Steyerberg
          <br />
          E-Mail: <a href="mailto:glasfein@gmail.com">glasfein@gmail.com</a>
          <br />
          Telefon: <a href="tel:+491636304419">0163 6304419</a>
        </p>

        <h2>2. Zugriff auf die Website</h2>
        <p>
          Beim Aufruf dieser Website können durch den Hosting-Anbieter technisch notwendige
          Informationen verarbeitet werden, etwa IP-Adresse, Datum und Uhrzeit des Zugriffs,
          aufgerufene Dateien, Browsertyp und Betriebssystem. Diese Verarbeitung erfolgt in der
          Regel zur sicheren Bereitstellung der Website.
        </p>

        <h2>3. Kontaktaufnahme</h2>
        <p>
          Wenn Sie per E-Mail, Telefon oder über eines der Formulare Kontakt aufnehmen, werden die
          von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage verarbeitet. Die Formulare
          dieser Website übertragen Ihre Angaben an eine geschützte Serverfunktion, damit eine
          Nachricht an Glasfein und eine Bestätigung an die angegebene E-Mail-Adresse versendet
          werden können. Für den E-Mail-Versand wird der Dienst Resend genutzt.
        </p>

        <h2>4. Zwecke der Verarbeitung</h2>
        <p>
          Die Verarbeitung erfolgt ausschließlich zur Bearbeitung von Anfragen, zur
          Kontaktaufnahme, zur Angebotsvorbereitung sowie zur Kommunikation im Rahmen eines
          möglichen Auftrags oder Bewerbungsverfahrens.
        </p>

        <h2>5. Externe Links</h2>
        <p>
          Diese Website verlinkt auf externe Plattformen wie Facebook und Instagram. Beim Klick auf
          diese Links verlassen Sie diese Website. Für die Datenverarbeitung auf den jeweiligen
          Plattformen sind deren Betreiber verantwortlich.
        </p>

        <h2>6. Cookies und Einwilligungen</h2>
        <p>
          Diese Website nutzt technisch notwendige Speicherungen, damit die Seite sicher betrieben
          und Ihre Datenschutz-Auswahl gespeichert werden kann. Optionale Kategorien wie Statistik
          oder externe Medien werden nur nach Ihrer Einwilligung genutzt. Ihre Auswahl können Sie
          jederzeit über den Link „Datenschutz-Einstellungen“ im Footer ändern oder widerrufen.
        </p>

        <h2>7. Ihre Rechte</h2>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Vorschriften das Recht auf Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Widerspruch gegen die
          Verarbeitung Ihrer personenbezogenen Daten. Außerdem steht Ihnen ein Beschwerderecht bei
          einer Datenschutzaufsichtsbehörde zu.
        </p>

        <h2>8. Hinweis</h2>
        <p>
          Diese Datenschutzhinweise stellen eine allgemeine technische Grundlage für diese Website
          dar. Vor der endgültigen Veröffentlichung sollte der Inhalt rechtlich geprüft und an das
          tatsächliche Hosting- und Kontaktsetup angepasst werden.
        </p>
      </section>
    </>
  );
}
