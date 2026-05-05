import { Link, useParams } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { Seo } from "../components/Seo";
import { careerOpenings, careerTimeline } from "../data/siteData";
import { NotFoundPage } from "./NotFoundPage";

export function CareerOpeningPage() {
  const { openingId } = useParams();
  const opening = careerOpenings.find((item) => item.slug === openingId);

  if (!opening) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Seo
        title={`${opening.title} | Karriere bei Glasfein`}
        description={opening.seoDescription}
        path={`/karriere/${opening.slug}`}
        image={opening.image}
      />

      <section className="subpage-hero section-shell job-detail-hero">
        <div className="subpage-copy job-detail-copy reveal">
          <Link className="back-link" to="/karriere">
            Zurück zur Karriere
          </Link>
          <p className="eyebrow">Offene Stelle bei Glasfein</p>
          <h1>{opening.title}</h1>
          <p className="lead">{opening.intro}</p>
          <div className="job-badge-row">
            <span className="job-pill">{opening.location}</span>
            <span className="job-pill">{opening.employment}</span>
            <span className="job-pill job-pill-strong">{opening.level}</span>
          </div>
          <div className="hero-actions">
            <a className="button" href="#bewerben">
              Jetzt bewerben
            </a>
            <a className="button button-secondary" href={opening.contactCards[0]?.href}>
              Direkt anrufen
            </a>
          </div>

          <div className="job-kpi-grid job-kpi-grid--hero">
            {opening.kpis.map((item) => (
              <article className="job-kpi-card" key={item.label}>
                <span className="job-kpi-label">{item.label}</span>
                <strong className="job-kpi-value">{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="job-spotlight-card reveal reveal-delay-1">
          <div className="job-spotlight-media">
            <img src={opening.image} alt={`${opening.title} bei Glasfein`} width="1400" height="1100" />
          </div>
          <div className="job-spotlight-footer">
            <div className="job-badge-row job-badge-row--compact">
              <span className="job-pill">Direkte Ansprechpartner</span>
              <span className="job-pill">Saubere Standards</span>
              <span className="job-pill">Start nach Absprache</span>
            </div>
            <p>{opening.teaser}</p>
          </div>
        </div>
      </section>

      <section className="section-shell section-stack">
        <article className="job-ad-card reveal">
          <div className="job-ad-header">
            <p className="eyebrow">Stellenanzeige</p>
            <h2>{opening.title} im Raum Nienburg / Steyerberg</h2>
            <p className="job-ad-lead">{opening.teaser}</p>
          </div>

          <div className="job-ad-sections">
            <section className="job-ad-section">
              <h3>Was dich bei Glasfein erwartet</h3>
              <div className="job-text-stack">
                {opening.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="job-ad-section">
              <h3>Deine Aufgaben</h3>
              <ul>
                {opening.tasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="job-ad-section">
              <h3>Das bringst du mit</h3>
              <ul>
                {opening.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="job-ad-section">
              <h3>Das bekommst du</h3>
              <ul>
                {opening.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="job-ad-highlight-grid">
            {opening.detailPoints.map((item, index) => (
              <article
                className={`job-ad-highlight-card reveal${index === 1 ? " reveal-delay-1" : index === 2 ? " reveal-delay-2" : ""}`}
                key={item.title}
              >
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="job-ad-footer">
            <p className="eyebrow">Ablauf</p>
            <div className="timeline-grid timeline-grid--job">
              {careerTimeline.map((item, index) => (
                <article
                  className={`timeline-card reveal${index % 2 === 1 ? " reveal-delay-1" : ""}`}
                  key={item.step}
                >
                  <span className="timeline-step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="section-shell job-response-layout" id="bewerben">
        <div className="job-apply-shell reveal">
          <p className="eyebrow">Bewerben</p>
          <h3>Direkt über die Website vorbereiten</h3>
          <p className="job-apply-intro">
            Kein langes Anschreiben nötig. Schreib kurz, wer du bist, was du suchst und wie wir
            dich erreichen.
          </p>
          <ContactForm
            className="form-card job-form"
            subject={`Bewerbung als ${opening.title} über die Glasfein Website`}
            buttonLabel="Bewerbung vorbereiten"
            messageLabel="Kurz zu dir"
            messagePlaceholder="Erzähl uns kurz, wer du bist, was du suchst und warum du gut zu Glasfein passt."
            note={
              <>
                Absenden öffnet dein Mailprogramm. Hinweise zur Datenverarbeitung findest du in
                der{" "}
                <Link to="/datenschutz">Datenschutzerklärung</Link>.
              </>
            }
          />
        </div>

        <article className="job-sidebar-card reveal reveal-delay-1">
          <p className="eyebrow">Kontakt</p>
          <h3>Fragen vorher kurz klären</h3>
          <p className="job-apply-intro">
            Wenn du vor der Bewerbung lieber einmal kurz sprichst, erreichst du Glasfein direkt
            ohne Umwege.
          </p>
          <div className="contact-cards job-contact-cards job-contact-cards--stack">
            {opening.contactCards.map((item) =>
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
        </article>
      </section>
    </>
  );
}
