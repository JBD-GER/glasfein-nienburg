import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import {
  careerFeatureTags,
  careerOpenings,
  careerRoles,
  careerTimeline,
  company,
  galleryImages,
  teamMembers
} from "../data/siteData";

const culturePoints = [
  {
    index: "01",
    title: "Klares Miteinander",
    description: "Direkte Absprachen, ehrlicher Ton und keine unnötigen Hierarchiespiele."
  },
  {
    index: "02",
    title: "Sichtbare Arbeit",
    description: "Am Ende des Tages sieht man das Ergebnis. Genau das macht den Job greifbar."
  },
  {
    index: "03",
    title: "Saubere Standards",
    description: "Ordentliche Ausführung ist kein Bonus, sondern die Grundlage für alles."
  }
];

const careerImages = [
  {
    src: "/assets/images/showcase-11.jpeg",
    alt: "Arbeitsalltag bei Glasfein",
    className: "hero-card hero-card-primary"
  },
  {
    src: "/assets/images/showcase-09.jpeg",
    alt: "Reinigungseinsatz im Team",
    className: "hero-card hero-card-secondary"
  }
];

export function CareerPage() {
  const featuredOpening = careerOpenings[0];
  const openingHref = featuredOpening ? `/karriere/${featuredOpening.slug}` : "/kontakt";
  const applyHref = featuredOpening ? `${openingHref}#bewerben` : "/kontakt";

  return (
    <>
      <Seo
        title="Karriere bei Glasfein | Jobs in der Glas- und Fensterreinigung"
        description="Karriere bei Glasfein: Arbeiten in der Glas- und Fensterreinigung im Raum Nienburg und Steyerberg. Quereinstieg möglich, familiäres Team, ehrliche Arbeit."
        path="/karriere"
        image="/assets/images/showcase-11.jpeg"
      />

      <section className="subpage-hero section-shell">
        <div className="subpage-copy reveal">
          <p className="eyebrow">Karriere bei Glasfein</p>
          <h1>Karriere bei Glasfein</h1>
          <p className="lead">
            Dann passt Glasfein zu dir. Wir suchen Menschen mit sauberer Arbeitsweise,
            Zuverlässigkeit und Lust auf ein kleines Team, das Verantwortung wirklich ernst
            nimmt.
          </p>
          <div className="hero-actions">
            <Link className="button" to={applyHref}>
              Schnell bewerben
            </Link>
            <a className="button button-secondary" href={company.phonePrimaryHref}>
              Direkt anrufen
            </a>
          </div>
        </div>

        <div className="subpage-media reveal reveal-delay-1">
          <div className="hero-collage hero-collage--compact hero-collage-career">
            {careerImages.map((image) => (
              <figure className={image.className} key={image.src}>
                <img src={image.src} alt={image.alt} width="1400" height="1600" />
              </figure>
            ))}
            <div className="glass-badge glass-badge-alt">
              <span className="glass-badge-kicker">Familiär</span>
              <strong>Kurze Wege, direkte Absprachen und ein klarer Anspruch</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell stat-strip reveal">
        <article className="stat-card">
          <span className="stat-value">Familiär</span>
          <span className="stat-label">Kleine Struktur, echte Verantwortung und keine Anonymität</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">Sorgfältig</span>
          <span className="stat-label">Ordentliche Arbeit ist bei uns Standard und nicht Zusatz</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">Sichtbar</span>
          <span className="stat-label">Du siehst jeden Tag direkt, was du geschafft hast</span>
        </article>
        <article className="stat-card">
          <span className="stat-value">Offen</span>
          <span className="stat-label">Quereinstieg, Teilzeit, Vollzeit oder Initiativbewerbung</span>
        </article>
      </section>

      {featuredOpening ? (
        <section className="section-shell section-stack" id="stellenangebote">
          <div className="section-heading reveal">
            <p className="eyebrow">Aktuelle Stellensuche</p>
            <h2>Aktuelle Stelle</h2>
            <p>
              Hier siehst du zuerst nur den kompakten Überblick. Die ausführliche Beschreibung,
              Kontaktmöglichkeiten und das Bewerbungsformular liegen bewusst auf der eigenen
              Job-Seite.
            </p>
          </div>

          <article className="job-teaser-card reveal">
            <div className="job-teaser-copy">
              <div className="job-badge-row">
                <span className="job-pill">{featuredOpening.location}</span>
                <span className="job-pill">{featuredOpening.employment}</span>
                <span className="job-pill job-pill-strong">{featuredOpening.level}</span>
              </div>
              <h3>{featuredOpening.title}</h3>
              <p>{featuredOpening.teaser}</p>
            </div>

            <div className="job-kpi-grid">
              {featuredOpening.kpis.map((item) => (
                <article className="job-kpi-card" key={item.label}>
                  <span className="job-kpi-label">{item.label}</span>
                  <strong className="job-kpi-value">{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="job-teaser-actions">
              <Link className="button" to={openingHref}>
                Stelle aufrufen
              </Link>
              <Link className="button button-secondary" to={applyHref}>
                Direkt zur Bewerbung
              </Link>
            </div>
          </article>
        </section>
      ) : null}

      <section className="section-shell glass-band glass-band--career">
        <div className="glass-band-copy reveal">
          <p className="eyebrow">Teamkultur</p>
          <h2>Ehrliche Arbeit. Klares Team.</h2>
          <p>
            Die besten Leute wollen oft keinen aufgeblasenen Arbeitgebertext, sondern wissen,
            wie die Arbeit wirklich aussieht. Genau das zeigt Glasfein auf dieser Seite.
          </p>
        </div>

        <div className="workflow-grid">
          {culturePoints.map((item, index) => (
            <article
              className={`workflow-card reveal${index === 1 ? " reveal-delay-1" : index === 2 ? " reveal-delay-2" : ""}`}
              key={item.title}
            >
              <span className="service-index">{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-split">
        <div className="reveal">
          <p className="eyebrow">Wen wir suchen</p>
          <h2>Anpacken statt Show</h2>
          <p className="section-copy">
            Ein perfekter Lebenslauf ist nicht entscheidend. Wichtiger sind Verlässlichkeit,
            ein sauberer Anspruch und der Wille, beim Kunden klar und respektvoll aufzutreten.
          </p>
          <div className="feature-list">
            {careerFeatureTags.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="role-stack">
          {careerRoles.map((role, index) => (
            <article
              className={`role-card reveal${index === 1 ? " reveal-delay-1" : index === 2 ? " reveal-delay-2" : ""}`}
              key={role.title}
            >
              <span className="service-index">{role.index}</span>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-stack">
        <div className="section-heading reveal">
          <p className="eyebrow">Arbeitsalltag</p>
          <h2>Echte Einsätze</h2>
          <p>
            Auch auf der Karriereseite zeigt Glasfein echte Bilder und keine generische
            Recruiting-Optik. Das sorgt für Glaubwürdigkeit und passt zum Laden.
          </p>
        </div>
        <div className="showcase-grid showcase-grid--compact">
          {galleryImages.slice(3, 9).map((image, index) => (
            <figure
              className={`showcase-card reveal${index % 3 === 1 ? " reveal-delay-1" : index % 3 === 2 ? " reveal-delay-2" : ""}`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} loading="lazy" width="1600" height="1600" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section-shell section-stack">
        <div className="section-heading reveal">
          <p className="eyebrow">Ablauf</p>
          <h2>Unkomplizierter Start</h2>
        </div>
        <div className="timeline-grid">
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
      </section>

      <section className="section-shell duo-section">
        <div className="duo-layout">
          <div className="duo-copy reveal">
            <p className="eyebrow">Mit wem du arbeitest</p>
            <h2>Kleines Team</h2>
            <p>
              Glasfein ist nicht groß, aber genau das ist ein Vorteil. Verantwortung,
              Kommunikation und Arbeitsstil liegen nicht irgendwo in der Struktur, sondern direkt
              bei den Menschen, mit denen du arbeitest.
            </p>
          </div>
          <div className="duo-grid">
            {teamMembers.map((member, index) => (
              <article
                className={`duo-card reveal${index === 1 ? " reveal-delay-1" : ""}`}
                key={member.name}
              >
                <img src={member.image} alt={member.alt} loading="lazy" width="544" height="544" />
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
    </>
  );
}
