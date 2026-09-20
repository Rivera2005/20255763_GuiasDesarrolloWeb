/* =========================================================
   LA NEVERÍA
   ========================================================= */

const IMAGES = {

  hero:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1400&q=80",

  contacto:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80",

  chicle:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  fresa:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  unicornio:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  mangoTwist:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  vainilla:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=80",

  frutosBosque:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  quesoFresa:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  dinosaurio:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=80",

  paletaFrutal:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80",

  paletaChocolate:
    "https://images.unsplash.com/photo-1523474707545-c37ce0809960?auto=format&fit=crop&w=1000&q=80",

  pastelHelado:
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=80",

  conoEspecial:
    "https://images.unsplash.com/photo-1565357054437-10196fc60d67?auto=format&fit=crop&w=1000&q=80"
};


/* =========================================================
   FALLBACK
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
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeImages();
  initializeNavigation();
  initializeScrollReveal();
  initializeFlavorFilters();
  initializeContactForm();
  initializeActivePage();
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
      image.onerror = null;
      image.src = IMAGE_FALLBACK;
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

      const currentlyOpen =
        dropdown.classList.contains("is-open");

      dropdowns.forEach((item) => {
        item.classList.remove("is-open");

        const itemToggle =
          item.querySelector(".nav-dropdown-toggle");

        if (itemToggle) {
          itemToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      if (!currentlyOpen) {
        dropdown.classList.add("is-open");

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-dropdown")) {
      return;
    }

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");

      const toggle =
        dropdown.querySelector(".nav-dropdown-toggle");

      if (toggle) {
        toggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");

      const toggle =
        dropdown.querySelector(".nav-dropdown-toggle");

      if (toggle) {
        toggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });

    if (mainNav) {
      mainNav.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );
    }
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mainNav || !menuToggle) {
        return;
      }

      mainNav.classList.remove("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 800) {
      return;
    }

    if (mainNav) {
      mainNav.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );
    }
  });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {
  const revealElements =
    document.querySelectorAll(".reveal");

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
  const filterButtons =
    document.querySelectorAll(".filter-button");

  const flavorCards =
    document.querySelectorAll(".flavor-card");

  const emptyState =
    document.querySelector(".filter-empty");

  if (!filterButtons.length || !flavorCards.length) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter =
        button.dataset.filter;

      filterButtons.forEach((item) => {
        const active = item === button;

        item.classList.toggle(
          "is-active",
          active
        );

        item.setAttribute(
          "aria-pressed",
          String(active)
        );
      });

      let visibleCards = 0;

      flavorCards.forEach((card) => {
        const shouldShow =
          selectedFilter === "todos" ||
          card.dataset.category === selectedFilter;

        if (shouldShow) {
          card.classList.remove("is-hidden");
          visibleCards++;
        } else {
          card.classList.add("is-hidden");
        }
      });

      if (emptyState) {
        emptyState.hidden =
          visibleCards !== 0;
      }
    });
  });
}


/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */

function initializeContactForm() {
  const form =
    document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  const fields = {
    nombre: document.querySelector("#nombre"),
    correo: document.querySelector("#correo"),
    telefono: document.querySelector("#telefono"),
    motivo: document.querySelector("#motivo"),
    mensaje: document.querySelector("#mensaje")
  };

  const successMessage =
    document.querySelector("#form-success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearFormErrors(fields);

    const errors =
      validateContactForm(fields);

    if (Object.keys(errors).length > 0) {
      showFormErrors(fields, errors);

      const firstErrorField =
        fields[Object.keys(errors)[0]];

      if (firstErrorField) {
        firstErrorField.focus();
      }

      return;
    }

    /*
     * Simulación de envío:
     * no existe backend ni se realiza una petición.
     */

    const submitButton =
      form.querySelector(".form-submit");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    window.setTimeout(() => {
      form.reset();

      if (successMessage) {
        successMessage.hidden = false;
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensaje";
      }
    }, 700);
  });

  Object.values(fields).forEach((field) => {
    if (!field) {
      return;
    }

    field.addEventListener("input", () => {
      clearFieldError(field);
    });

    field.addEventListener("change", () => {
      clearFieldError(field);
    });
  });
}


