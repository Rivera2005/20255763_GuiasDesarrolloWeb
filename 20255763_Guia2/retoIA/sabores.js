/* =========================================================
   LA NEVERÍA
   Imagenes verificadas y centralizadas
   ========================================================= */

const IMAGES = {
  /* Imagen original / temática de helado */
  hero:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1400&q=80",

  /* Sabores del catálogo */
  chicle:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  fresa:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  unicornio:
    "https://images.unsplash.com/photo-1629385701021-fcd568a743e8?auto=format&fit=crop&w=1000&q=80",

  mangoTwist:
    "https://images.unsplash.com/photo-1709625088472-9d248f74f215?auto=format&fit=crop&w=1000&q=80",

  vainilla:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=80",

  frutosBosque:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  quesoFresa:
    "https://images.unsplash.com/photo-1750874693343-3c45cc482ff9?auto=format&fit=crop&w=1000&q=80",

  dinosaurio:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  /* Productos adicionales */
  paletaFrutal:
    "https://images.unsplash.com/photo-1499638472904-ea5c6178a300?auto=format&fit=crop&w=1000&q=80",

  paletaChocolate:
    "https://images.unsplash.com/photo-1570081457355-2c9dff2c816d?auto=format&fit=crop&w=1000&q=80",

  pastelHelado:
    "https://images.unsplash.com/photo-1691514485264-9f5371093293?auto=format&fit=crop&w=1000&q=80",

  conoEspecial:
    "https://images.unsplash.com/photo-1709625088472-9d248f74f215?auto=format&fit=crop&w=1000&q=80"
};


/* =========================================================
   FALLBACK DE IMAGEN
   Usa únicamente colores del design.md
   ========================================================= */

const IMAGE_FALLBACK =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <rect width="800" height="800" fill="#fee5ca"/>
      <path
        d="M270 380h260L400 690 270 380Z"
        fill="#ffffff"
        stroke="#000000"
        stroke-width="10"
      />
      <path
        d="M245 380c0-90 70-160 155-160s155 70 155 160H245Z"
        fill="#b00e2f"
        stroke="#000000"
        stroke-width="10"
      />
      <circle cx="335" cy="315" r="12" fill="#fee5ca"/>
      <circle cx="410" cy="280" r="12" fill="#fee5ca"/>
      <circle cx="460" cy="325" r="12" fill="#fee5ca"/>
    </svg>
  `);

window.IMAGES = IMAGES;
window.IMAGE_FALLBACK = IMAGE_FALLBACK;


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeImages();
  initializeNavigation();
  initializeScrollReveal();
  initializeFlavorFilters();
});


/* =========================================================
   IMÁGENES
   ========================================================= */

function initializeImages() {
  const imageElements = document.querySelectorAll("img[data-image]");

  imageElements.forEach((image) => {
    const imageKey = image.dataset.image;
    const imageUrl = IMAGES[imageKey];

    if (!imageUrl) {
      image.src = IMAGE_FALLBACK;
      return;
    }

    image.src = imageUrl;

    image.addEventListener("error", () => {
      if (image.src !== IMAGE_FALLBACK) {
        image.src = IMAGE_FALLBACK;
      }
    });
  });
}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");

    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const currentlyOpen = dropdown.classList.contains("is-open");

      dropdowns.forEach((item) => {
        item.classList.remove("is-open");

        const itemToggle = item.querySelector(".nav-dropdown-toggle");

        if (itemToggle) {
          itemToggle.setAttribute("aria-expanded", "false");
        }
      });

      if (!currentlyOpen) {
        dropdown.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("is-open");

        const toggle = dropdown.querySelector(".nav-dropdown-toggle");

        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");

      const toggle = dropdown.querySelector(".nav-dropdown-toggle");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    if (mainNav) {
      mainNav.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  });

  const navigationLinks = document.querySelectorAll(".main-nav a");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!mainNav || !menuToggle) {
        return;
      }

      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      if (mainNav) {
        mainNav.classList.remove("is-open");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    }
  });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
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
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================================
   FILTROS DE SABORES
   ========================================================= */

function initializeFlavorFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const flavorCards = document.querySelectorAll(".flavor-card");
  const emptyState = document.querySelector(".filter-empty");

  if (!filterButtons.length || !flavorCards.length) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      updateActiveFilter(button, filterButtons);
      filterFlavorCards(
        selectedFilter,
        flavorCards,
        emptyState
      );
    });
  });
}


function updateActiveFilter(activeButton, filterButtons) {
  filterButtons.forEach((button) => {
    const isActive = button === activeButton;

    button.classList.toggle("is-active", isActive);
    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


function filterFlavorCards(
  selectedFilter,
  flavorCards,
  emptyState
) {
  let visibleCards = 0;

  flavorCards.forEach((card) => {
    const category = card.dataset.category;
    const shouldShow =
      selectedFilter === "todos" ||
      category === selectedFilter;

    if (shouldShow) {
      visibleCards += 1;

      showFlavorCard(card);
    } else {
      hideFlavorCard(card);
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCards !== 0;
  }
}


function showFlavorCard(card) {
  card.classList.remove("is-hidden");

  requestAnimationFrame(() => {
    card.classList.remove("filter-hiding");
    card.classList.add("filter-showing");
  });
}


function hideFlavorCard(card) {
  card.classList.add("filter-hiding");

  /*
   * Pequeña transición antes de retirar visualmente
   * la tarjeta del grid.
   */
  window.setTimeout(() => {
    if (card.classList.contains("filter-hiding")) {
      card.classList.add("is-hidden");
      card.classList.remove("filter-showing");
    }
  }, 300);
}


/* =========================================================
   ACTIVE PAGE
   Preparado para index.html, sabores.html y contacto.html
   ========================================================= */

function initializeActivePage() {
  const currentPage = document.body.dataset.page;

  if (!currentPage) {
    return;
  }

  const pageMap = {
    inicio: "index.html",
    sabores: "sabores.html",
    contacto: "contacto.html"
  };

  const currentPath = pageMap[currentPage];

  if (!currentPath) {
    return;
  }

  const links = document.querySelectorAll(".main-nav a");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    if (
      href === currentPath ||
      href.startsWith(`${currentPath}#`)
    ) {
      link.classList.add("nav-link-active");
    }
  });
}


/* =========================================================
   CERRAR MENÚ AL CAMBIAR DE ORIENTACIÓN
   ========================================================= */

window.addEventListener("orientationchange", () => {
  const mainNav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");

  if (mainNav) {
    mainNav.classList.remove("is-open");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});