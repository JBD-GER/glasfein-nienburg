import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CONSENT_STORAGE_KEY = "glasfein_cookie_consent_v1";

const defaultSettings = {
  necessary: true,
  statistics: false,
  externalMedia: false
};

function getStoredConsent() {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeConsent(settings) {
  const consent = {
    version: 1,
    savedAt: new Date().toISOString(),
    settings: {
      necessary: true,
      statistics: Boolean(settings.statistics),
      externalMedia: Boolean(settings.externalMedia)
    }
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("glasfein:consent-updated", { detail: consent }));
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const openSettings = () => {
      const latest = getStoredConsent();
      setSettings({ ...defaultSettings, ...(latest?.settings ?? {}), necessary: true });
      setShowSettings(true);
      setIsVisible(true);
    };

    const stored = getStoredConsent();

    if (stored?.settings) {
      setSettings({ ...defaultSettings, ...stored.settings, necessary: true });
    } else {
      setIsVisible(true);
    }

    window.addEventListener("glasfein:open-consent", openSettings);

    return () => {
      window.removeEventListener("glasfein:open-consent", openSettings);
    };
  }, []);

  const save = (nextSettings) => {
    storeConsent(nextSettings);
    setSettings({ ...defaultSettings, ...nextSettings, necessary: true });
    setIsVisible(false);
    setShowSettings(false);
  };

  const updateSetting = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-copy">
        <p className="cookie-kicker">Datenschutz-Einstellungen</p>
        <h2 id="cookie-consent-title">Cookies und Dienste</h2>
        <p>
          Wir nutzen notwendige Speicherungen für den Betrieb der Website und diese
          Einwilligungsverwaltung. Optionale Kategorien werden nur nach Ihrer Zustimmung genutzt.
          Sie können die Auswahl jederzeit im Footer ändern.
        </p>
      </div>

      {showSettings ? (
        <div className="cookie-options" aria-label="Cookie-Kategorien">
          <label className="cookie-option">
            <input type="checkbox" checked readOnly />
            <span>
              <strong>Notwendig</strong>
              <small>Erforderlich für Formularschutz, Sicherheit und die Speicherung Ihrer Auswahl.</small>
            </span>
          </label>
          <label className="cookie-option">
            <input
              type="checkbox"
              checked={settings.statistics}
              onChange={() => updateSetting("statistics")}
            />
            <span>
              <strong>Statistik</strong>
              <small>Derzeit nicht aktiv. Wird nur nach Einwilligung für Reichweitenmessung genutzt.</small>
            </span>
          </label>
          <label className="cookie-option">
            <input
              type="checkbox"
              checked={settings.externalMedia}
              onChange={() => updateSetting("externalMedia")}
            />
            <span>
              <strong>Externe Medien</strong>
              <small>Derzeit nicht aktiv. Gilt für mögliche Einbindungen wie Karten oder Social Media.</small>
            </span>
          </label>
        </div>
      ) : null}

      <div className="cookie-actions" aria-label="Cookie-Auswahl">
        <button className="button button-secondary" type="button" onClick={() => save(defaultSettings)}>
          Ablehnen
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setShowSettings((open) => !open)}
        >
          Einstellungen
        </button>
        {showSettings ? (
          <button className="button" type="button" onClick={() => save(settings)}>
            Auswahl speichern
          </button>
        ) : (
          <button className="button" type="button" onClick={() => save(defaultSettings)}>
            Nur notwendige
          </button>
        )}
        <button
          className="button"
          type="button"
          onClick={() => save({ necessary: true, statistics: true, externalMedia: true })}
        >
          Alle akzeptieren
        </button>
      </div>

      <p className="cookie-legal">
        Details stehen in der <Link to="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </aside>
  );
}
