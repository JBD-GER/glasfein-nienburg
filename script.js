const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const revealItems = document.querySelectorAll(".reveal");
const yearTargets = document.querySelectorAll("[data-year]");
const forms = document.querySelectorAll("[data-mailto-form]");

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const toggleScrolledState = () => {
  body.classList.toggle("is-scrolled", window.scrollY > 18);
};

toggleScrolledState();
window.addEventListener("scroll", toggleScrolledState, { passive: true });

if ("IntersectionObserver" in window) {
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

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipient = form.dataset.recipient;
    const subject = form.dataset.subject || document.title;
    const feedback = form.querySelector(".form-feedback");

    if (!recipient) {
      if (feedback) {
        feedback.textContent = "Es fehlt eine Empfängeradresse für dieses Formular.";
      }
      return;
    }

    const formData = new FormData(form);
    const lines = [`Seite: ${document.title}`, ""];

    for (const [key, value] of formData.entries()) {
      const cleanValue = String(value).trim();
      if (cleanValue) {
        lines.push(`${key}: ${cleanValue}`);
      }
    }

    const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    if (feedback) {
      feedback.textContent = "Ihr Mailprogramm wird geöffnet.";
    }

    window.location.href = href;
    form.reset();
  });
});
