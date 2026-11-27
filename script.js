const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const sections = document.querySelectorAll("header[id], main section[id]");
const pageLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    pageLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const progressBars = document.querySelectorAll(".progress-bar");
const skillsSection = document.querySelector("#skills");

const skillsObserver = new IntersectionObserver((entries, observer) => {
  if (!entries[0].isIntersecting) return;

  progressBars.forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`;
  });
  observer.disconnect();
}, { threshold: 0.25 });

skillsObserver.observe(skillsSection);

const contactForm = document.querySelector(".contact-form");
const successMessage = document.querySelector(".form-success");
document.querySelector("#year").textContent = new Date().getFullYear();

function setFieldError(field, message) {
  field.classList.toggle("invalid", Boolean(message));
  field.parentElement.querySelector(".error-message").textContent = message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;
  let isValid = true;

  setFieldError(name, name.value.trim() ? "" : "Please enter your name.");
  setFieldError(email, !email.value.trim()
    ? "Please enter your email."
    : !validateEmail(email.value.trim())
      ? "Please enter a valid email address."
      : "");
  setFieldError(message, message.value.trim() ? "" : "Please enter a message.");

  if (!name.value.trim() || !validateEmail(email.value.trim()) || !message.value.trim()) {
    isValid = false;
  }

  if (!isValid) {
    successMessage.textContent = "";
    return;
  }

  successMessage.textContent = "Thanks! Your message is ready to send.";
  contactForm.reset();
});
