/* ================================
   WEDDING DATA — EDIT HERE
================================ */
const weddingData = {
  coupleNames: "Dennis & Angielyn",
  weddingDate: new Date("2026-12-23T10:00:00"), // CHANGE THIS DATE
  weddingDateDisplay: "December 23, 2026",       // CHANGE THIS DISPLAY DATE
  venue: "Amaparo Evangelical Church",
  receptionVenue: "Balay Kauswagan"
};

/* ================================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  setDates();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initCountdown();
  initRSVP();
  initAccordion();
  initLightbox();
  initBackToTop();
});

/* ================================
   SET DATES
================================ */
function setDates() {
  const display = weddingData.weddingDateDisplay;
  const heroDate = document.getElementById("heroDate");
  const footerDate = document.getElementById("footerDate");
  if (heroDate) heroDate.textContent = display;
  if (footerDate) footerDate.textContent = display;
}

/* ================================
   NAVIGATION
================================ */
function initNav() {
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  // Scrolled state
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
    updateActiveLink(sections, navLinks);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Smooth scroll on nav link click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function updateActiveLink(sections, navLinks) {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === current) {
      link.classList.add("active");
    }
  });
}

/* ================================
   MOBILE MENU
================================ */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");
  const overlay = document.getElementById("menuOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    overlay.classList.add("is-visible");
    mobileMenu.removeAttribute("aria-hidden");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openMenu);
  mobileClose.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      closeMenu();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 350);
    });
  });

  // Close on Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

/* ================================
   SCROLL REVEAL
================================ */
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll(
              ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"
            ))
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);

        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealEls.forEach(el => observer.observe(el));
}

/* ================================
   COUNTDOWN
================================ */
function initCountdown() {
  const daysEl   = document.getElementById("cd-days");
  const hoursEl  = document.getElementById("cd-hours");
  const minsEl   = document.getElementById("cd-mins");
  const secsEl   = document.getElementById("cd-secs");
  const passedEl = document.getElementById("countdownPassed");
  const gridEl   = document.getElementById("countdown");

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now  = new Date().getTime();
    const end  = weddingData.weddingDate.getTime();
    const diff = end - now;

    if (diff <= 0) {
      if (gridEl) gridEl.hidden = true;
      if (passedEl) passedEl.hidden = false;
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl)  daysEl.textContent  = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl)  minsEl.textContent  = pad(mins);
    if (secsEl)  secsEl.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}

