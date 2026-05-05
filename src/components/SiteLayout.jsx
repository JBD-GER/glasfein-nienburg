import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { careerOpenings, company, footerLinks, navItems } from "../data/siteData";

function getBodyClasses(pathname) {
  if (pathname === "/" || pathname === "/index.html") {
    return ["page-home"];
  }

  if (pathname.startsWith("/karriere")) {
    return ["page-subpage", "page-career"];
  }

  if (pathname.startsWith("/impressum") || pathname.startsWith("/datenschutz")) {
    return ["page-subpage", "page-legal"];
  }

  return ["page-subpage"];
}

export function SiteLayout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const featuredOpening = careerOpenings[0];
  const navCtaTo =
    location.pathname.startsWith("/karriere") && featuredOpening
      ? `/karriere/${featuredOpening.slug}#bewerben`
      : "/kontakt";

  useEffect(() => {
    document.body.classList.remove("page-home", "page-subpage", "page-career", "page-legal");
    document.body.classList.add(...getBodyClasses(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.remove("nav-open");
    setNavOpen(false);

    if (location.hash) {
      requestAnimationFrame(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const updateScrolledState = () => {
      document.body.classList.toggle("is-scrolled", window.scrollY > 18);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  useEffect(() => {
    const updatePointer = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--cursor-x", `${x}%`);
      document.documentElement.style.setProperty("--cursor-y", `${y}%`);
    };

    document.documentElement.style.setProperty("--cursor-x", "76%");
    document.documentElement.style.setProperty("--cursor-y", "12%");
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    nodes.forEach((node) => node.classList.remove("is-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
  }, [navOpen]);

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <header className="site-header">
        <div className="announcement-bar">
          <p>
            {location.pathname.startsWith("/karriere")
              ? "Karriere bei Glasfein: familiär, sauber organisiert und mit echtem Teamgefühl."
              : location.pathname.startsWith("/kontakt")
                ? "Persönlicher Kontakt statt Warteschleife: Wir melden uns direkt zurück."
                : "Seit 2017 für klare Verhältnisse im Raum Nienburg, Steyerberg und Umgebung."}
          </p>
        </div>

        <nav className="nav" aria-label="Hauptnavigation">
          <Link className="brand" to="/" aria-label="Glasfein Startseite">
            <img src="/assets/images/logo.png" alt="Glasfein Logo" width="56" height="55" />
            <span>
              <strong>{company.brand}</strong>
              <small>{company.slogan}</small>
            </span>
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="nav-menu"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Menü öffnen</span>
          </button>

          <div className="nav-menu" id="nav-menu">
            {navItems.map((item) =>
              item.type === "route" ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <Link key={item.label} to={item.to}>
                  {item.label}
                </Link>
              )
            )}
            <Link className="button button-nav" to={navCtaTo}>
              {location.pathname.startsWith("/karriere") ? "Jetzt bewerben" : "Angebot anfragen"}
            </Link>
          </div>
        </nav>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div className="footer-brand">
            <img src="/assets/images/logo.png" alt="Glasfein Logo" width="64" height="63" />
            <div>
              <strong>{company.name}</strong>
              <p>{company.slogan}</p>
            </div>
          </div>

          <div>
            <h2>Kontakt</h2>
            <a href={company.phonePrimaryHref}>{company.phonePrimary}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>
              {company.addressLines[0]}
              <br />
              {company.addressLines[1]}
            </p>
          </div>

          <div>
            <h2>Seiten</h2>
            {footerLinks.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h2>Social</h2>
            {company.socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {company.name}. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