/* =========================================================
   VALIDACIÓN
   ========================================================= */

function validateContactForm(fields) {
  const errors = {};

  const nombre =
    fields.nombre.value.trim();

  const correo =
    fields.correo.value.trim();

  const telefono =
    fields.telefono.value.trim();

  const motivo =
    fields.motivo.value.trim();

  const mensaje =
    fields.mensaje.value.trim();


  /* Nombre */

  if (!nombre) {
    errors.nombre =
      "Escribe tu nombre.";
  } else if (nombre.length < 2) {
    errors.nombre =
      "El nombre debe tener al menos 2 caracteres.";
  }


  /* Correo */

  if (!correo) {
    errors.correo =
      "Escribe tu correo electrónico.";
  } else if (!isValidEmail(correo)) {
    errors.correo =
      "Escribe un correo electrónico válido.";
  }


  /* Teléfono — opcional */

  if (
    telefono &&
    !isValidPhone(telefono)
  ) {
    errors.telefono =
      "Escribe un número de teléfono válido.";
  }


  /* Motivo */

  if (!motivo) {
    errors.motivo =
      "Selecciona el motivo de tu mensaje.";
  }


  /* Mensaje */

  if (!mensaje) {
    errors.mensaje =
      "Escribe tu mensaje.";
  } else if (mensaje.length < 10) {
    errors.mensaje =
      "El mensaje debe tener al menos 10 caracteres.";
  }

  return errors;
}


/* =========================================================
   VALIDADORES AUXILIARES
   ========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}


function isValidPhone(phone) {
  const digits =
    phone.replace(/\D/g, "");

  return digits.length >= 8 &&
    digits.length <= 15;
}


/* =========================================================
   MOSTRAR ERRORES
   ========================================================= */

function showFormErrors(fields, errors) {
  Object.entries(errors).forEach(
    ([fieldName, message]) => {

      const field =
        fields[fieldName];

      if (!field) {
        return;
      }

      const container =
        field.closest(".form-field");

      const errorElement =
        document.querySelector(
          `#${fieldName}-error`
        );

      if (container) {
        container.classList.add(
          "has-error"
        );
      }

      field.setAttribute(
        "aria-invalid",
        "true"
      );

      if (errorElement) {
        errorElement.textContent =
          message;
      }
    }
  );
}


function clearFormErrors(fields) {
  Object.values(fields).forEach((field) => {
    if (field) {
      clearFieldError(field);
    }
  });
}


function clearFieldError(field) {
  const fieldName =
    field.id;

  const container =
    field.closest(".form-field");

  const errorElement =
    document.querySelector(
      `#${fieldName}-error`
    );

  if (container) {
    container.classList.remove(
      "has-error"
    );
  }

  field.removeAttribute(
    "aria-invalid"
  );

  if (errorElement) {
    errorElement.textContent = "";
  }
}


/* =========================================================
   PÁGINA ACTIVA
   ========================================================= */

function initializeActivePage() {
  const currentPage =
    document.body.dataset.page;

  if (!currentPage) {
    return;
  }

  const pageMap = {
    inicio: "index.html",
    sabores: "sabores.html",
    contacto: "contacto.html"
  };

  const currentPath =
    pageMap[currentPage];

  if (!currentPath) {
    return;
  }

  document
    .querySelectorAll(".main-nav > a")
    .forEach((link) => {

      const href =
        link.getAttribute("href");

      if (
        href === currentPath ||
        href?.startsWith(`${currentPath}#`)
      ) {
        link.classList.add(
          "nav-link-active"
        );

        link.setAttribute(
          "aria-current",
          "page"
        );
      }
    });
}


/* =========================================================
   ORIENTACIÓN
   ========================================================= */

window.addEventListener(
  "orientationchange",
  () => {

    const mainNav =
      document.querySelector(".main-nav");

    const menuToggle =
      document.querySelector(".menu-toggle");

    if (mainNav) {
      mainNav.classList.remove(
        "is-open"
      );
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );
    }
  }
);