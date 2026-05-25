/**
 * ============================================
 * INVITACIÓN ROMÁNTICA — script.js
 * ============================================
 * Personaliza textos, mensajes y flujo aquí.
 */

(function () {
  "use strict";

  // --- Mensajes al pulsar NO (se elige uno al azar) ---
  // Añade o edita frases en español aquí
  const NO_MESSAGES = [
    "¡Ay no! Mi corazón acaba de hacer un mini dramón… pero sigo aquí esperándote 💔🥺",
    "¿Segura/o? Creo que el botón SÍ brilla más bonito… solo digo 👀💗",
    "Está bien… me quedo aquí sonriendo como tonto/a hasta que cambies de opinión 🙈✨",
    "Plot twist: el botón SÍ tiene chocolates virtuales incluidos 🍫💕",
    "Mi gato (imaginario) dice que deberías reconsiderar… mira esos ojitos 🐱",
    "Ok ok… pero mi playlist romántica ya está lista y tú la vas a perder 🎵😭",
  ];

  // --- Estado de la cita ---
  const dateState = {
    date: "",
    time: "",
    food: "",
  };

  // --- Elementos del DOM ---
  const steps = document.querySelectorAll(".step");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const noMessage = document.getElementById("no-message");
  const dateForm = document.getElementById("date-form");
  const dateInput = document.getElementById("date-input");
  const timeSelect = document.getElementById("time-select");
  const foodCards = document.querySelectorAll(".food-card");
  const selectionText = document.getElementById("selection-text");
  const btnFoodNext = document.getElementById("btn-food-next");
  const finalMessage = document.getElementById("final-message");
  const particlesContainer = document.getElementById("particles");
  const heartsContainer = document.getElementById("hearts");
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  let currentStep = "intro";

  // ============================================
  // Navegación entre pasos
  // ============================================
  function goToStep(stepId) {
    const current = document.querySelector(".step--active");
    const next = document.querySelector(`[data-step="${stepId}"]`);

    if (!next || stepId === currentStep) return;

    if (current) {
      current.classList.add("step--exit");
      current.classList.remove("step--active");
    }

    setTimeout(() => {
      steps.forEach((s) => {
        s.classList.remove("step--active", "step--exit");
      });
      next.classList.add("step--active");
      currentStep = stepId;

      if (stepId === "final") {
        heartsContainer.classList.add("hearts--active");
        updateFinalMessage();
      } else {
        heartsContainer.classList.remove("hearts--active");
      }
    }, 400);
  }

  // ============================================
  // Mensaje final personalizado con datos elegidos
  // ============================================
  function updateFinalMessage() {
    const dateFormatted = formatDateSpanish(dateState.date);
    const time = dateState.time || "la hora que elijas";
    const food = dateState.food || "algo delicioso";

    finalMessage.textContent =
      `Nuestra cita será el ${dateFormatted} a las ${time}. ` +
      `Vamos a comer ${food} y voy a sonreír como idiota todo el rato porque estaré contigo. ` +
      `Gracias por decir que sí… eres lo más bonito que me ha pasado. Te quiero muchísimo 💗`;
  }

  function formatDateSpanish(isoDate) {
    if (!isoDate) return "el día perfecto";
    const [y, m, d] = isoDate.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  // ============================================
  // Botón SÍ → página sorpresa
  // ============================================
  btnYes.addEventListener("click", () => {
    goToStep("surprise");
  });

  // ============================================
  // Botón NO — Se mueve aleatoriamente, imposible hacer clic
  // ============================================
  
  // Hacer el botón posicionable
  btnNo.style.position = "fixed";
  btnNo.style.zIndex = "100";
  
  function moveButtonToRandomPosition() {
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btnNo.style.left = randomX + "px";
    btnNo.style.top = randomY + "px";
  }
  
  // Mover el botón cuando el mouse entra
  btnNo.addEventListener("mouseenter", moveButtonToRandomPosition);
  
  // Mover el botón cuando intenta hacer clic
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveButtonToRandomPosition();
  });
  
  // Mover el botón si intenta enfocarse con teclado
  btnNo.addEventListener("focus", (e) => {
    e.preventDefault();
    moveButtonToRandomPosition();
    btnNo.blur();
  });

  // Botones con data-next
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(btn.dataset.next);
    });
  });

  // ============================================
  // Formulario de fecha y hora
  // ============================================
  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dateState.date = dateInput.value;
    dateState.time = timeSelect.value;
    goToStep("food");
  });

  // Fecha mínima: hoy
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  // ============================================
  // Selección de comida
  // ============================================
  foodCards.forEach((card) => {
    card.addEventListener("click", () => {
      foodCards.forEach((c) => c.classList.remove("food-card--selected"));
      card.classList.add("food-card--selected");
      dateState.food = card.dataset.food;
      selectionText.textContent = `¡Excelente elección! ${dateState.food} suena perfecto para nosotros 🥰`;
      btnFoodNext.disabled = false;
    });
  });

  btnFoodNext.addEventListener("click", () => {
    if (dateState.food) goToStep("final");
  });

  // ============================================
  // Partículas de flores flotantes
  // ============================================
  const FLOWER_CHARS = ["🌸", "🌷", "💮", "🌺", "✿", "❀", "🩷"];

  function createParticles(count = 18) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "particle";
      el.textContent = FLOWER_CHARS[i % FLOWER_CHARS.length];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${12 + Math.random() * 14}s`;
      el.style.animationDelay = `${Math.random() * 10}s`;
      el.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
      particlesContainer.appendChild(el);
    }
  }

  // ============================================
  // Corazones flotantes (página final)
  // ============================================
  function createHearts(count = 24) {
    const heartChars = ["💗", "💖", "💕", "💓", "♥", "🩷"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "heart";
      el.textContent = heartChars[i % heartChars.length];
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDuration = `${2 + Math.random() * 3}s`;
      el.style.animationDelay = `${Math.random() * 2}s`;
      heartsContainer.appendChild(el);
    }
  }

  // ============================================
  // Música de fondo (opcional)
  // Reemplaza assets/music/song.mp3 con tu canción
  // ============================================
  let musicPlaying = false;

  musicToggle.addEventListener("click", async () => {
    try {
      if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove("music-toggle--playing");
        musicPlaying = false;
      } else {
        await bgMusic.play();
        musicToggle.classList.add("music-toggle--playing");
        musicPlaying = true;
      }
    } catch {
      // Sin archivo de audio o autoplay bloqueado
      musicToggle.title = "Añade song.mp3 en assets/music/";
    }
  });

  // ============================================
  // Envío de detalles de la cita por correo (mailto)
  // ============================================
  
  function setupEmailButton() {
    const btnSendEmail = document.getElementById("btn-send-email");
    
    if (btnSendEmail) {
      btnSendEmail.addEventListener("click", () => {
        const fecha = dateState.date ? formatDateSpanish(dateState.date) : "No especificada";
        const hora = dateState.time || "No especificada";
        const comida = dateState.food || "No especificada";
        const mensaje = document.getElementById("final-message").textContent;
        
        // Preparar el asunto y cuerpo del correo
        const asunto = encodeURIComponent("📅 Detalles de nuestra cita ❤️");
        const cuerpo = encodeURIComponent(
          `¡Hola! Aquí están los detalles de nuestra cita:\n\n` +
          `📅 Fecha: ${fecha}\n` +
          `⏰ Hora: ${hora}\n` +
          `🍽️ Comida: ${comida}\n\n` +
          `💌 Mensaje: ${mensaje}\n\n` +
          `---\nEnviado desde Date Site con amor 💗`
        );
        
        // Crear el link mailto
        const mailtoLink = `mailto:juansilva200310@gmail.com?subject=${asunto}&body=${cuerpo}`;
        
        // Abrir el cliente de correo
        window.location.href = mailtoLink;
        
        // Mostrar confirmación
        const btnText = btnSendEmail.textContent;
        btnSendEmail.textContent = "✅ ¡Abriendo tu cliente de correo!";
        
        setTimeout(() => {
          btnSendEmail.textContent = btnText;
        }, 3000);
      });
    }
  }
  
  // Configurar el botón cuando el DOM esté listo
  setupEmailButton();

  // ============================================
  // Inicialización
  // ============================================
  createParticles();
  createHearts();
})();
