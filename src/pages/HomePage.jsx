import { Link } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { Seo } from "../components/Seo";
import {
  company,
  contactCards,
  faqItems,
  featureTags,
  galleryImages,
  homeSchema,
  homeStats,
  marqueeItems,
  principles,
  services,
  teamMembers,
  testimonials,
  workflowSteps
} from "../data/siteData";

const heroImages = [
  {
    src: "/assets/images/showcase-12.jpeg",
    alt: "Glasfein bei einem hochwertigen Reinigungseinsatz",
    className: "hero-card hero-card-primary"
  },
  {
    src: "/assets/images/showcase-05.jpeg",
    alt: "Detailaufnahme einer Glasfein Reinigung",
    className: "hero-card hero-card-secondary"
  }
];

const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems];
const homeShowcaseFeature = galleryImages[10] ?? galleryImages[0];
const homeShowcaseTiles = [
  galleryImages[8],
  galleryImages[9],
  galleryImages[11],
  galleryImages[12]
].filter(Boolean);

export function HomePage() {
  return (
    <>
      <Seo
        title="Glasfein | Fensterreinigung in Nienburg, Steyerberg und Umgebung"
        description="Glasfein reinigt Fenster, Wintergärten, Terrassendächer, Sprossenfenster und Photovoltaikflächen für Privatkunden im Raum Nienburg, Steyerberg, Hannover und Minden."
        path="/"
        image="/assets/images/showcase-12.jpeg"
        schema={homeSchema}
      />

      <section className="hero section-shell">
        <div className="hero-copy reveal">
          <p className="eyebrow">Fensterreinigung in Nienburg, Steyerberg und Umgebung</p>
          <h1>Wieder glasklar. Wieder Glasfein.</h1>
          <p className="lead">
            Fenster, Wintergärten, Terrassendächer und anspruchsvolle Glasflächen für
            Privatkunden. Persönlich organisiert, sichtbar sauber und mit einem Auftritt, der
            nicht wie jede zweite Reinigungsfirma aussieht.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/kontakt">
              Jetzt Termin anfragen
            </Link>
            <Link className="button button-secondary" to="/karriere">
              Karriere entdecken
            </Link>
          </div>
          <ul className="hero-trust" aria-label="Glasfein Vorteile">
            <li>Feste Ansprechpartner statt wechselnder Kolonnen</li>
            <li>Saubere Arbeitsbereiche inklusive Schutz für Boden und Mobiliar</li>
            <li>Von Wohnhaus bis Terrassendach mit klarem Qualitätsanspruch</li>
          </ul>
        </div>

        <div className="hero-visual reveal reveal-delay-1">
          <div className="hero-collage hero-collage-home">
            {heroImages.map((image) => (
              <figure className={image.className} key={image.src}>
                <img src={image.src} alt={image.alt} width="1400" height="1600" />
              </figure>
            ))}
            <div className="glass-badge">
              <span className="glass-badge-kicker">Seit 2017</span>
              <strong>500+ Haushalte vertrauen auf Glasfein</strong>
            </div>
            <div className="glass-badge glass-badge-alt">
              <span className="glass-badge-kicker">4G-Prinzip</span>
              <strong>Garantie, Glanz, Glasflächen und echte Ansprechpartner</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-shell reveal" aria-label="Leistungsschwerpunkte">
        <div className="marquee-track">
          {marqueeLoop.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section-shell stat-strip reveal">
        {homeStats.map((item) => (
          <article className="stat-card" key={item.label}>
            <span className="stat-value">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </article>
        ))}
      </section>

      <section className="section-shell section-stack" id="leistungen">
        <div className="section-heading reveal">
          <p className="eyebrow">Leistungen</p>
          <h2>Sauberkeit, die nicht klein denkt</h2>
          <p>
            Glasfein liefert nicht nur streifenfreie Ergebnisse, sondern einen kompletten,
            ruhigen Ablauf. Das merkt man an den Kanten, am Schutz im Innenbereich und an der Art,
            wie vor Ort gearbeitet wird.
          </p>
        </div>
        <div className="service-grid service-grid--three">
          {services.map((service, index) => (
            <article
              className={`service-card reveal${index % 3 === 1 ? " reveal-delay-1" : index % 3 === 2 ? " reveal-delay-2" : ""}`}
              key={service.title}
            >
              <span className="service-index">{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-stack" id="prinzip">
        <div className="section-heading reveal">
          <p className="eyebrow">4G-Prinzip</p>
          <h2>Vier Begriffe. Ein Stil, den man sofort erkennt.</h2>
          <p>
            Das 4G-Prinzip ist kein Spruch für die Website, sondern der Rahmen, in dem jeder
            Einsatz geplant und abgeliefert wird.
          </p>
        </div>
        <div className="story-grid">
          {principles.map((principle, index) => (
            <article
              className={`story-card reveal${index % 2 === 1 ? " reveal-delay-1" : ""}`}
              key={principle.title}
            >
              <span className="principle-letter">{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell glass-band">
        <div className="glass-band-copy reveal">
          <p className="eyebrow">Wie Glasfein arbeitet</p>
          <h2>Persönlich rein. Sauber raus. Ohne Theater dazwischen.</h2>
          <p>
            Gute Reinigungsarbeit fühlt sich leicht an, weil im Hintergrund sauber geplant
            wurde. Genau deshalb bleibt Glasfein bei Kunden nicht nur als Ergebnis, sondern auch
            als Ablauf positiv hängen.
          </p>
        </div>

        <div className="workflow-grid">
          {workflowSteps.map((step, index) => (
            <article
              className={`workflow-card reveal${index === 1 ? " reveal-delay-1" : index === 2 ? " reveal-delay-2" : ""}`}
              key={step.title}
            >
              <span className="service-index">{`0${index + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-stack showcase-section" id="showcase">
        <div className="showcase-intro">
          <div className="section-heading reveal">
            <p className="eyebrow">Showcase</p>
            <h2>Echte Einsätze, bewusst kuratiert statt endlos gestapelt</h2>
            <p>
              Die Startseite zeigt nur die stärksten Eindrücke aus dem Arbeitsalltag. Das wirkt
              klarer, glaubwürdiger und führt Besucher schneller zu Anfrage, Team und Kontakt.
            </p>
          </div>

          <article className="showcase-copy-card reveal reveal-delay-1">
            <p className="card-kicker">Arbeitsalltag</p>
            <h3>Weniger Galerie-Wand. Mehr Wirkung pro Bild.</h3>
            <p>
              Glasfein lebt von echten Einsätzen vor Ort. Genau deshalb reicht auf der
              Startseite eine konzentrierte Auswahl statt eines langen, schweren Bilderblocks.
            </p>
            <Link className="button button-secondary" to="/kontakt">
              Angebot anfragen
            </Link>
          </article>
        </div>

        <div className="showcase-stage">
          {homeShowcaseFeature ? (
            <figure className="showcase-feature reveal">
              <img
                src={homeShowcaseFeature.src}
                alt={homeShowcaseFeature.alt}
                loading="lazy"
                decoding="async"
                width="1500"
                height="2000"
              />
              <figcaption>
                <span>Vor Ort im Einsatz</span>
                <strong>Sauberkeit mit System statt Schnellschuss</strong>
              </figcaption>
            </figure>
          ) : null}

          <div className="showcase-grid showcase-grid-home">
            {homeShowcaseTiles.map((image, index) => (
              <figure
                className={`showcase-card showcase-card-home reveal${index % 2 === 1 ? " reveal-delay-1" : ""}`}
                key={image.src}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  width="1600"
                  height="1200"
                />
                <figcaption>
                  <span>Echter Einsatz</span>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell duo-section" id="team">
        <div className="duo-layout">
          <div className="duo-copy reveal">
            <p className="eyebrow">Team</p>
            <h2>Kein aufgeblasenes Team. Zwei feste Gesichter mit Haltung.</h2>
            <p>
              Genau darin liegt die Stärke von Glasfein. Keine anonyme Durchlaufstruktur,
              sondern klare Kommunikation, kurzer Draht und ein Qualitätsanspruch, der nicht
              verwaltet, sondern gelebt wird.
            </p>
            <div className="feature-list">
              {featureTags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="quote-panel reveal reveal-delay-1">
              <p className="quote-panel-kicker">Was Kunden merken</p>
              <blockquote>
                Wer Glasfein bucht, bekommt keine anonyme Nummer, sondern einen sauberen Ablauf
                mit Menschen, die Verantwortung übernehmen.
              </blockquote>
            </div>
          </div>

          <div className="duo-grid">
            {teamMembers.map((member, index) => (
              <article
                className={`duo-card reveal${index === 1 ? " reveal-delay-1" : ""}`}
                key={member.name}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  loading="lazy"
                  decoding="async"
                  width="544"
                  height="544"
                />
                <div>
                  <p className="card-kicker">{member.role}</p>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-stack testimonial-section" id="stimmen">
        <div className="section-heading reveal">
          <p className="eyebrow">Kundenstimmen</p>
          <h2>Empfohlen, weil das Gesamtbild stimmt</h2>
          <p>
            Gute Ergebnisse sprechen für sich. Noch besser ist es, wenn Kunden die Arbeitsweise
            genauso schätzen wie das Ergebnis.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <article
              className={`testimonial-card reveal${index === 1 ? " reveal-delay-1" : index === 2 ? " reveal-delay-2" : ""}`}
              key={item.name}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width="400"
                height="400"
              />
              <blockquote>{item.quote}</blockquote>
              <p>
                {item.name}, {item.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell cta-band reveal">
        <div>
          <p className="eyebrow">Direkt weiter</p>
          <h2>Sie wollen wieder Durchblick statt Schleier auf dem Glas?</h2>
        </div>
        <div className="cta-band-actions">
          <Link className="button" to="/kontakt">
            Anfrage senden
          </Link>
          <a className="button button-secondary" href={company.phonePrimaryHref}>
            {company.phonePrimary}
          </a>
        </div>
      </section>

      <section className="section-shell section-stack faq-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Häufig gefragt</p>
          <h2>Die wichtigsten Antworten vor dem ersten Termin</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article
              className={`faq-card reveal${index % 2 === 1 ? " reveal-delay-1" : ""}`}
              key={item.title}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell contact-section" id="kontakt">
        <div className="contact-copy reveal">
          <p className="eyebrow">Kontakt</p>
          <h2>Einfach kurz melden. Den Rest klären wir direkt.</h2>
          <p>
            Ob klassische Fensterreinigung, Wintergarten oder schwierige Glasfläche: Glasfein
            reagiert persönlich und ohne Umwege. Genau so sollte Kontakt heute funktionieren.
          </p>
          <div className="contact-cards">
            {contactCards.map((item) =>
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
          subject="Anfrage über die Glasfein Website"
          buttonLabel="Nachricht vorbereiten"
          messageLabel="Was können wir für Sie tun?"
          messagePlaceholder="Beschreiben Sie kurz, welche Glasflächen gereinigt werden sollen."
          note={
            <>
              Absenden öffnet Ihr Mailprogramm. Details zum Umgang mit Daten finden Sie in der{" "}
              <Link to="/datenschutz">Datenschutzerklärung</Link>.
            </>
          }
        />
      </section>
    </>
  );
}
