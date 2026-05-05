import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Seite nicht gefunden | Glasfein"
        description="Die angeforderte Seite konnte nicht gefunden werden."
        path="/404"
      />

      <section className="subpage-hero section-shell subpage-hero-compact">
        <div className="subpage-copy reveal">
          <p className="eyebrow">404</p>
          <h1>Diese Seite gibt es hier nicht.</h1>
          <p className="lead">
            Entweder ist der Link veraltet oder die Seite wurde verschoben. Zurück zur Startseite
            bringt Sie wieder in die richtige Richtung.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/">
              Zur Startseite
            </Link>
            <Link className="button button-secondary" to="/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