/* ================================
   RSVP MODAL
================================ */
function initRSVP() {
  const rsvpBtn        = document.getElementById("rsvpBtn");
  const modal          = document.getElementById("rsvpModal");
  const modalClose     = document.getElementById("modalClose");
  const modalBackdrop  = document.getElementById("modalBackdrop");
  const rsvpForm       = document.getElementById("rsvpForm");
  const rsvpSuccess    = document.getElementById("rsvpSuccess");
  const successClose   = document.getElementById("rsvpSuccessClose");
  const guestCountGroup = document.getElementById("guestCountGroup");
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  // Replace with the bride's actual Facebook username or page username.
  // Example: "dennisandangielyn" or "yourpageusername"
  const BRIDE_MESSENGER_USERNAME = "lab.labcanete23";

  function openBrideMessenger(formData) {
    const cleanUsername = BRIDE_MESSENGER_USERNAME
      .replace(/^https?:\/\//i, "")
      .replace(/^m\.me\//i, "")
      .replace(/^www\.facebook\.com\//i, "")
      .replace(/^facebook\.com\//i, "")
      .replace(/\/.*$/, "")
      .trim();

    if (!cleanUsername) {
      return;
    }

    const message = [
      "Hi! This is my RSVP.",
      `Name: ${formData.name}`,
      `Attendance: ${formData.attendance === "yes" ? "Yes, I will attend" : "No, I cannot attend"}`,
      `Guests: ${formData.guests || 1}`,
      formData.message ? `Message: ${formData.message}` : ""
    ].filter(Boolean).join("\n");

    const messengerUrl = `https://m.me/${cleanUsername}?text=${encodeURIComponent(message)}`;
    window.location.href = messengerUrl;
  }

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    // Focus first input
    setTimeout(() => {
      const first = modal.querySelector("input, select, textarea, button");
      if (first) first.focus();
    }, 100);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    rsvpForm.hidden = false;
    rsvpSuccess.hidden = true;
    rsvpForm.reset();
    clearErrors();
  }

  if (rsvpBtn) rsvpBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (successClose) successClose.addEventListener("click", closeModal);

  // Hide guest count when "no" is selected
  attendanceRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (guestCountGroup) {
        guestCountGroup.style.display = radio.value === "no" ? "none" : "";
      }
    });
  });

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // Form submission
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", e => {
      e.preventDefault();
      if (!validateForm()) return;

      const formData = getFormData();

      // Open bride's Messenger chat with the RSVP details pre-filled.
      openBrideMessenger(formData);

      // Show success confirmation
      rsvpForm.hidden = true;
      rsvpSuccess.hidden = false;
    });
  }

  function getFormData() {
    return {
      name: document.getElementById("guestName").value.trim(),
      attendance: document.querySelector('input[name="attendance"]:checked')?.value,
      guests: document.getElementById("guestCount").value,
      facebookLink: document.getElementById("facebookLink").value.trim(),
      message: document.getElementById("message").value.trim()
    };
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const name = document.getElementById("guestName");
    const nameError = document.getElementById("nameError");
    if (!name.value.trim()) {
      nameError.textContent = "Please enter your full name.";
      name.focus();
      valid = false;
    }

    const attended = document.querySelector('input[name="attendance"]:checked');
    const attendError = document.getElementById("attendError");
    if (!attended) {
      attendError.textContent = "Please select your attendance.";
      valid = false;
    }

    return valid;
  }

  function clearErrors() {
    document.querySelectorAll(".form-error").forEach(el => el.textContent = "");
  }
}

/* ================================
   FAQ ACCORDION
================================ */
function initAccordion() {
  const items = document.querySelectorAll(".accordion__item");

  items.forEach(item => {
    const btn  = item.querySelector(".accordion__btn");
    const body = item.querySelector(".accordion__body");
    if (!btn || !body) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Close all
      items.forEach(other => {
        const otherBtn  = other.querySelector(".accordion__btn");
        const otherBody = other.querySelector(".accordion__body");
        if (otherBtn && otherBody) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBody.hidden = true;
        }
      });

      // Toggle clicked
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        body.hidden = false;
      }
    });
  });
}

/* ================================
   LIGHTBOX
================================ */
function initLightbox() {
  const lightbox        = document.getElementById("lightbox");
  const lightboxImg     = document.getElementById("lightboxImg");
  const lightboxClose   = document.getElementById("lightboxClose");
  const lightboxPrev    = document.getElementById("lightboxPrev");
  const lightboxNext    = document.getElementById("lightboxNext");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const triggers        = document.querySelectorAll(".lightbox-trigger");

  // Build image list from story photos
  const images = Array.from(triggers).map(el => {
    const img = el.querySelector("img");
    return { src: img ? img.src : "", alt: img ? img.alt : "" };
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function showImage(index) {
    if (!images[index]) return;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightboxPrev.style.visibility = index === 0 ? "hidden" : "visible";
    lightboxNext.style.visibility = index === images.length - 1 ? "hidden" : "visible";
  }

  triggers.forEach((trigger, i) => {
    trigger.addEventListener("click", () => openLightbox(i));
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      if (currentIndex > 0) { currentIndex--; showImage(currentIndex); }
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      if (currentIndex < images.length - 1) { currentIndex++; showImage(currentIndex); }
    });
  }

  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft"  && currentIndex > 0) { currentIndex--; showImage(currentIndex); }
    if (e.key === "ArrowRight" && currentIndex < images.length - 1) { currentIndex++; showImage(currentIndex); }
  });
}

/* ================================
   BACK TO TOP
================================ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
