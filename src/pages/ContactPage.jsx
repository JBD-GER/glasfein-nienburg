import { Link } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { Seo } from "../components/Seo";
import { company, contactPageCards, galleryImages } from "../data/siteData";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Kontakt zu Glasfein | Fensterreinigung Nienburg"
        description="Kontaktieren Sie Glasfein für Fensterreinigung, Wintergartenreinigung, Terrassendächer und Photovoltaikflächen im Raum Nienburg/Weser, Steyerberg, Hannover und Minden."
        path="/kontakt"
        image="/assets/images/showcase-13.jpeg"
        keywords="Kontakt Glasfein, Angebot Fensterreinigung Nienburg, Fensterputzer Steyerberg, Glasreinigung Anfrage"
      />

      <section className="subpage-hero section-shell">
        <div className="subpage-copy reveal">
          <p className="eyebrow">Kontakt</p>
          <h1>Anfrage stellen</h1>
          <p className="lead">
            Dann schreiben oder rufen Sie direkt an. Glasfein reagiert persönlich, schnell und
            ohne Umwege über irgendeine unpersönliche Struktur.
          </p>
          <div className="hero-actions">
            <a className="button" href={company.phonePrimaryHref}>
              Jetzt anrufen
            </a>
            <a className="button button-secondary" href={`mailto:${company.email}`}>
              E-Mail schreiben
            </a>
          </div>
        </div>

        <div className="subpage-media reveal reveal-delay-1">
          <div className="hero-collage hero-collage--compact">
            <figure className="hero-card hero-card-primary">
              <img
                src="/assets/images/showcase-13.jpeg"
                alt="Glasfein Einsatz bei der Fensterreinigung"
                width="900"
                height="1600"
              />
            </figure>
            <figure className="hero-card hero-card-secondary">
              <img
                src="/assets/images/showcase-02.jpeg"
                alt="Reinigungsdetail einer Glasfläche"
                width="1200"
                height="1600"
              />
            </figure>
            <div className="glass-badge glass-badge-alt">
              <span className="glass-badge-kicker">Persönlich</span>
              <strong>Feste Ansprechpartner, direkte Rückmeldung und klare Absprachen</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell contact-section">
        <div className="contact-copy reveal">
          <p className="eyebrow">Direkt erreichbar</p>
          <h2>Direkter Kontakt</h2>
          <p>
            Egal ob klassische Fensterreinigung oder kniffliger Sonderfall: Wir besprechen jede
            Anfrage direkt und finden eine passende Lösung für Ihre Glasflächen.
          </p>
          <div className="contact-cards">
            {contactPageCards.map((item) =>
              item.href ? (
                <a className="contact-card" href={item.href} key={item.label}>
                  <span className="contact-label">{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              ) : (
                <div className="contact-card" key={item.label}>
                  <span className="contact-label">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              )
            )}
          </div>
        </div>

        <ContactForm
          subject="Kontaktanfrage über die Glasfein Website"
          buttonLabel="Anfrage senden"
          messageLabel="Ihre Nachricht"
          messagePlaceholder="Beschreiben Sie kurz, welche Glasflächen gereinigt werden sollen."
          note={
            <>
              Ihre Anfrage wird sicher übertragen. Sie erhalten eine Bestätigung per E-Mail.
              Details finden Sie in der{" "}
              <Link to="/datenschutz">Datenschutzerklärung</Link>.
            </>
          }
        />
      </section>

      <section className="section-shell section-stack">
        <div className="section-heading reveal">
          <p className="eyebrow">Einsatzgebiet</p>
          <h2>Regionen im Überblick</h2>
          <p>
            Die Seite transportiert jetzt nicht nur Leistungen, sondern auch Haltung: persönlich,
            regional und sichtbar hochwertig statt beliebig.
          </p>
        </div>
        <div className="service-grid service-grid--three">
          <article className="service-card reveal">
            <h3>Fenster inkl. Rahmen</h3>
            <p>Streifenfreie Ergebnisse inklusive Falz und Fensterbänken innen und außen.</p>
          </article>
          <article className="service-card reveal reveal-delay-1">
            <h3>Wintergärten und Dächer</h3>
            <p>Auch Terrassendächer und schwer erreichbare Glasflächen gehören zum Alltag.</p>
          </article>
          <article className="service-card reveal reveal-delay-2">
            <h3>Photovoltaik und Sonderfälle</h3>
            <p>Wenn Flächen anspruchsvoll werden, besprechen wir die passende Lösung direkt.</p>
          </article>
        </div>
      </section>

      <section className="section-shell section-stack">
        <div className="showcase-grid showcase-grid--compact">
          {galleryImages.slice(8, 13).map((image, index) => (
            <figure
              className={`showcase-card reveal${index % 3 === 1 ? " reveal-delay-1" : index % 3 === 2 ? " reveal-delay-2" : ""}`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} loading="lazy" width="1600" height="1600" />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
