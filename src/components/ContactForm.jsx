import { useState } from "react";

export function ContactForm({
  className,
  subject,
  buttonLabel,
  note,
  messageLabel,
  messagePlaceholder
}) {
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const payload = {
      subject,
      pageTitle: document.title,
      pageUrl: window.location.href,
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim()
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.phone ||
      !payload.email ||
      !payload.message
    ) {
      setFeedback({
        type: "error",
        message: "Bitte füllen Sie alle Pflichtfelder aus."
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Die Anfrage konnte gerade nicht gesendet werden.");
      }

      setFeedback({
        type: "success",
        message: "Vielen Dank. Ihre Nachricht wurde gesendet und per E-Mail bestätigt."
      });
      form.reset();
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Die Anfrage konnte gerade nicht gesendet werden."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClassName = className ?? "form-card reveal reveal-delay-1";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Vorname
          <input type="text" name="firstName" autoComplete="given-name" required />
        </label>
        <label>
          Nachname
          <input type="text" name="lastName" autoComplete="family-name" required />
        </label>
        <label>
          Telefonnummer
          <input type="tel" name="phone" autoComplete="tel" required />
        </label>
        <label>
          E-Mail
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="full-width">
          {messageLabel}
          <textarea
            name="message"
            rows="6"
            placeholder={messagePlaceholder}
            required
          />
        </label>
        <label className="form-honeypot" aria-hidden="true" tabIndex="-1">
          Website
          <input type="text" name="website" autoComplete="off" tabIndex="-1" />
        </label>
      </div>
      <p className="form-note">{note}</p>
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Wird gesendet..." : buttonLabel}
      </button>
      <p className={`form-feedback${feedback.type ? ` form-feedback--${feedback.type}` : ""}`} aria-live="polite">
        {feedback.message}
      </p>
    </form>
  );
}
