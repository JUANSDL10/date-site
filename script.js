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
    // Asegurar que el botón nunca se salga completamente del viewport
    const padding = 10; // píxeles de margen desde los bordes
    const buttonWidth = btnNo.offsetWidth || 100;
    const buttonHeight = btnNo.offsetHeight || 50;
    
    // Calcular límites: el botón debe caber completamente dentro del viewport
    const minX = padding;
    const minY = padding;
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    // Asegurar que max sea al menos igual a min (no números negativos)
    const constrainedMaxX = Math.max(minX, maxX);
    const constrainedMaxY = Math.max(minY, maxY);
    
    // Generar posición aleatoria dentro de los límites permitidos
    const randomX = Math.random() * (constrainedMaxX - minX) + minX;
    const randomY = Math.random() * (constrainedMaxY - minY) + minY;
    
    // Asegurar que los valores están dentro de rango
    const finalX = Math.max(minX, Math.min(randomX, constrainedMaxX));
    const finalY = Math.max(minY, Math.min(randomY, constrainedMaxY));
    
    btnNo.style.left = finalX + "px";
    btnNo.style.top = finalY + "px";
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
  // Crear elemento para mostrar mensajes de error
  const formError = document.createElement("p");
  formError.className = "form__error";
  formError.setAttribute("role", "alert");
  formError.setAttribute("aria-live", "polite");
  formError.style.display = "none";
  formError.style.color = "#e94b3c";
  formError.style.marginTop = "1rem";
  formError.style.textAlign = "center";
  formError.style.fontSize = "0.95rem";
  dateForm.appendChild(formError);

  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar que ambos campos estén completos
    const dateValue = dateInput.value.trim();
    const timeValue = timeSelect.value.trim();

    let errorMessage = "";

    if (!dateValue) {
      errorMessage = "Por favor, selecciona una fecha para nuestra cita 📅";
    } else if (!timeValue) {
      errorMessage = "Por favor, elige una hora para vernos ⏰";
    }

    if (errorMessage) {
      formError.textContent = errorMessage;
      formError.style.display = "block";
      return; // No continuar si hay error
    }

    // Si todo está bien, guardar y continuar
    formError.style.display = "none";
    dateState.date = dateValue;
    dateState.time = timeValue;
    goToStep("food");
  });

  // Fecha mínima: hoy
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  // Validación en tiempo real: actualizar estado del botón submit
  const submitBtn = dateForm.querySelector("button[type='submit']");
  
  function updateSubmitButtonState() {
    const dateCompleted = dateInput.value.trim() !== "";
    const timeCompleted = timeSelect.value.trim() !== "";
    
    if (dateCompleted && timeCompleted) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
      submitBtn.style.cursor = "not-allowed";
    }
  }

  dateInput.addEventListener("change", updateSubmitButtonState);
  timeSelect.addEventListener("change", updateSubmitButtonState);
  
  // Inicializar estado del botón
  updateSubmitButtonState();

  // ============================================
  // Selección de comida
  // ============================================
  const foodHint = document.getElementById("food-hint");
  
  foodCards.forEach((card) => {
    card.addEventListener("click", () => {
      foodCards.forEach((c) => c.classList.remove("food-card--selected"));
      card.classList.add("food-card--selected");
      dateState.food = card.dataset.food;
      selectionText.textContent = `¡Excelente elección! ${dateState.food} suena perfecto para nosotros 🥰`;
      btnFoodNext.disabled = false;
      btnFoodNext.style.opacity = "1";
      btnFoodNext.style.cursor = "pointer";
      foodHint.textContent = "¡Ya puedes continuar! ✨";
      foodHint.style.color = "#10b981";
    });
  });

  btnFoodNext.addEventListener("click", () => {
    if (dateState.food) {
      goToStep("final");
    } else {
      foodHint.textContent = "❌ Por favor, selecciona una opción antes de continuar 🍽️";
      foodHint.style.color = "#e94b3c";
    }
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
  // DISCORD WEBHOOK - Notificaciones de citas
  // ============================================
  // ⚠️ IMPORTANTE: Reemplaza esta URL con tu propio Discord Webhook
  // Cómo obtenerlo:
  // 1. Ve a tu servidor Discord
  // 2. Clic derecho en el canal → Editar canal
  // 3. Integraciones → Webhooks → Nuevo Webhook
  // 4. Copia la URL del webhook
  // 5. Pégala aquí (MANTÉN ESTA URL PRIVADA Y SEGURA)
  const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/TU_WEBHOOK_ID/TU_WEBHOOK_TOKEN";

  // Obtener información del dispositivo
  function getDeviceInfo() {
    const ua = navigator.userAgent;
    const browserInfo = {
      userAgent: ua,
      platform: navigator.platform,
      language: navigator.language,
      resolution: `${window.screen.width}x${window.screen.height}`,
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    };
    return browserInfo;
  }

  // Función para crear confetti
  function createConfetti() {
    const colors = ["#ff69b4", "#ff1493", "#ff69b4", "#ffb6c1", "#ffc0cb"];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "9999";
      confetti.style.animation = `fall ${2 + Math.random() * 1}s ease-out forwards`;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // Agregar animación CSS para confetti
  if (!document.querySelector("style[data-confetti]")) {
    const style = document.createElement("style");
    style.setAttribute("data-confetti", "true");
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Función principal para enviar a Discord
  async function sendToDiscord() {
    const btnSendEmail = document.getElementById("btn-send-email");
    const originalText = "Enviar detalles de la cita a Discord 💌";
    const fecha = dateState.date ? formatDateSpanish(dateState.date) : "No especificada";
    const hora = dateState.time || "No especificada";
    const comida = dateState.food || "No especificada";
    const mensaje = document.getElementById("final-message").textContent;
    const deviceInfo = getDeviceInfo();

    // Deshabilitar botón y mostrar loading
    btnSendEmail.disabled = true;
    btnSendEmail.style.opacity = "0.7";
    btnSendEmail.style.pointerEvents = "none";
    const originalContent = btnSendEmail.innerHTML;
    btnSendEmail.innerHTML = "⏳ Enviando...";

    try {
      // Construir el embed de Discord
      const embed = {
        title: "💖 Nueva cita confirmada",
        description: `¡La cita ha sido planificada exitosamente! 🎉`,
        color: 16733015, // Rosa/Rojo (16733015 = #FF69B7)
        fields: [
          {
            name: "📅 Fecha de la cita",
            value: fecha,
            inline: true,
          },
          {
            name: "⏰ Hora",
            value: hora,
            inline: true,
          },
          {
            name: "🍽️ Comida",
            value: comida,
            inline: true,
          },
          {
            name: "💬 Mensaje Romántico",
            value: mensaje,
            inline: false,
          },
          {
            name: "💻 Información del Navegador",
            value: `**Navegador:** ${deviceInfo.userAgent.substring(0, 80)}...\n**Plataforma:** ${deviceInfo.platform}\n**Idioma:** ${deviceInfo.language}`,
            inline: false,
          },
          {
            name: "📱 Resolución de Pantalla",
            value: deviceInfo.resolution,
            inline: true,
          },
          {
            name: "🌙 Modo Oscuro",
            value: deviceInfo.isDarkMode ? "Sí" : "No",
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Date Site 💕 | Invitación Romántica",
          icon_url: "https://emoji.discord.st/emojis/6d5d2aec-dd75-4a55-b88b-48c7a7f6a1b4.png",
        },
        thumbnail: {
          url: "https://emoji.discord.st/emojis/fff16b42-3aec-43df-ab09-cc4c9b5f3b42.png",
        },
      };

      // Enviar a Discord
      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "🎉 ¡Nueva cita confirmada en el sitio romántico!",
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // ✅ ÉXITO
      btnSendEmail.innerHTML = "✅ ¡Detalles enviados a Discord!";
      btnSendEmail.style.backgroundColor = "#10b981";
      
      // Crear confetti
      createConfetti();
      
      // Reproducir sonido de éxito (opcional - usar Web Audio API)
      playSuccessSound();

      // Mostrar notificación elegante
      showNotification("¡Detalles enviados exitosamente! 💌", "success");

      // Restaurar botón después de 4 segundos
      setTimeout(() => {
        btnSendEmail.innerHTML = "✅ Detalles enviados 💌";
        btnSendEmail.disabled = false;
        btnSendEmail.style.opacity = "1";
        btnSendEmail.style.pointerEvents = "auto";
        btnSendEmail.style.backgroundColor = "";
      }, 4000);
    } catch (error) {
      console.error("Error enviando a Discord:", error);

      // ❌ ERROR
      btnSendEmail.innerHTML = "❌ Error al enviar";
      btnSendEmail.style.backgroundColor = "#ef4444";

      // Mostrar notificación de error
      showNotification(
        `Error: ${error.message}. Verifica que el webhook sea válido. 💔`,
        "error"
      );

      // Restaurar botón después de 3 segundos
      setTimeout(() => {
        btnSendEmail.innerHTML = originalContent;
        btnSendEmail.disabled = false;
        btnSendEmail.style.opacity = "1";
        btnSendEmail.style.pointerEvents = "auto";
        btnSendEmail.style.backgroundColor = "";
      }, 3000);
    }
  }

  // Función para mostrar notificación elegante
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.padding = "1rem 1.5rem";
    notification.style.borderRadius = "12px";
    notification.style.fontWeight = "bold";
    notification.style.zIndex = "10000";
    notification.style.animation = "slideIn 0.4s ease-out";
    notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    notification.style.backdropFilter = "blur(10px)";
    notification.textContent = message;

    if (type === "success") {
      notification.style.backgroundColor = "rgba(16, 185, 129, 0.95)";
      notification.style.color = "white";
    } else {
      notification.style.backgroundColor = "rgba(239, 68, 68, 0.95)";
      notification.style.color = "white";
    }

    document.body.appendChild(notification);

    // Agregar animación de entrada si no existe
    if (!document.querySelector("style[data-notification-anim]")) {
      const style = document.createElement("style");
      style.setAttribute("data-notification-anim", "true");
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      notification.style.animation = "slideIn 0.4s ease-out reverse";
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }

  // Función para reproducir sonido de éxito (usando Web Audio API)
  function playSuccessSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Crear una melodía corta y bonita
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (acorde Do Mayor)
      let currentTime = audioContext.currentTime;

      notes.forEach((frequency, index) => {
        const nextOscillator = audioContext.createOscillator();
        const nextGain = audioContext.createGain();

        nextOscillator.frequency.value = frequency;
        nextOscillator.connect(nextGain);
        nextGain.connect(audioContext.destination);

        nextGain.gain.setValueAtTime(0.1, currentTime + index * 0.1);
        nextGain.gain.exponentialRampToValueAtTime(0.01, currentTime + index * 0.1 + 0.1);

        nextOscillator.start(currentTime + index * 0.1);
        nextOscillator.stop(currentTime + index * 0.1 + 0.1);
      });
    } catch (e) {
      // Si el navegador no soporta Web Audio API, ignora silenciosamente
      console.log("Web Audio API no disponible, sin sonido");
    }
  }

  // Configurar el botón de Discord
  function setupDiscordButton() {
    const btnSendEmail = document.getElementById("btn-send-email");

    if (btnSendEmail) {
      // Cambiar el texto del botón
      btnSendEmail.textContent = "Enviar detalles de la cita a Discord 💌";

      btnSendEmail.addEventListener("click", () => {
        sendToDiscord();
      });
    }
  }

  // Inicializar botón Discord cuando el DOM esté listo
  setupDiscordButton();

  // ============================================
  // Inicialización
  // ============================================
  createParticles();
  createHearts();
})();
