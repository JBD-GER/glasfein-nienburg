import { useState } from "react";
import { company } from "../data/siteData";

export function ContactForm({
  className,
  subject,
  buttonLabel,
  note,
  messageLabel,
  messagePlaceholder
}) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const body = [`Seite: ${document.title}`, ""];

    for (const [key, value] of formData.entries()) {
      const cleanValue = String(value).trim();
      if (cleanValue) {
        body.push(`${key}: ${cleanValue}`);
      }
    }

    setFeedback("Ihr Mailprogramm wird geöffnet.");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.join("\n"))}`;
    event.currentTarget.reset();
  };

  const formClassName = className ?? "form-card reveal reveal-delay-1";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Vorname
          <input type="text" name="Vorname" autoComplete="given-name" required />
        </label>
        <label>
          Nachname
          <input type="text" name="Nachname" autoComplete="family-name" required />
        </label>
        <label>
          Telefonnummer
          <input type="tel" name="Telefonnummer" autoComplete="tel" required />
        </label>
        <label>
          E-Mail
          <input type="email" name="E-Mail" autoComplete="email" />
        </label>
        <label className="full-width">
          {messageLabel}
          <textarea
            name="Nachricht"
            rows="6"
            placeholder={messagePlaceholder}
            required
          />
        </label>
      </div>
      <p className="form-note">{note}</p>
      <button className="button" type="submit">
        {buttonLabel}
      </button>
      <p className="form-feedback" aria-live="polite">
        {feedback}
      </p>
    </form>
  );
}
