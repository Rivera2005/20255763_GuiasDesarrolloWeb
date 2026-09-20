/* ============================================================
   LA NEVERÍA
   Shared JavaScript
============================================================ */


/* ============================================================
   IMAGE SOURCES
   All image URLs are centralized here.
============================================================ */

const IMAGES = {

  hero:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1600&q=80",

  chicle:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=800&q=80",

  fresa:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",

  unicornio:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=800&q=80",

  mango:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=800&q=80",

  vainilla:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=800&q=80",

  frutos:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",

  quesoFresa:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=800&q=80",

  dinosaurio:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=800&q=80",

  tienda:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1200&q=80",

  franquicia:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80",

  congelador:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1200&q=80",

  equipo:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80",

  social1:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",

  social2:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=600&q=80",

  social3:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=600&q=80",

  social4:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",

  social5:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=600&q=80",

  social6:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=600&q=80"
};


/* ============================================================
   IMAGE FALLBACK
   SVG inline using only colors from DESIGN.md.
============================================================ */

const FALLBACK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fee5ca"/>
  <circle cx="400" cy="245" r="105" fill="#ffffff"/>
  <path
    d="M320 290h160l-80 180z"
    fill="#fee5ca"
    stroke="#b00e2f"
    stroke-width="6"
  />
  <path
    d="M330 290c0-65 31-105 70-105s70 40 70 105"
    fill="#ffffff"
    stroke="#000000"
    stroke-width="6"
  />
  <path
    d="M350 330h100M365 365h70M380 400h40"
    stroke="#b00e2f"
    stroke-width="5"
    fill="none"
  />
</svg>
`;

const IMAGE_FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(FALLBACK_SVG);

window.IMAGE_FALLBACK = IMAGE_FALLBACK;


/* ============================================================
   IMAGE LOADER
============================================================ */

function loadImages() {
  const imageElements = document.querySelectorAll("[data-image]");

  imageElements.forEach((image) => {
    const imageKey = image.dataset.image;
    const imageUrl = IMAGES[imageKey];

    if (!imageUrl) {
      image.src = IMAGE_FALLBACK;
      return;
    }

    image.src = imageUrl;
  });
}


/* ============================================================
   MOBILE MENU
============================================================ */

function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (!menuToggle || !mainNav) {
    return;
  }

  function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}


/* ============================================================
   DROPDOWN MENUS
============================================================ */

function setupDropdowns() {
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-dropdown-toggle");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("is-open");

      button.setAttribute("aria-expanded", String(isOpen));

      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("is-open");

          const otherButton =
            otherDropdown.querySelector(".nav-dropdown-toggle");

          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    if (!event.target.closest(".nav-dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("is-open");

        const button =
          dropdown.querySelector(".nav-dropdown-toggle");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}


/* ============================================================
   SCROLL REVEAL
============================================================ */

function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) {
    return;
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


/* ============================================================
   ACTIVE NAVIGATION
   Supports index.html, sabores.html and contacto.html.
============================================================ */

function setupActiveNavigation() {
  const currentPage =
    document.body.dataset.page ||
    document.documentElement.dataset.page ||
    "inicio";

  const pageMap = {
    inicio: "index.html",
    sabores: "sabores.html",
    contacto: "contacto.html"
  };

  const activeHref = pageMap[currentPage];

  if (!activeHref) {
    return;
  }

  const links = document.querySelectorAll(".nav-link[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    if (
      href === activeHref ||
      href.startsWith(`${activeHref}#`)
    ) {
      link.setAttribute("aria-current", "page");
    }
  });
}


/* ============================================================
   SMOOTH INTERNAL LINKS
============================================================ */

function setupInternalLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    });
  });
}


/* ============================================================
   INIT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  loadImages();
  setupMobileMenu();
  setupDropdowns();
  setupScrollReveal();
  setupActiveNavigation();
  setupInternalLinks();
});