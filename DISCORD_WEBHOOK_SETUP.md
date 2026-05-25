# 🎵 Configuración de Discord Webhook

## ¿Qué es un Discord Webhook?

Un **Webhook de Discord** es una URL especial que permite que tu sitio web envíe mensajes directamente a un canal de Discord sin necesidad de un bot.

---

## 📋 Pasos para Obtener tu Webhook

### 1️⃣ Ve a tu Servidor Discord
- Abre Discord y ve al servidor donde quieras recibir notificaciones

### 2️⃣ Abre la Configuración del Canal
- Haz **clic derecho** en el canal donde quieres recibir los mensajes
- Selecciona **"Editar canal"**

### 3️⃣ Ve a Integraciones
- En el menú lateral izquierdo, ve a **"Integraciones"**
- Selecciona **"Webhooks"**

### 4️⃣ Crea un Nuevo Webhook
- Haz clic en **"Crear Webhook"**
- Dale un nombre (ejemplo: "Date Site Notifications")
- Copia la **URL del Webhook**

---

## 🔐 Configurar el Webhook en tu Sitio

### Opción 1: Editar el Archivo Directamente

1. Abre el archivo `script.js`
2. Busca la línea:
```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/TU_WEBHOOK_ID/TU_WEBHOOK_TOKEN";
```

3. Reemplaza `TU_WEBHOOK_ID/TU_WEBHOOK_TOKEN` con tu URL del webhook
4. **Importante:** Mantén esto privado y seguro 🔒

### Ejemplo de cómo se verá:
```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1234567890123456789/AbCdEfGhIjKlMnOpQrStUvWxYz-_1234567890";
```

---

## ✨ Funcionalidades del Sistema

### El mensaje enviado incluye:

✅ **Título:** "💖 Nueva cita confirmada"
✅ **Fecha y hora** de la cita elegida
✅ **Lugar/Comida** seleccionado
✅ **Mensaje romántico** personalizado
✅ **Información del dispositivo:**
   - Navegador del usuario
   - Plataforma/Sistema Operativo
   - Resolución de pantalla
   - Modo oscuro activado o no
   - Idioma del navegador

✅ **Diseño bonito:**
   - Color rosa romántico (#FF69B7)
   - Emojis adorables
   - Footer personalizado
   - Timestamp de cuándo se envió

### Efectos visuales:

🎉 **Confetti animation** - Lluvia de corazones cuando se envía exitosamente
🎵 **Sonido de éxito** - Melodía bonita en Do Mayor (C5-E5-G5)
💬 **Notificación elegante** - Mensaje en la esquina superior derecha
✅ **Cambio de botón** - Muestra estado de envío

---

## 🛡️ Seguridad

### ⚠️ IMPORTANTE:
- **NUNCA** compartas tu URL del webhook públicamente
- Si accidentalmente la compartiste, elimina el webhook en Discord y crea uno nuevo
- La URL de tu sitio (GitHub Pages) es pública, pero el webhook no debería estar expuesto

### Alternativa más segura (para producción):
Si quieres máxima seguridad, usa un servidor backend (Node.js, Python, etc.) que:
1. Reciba los datos de tu sitio
2. Valide que vengan de tu dominio
3. Envíe el webhook internamente (la URL no se expone)

---

## 🧪 Probar el Webhook

1. Completa el formulario de la cita:
   - Selecciona fecha
   - Selecciona hora
   - Elige comida

2. Haz clic en **"Enviar detalles de la cita a Discord 💌"**

3. Deberías ver:
   - ⏳ "Enviando..." en el botón
   - ✅ "¡Detalles enviados a Discord!" cuando termine
   - 🎉 Lluvia de corazones (confetti)
   - 💬 Notificación en la esquina
   - 🎵 Sonido de éxito

4. En Discord, verás el embed bonito en tu canal

---

## 🔧 Solucionar Problemas

### El mensaje no se envía:
- ❌ Verifica que la URL del webhook sea correcta
- ❌ Asegúrate de haber reemplazado `TU_WEBHOOK_ID/TU_WEBHOOK_TOKEN`
- ❌ Comprueba en la consola (F12) si hay errores

### El webhook expira o no funciona:
- Elimina el webhook en Discord
- Crea uno nuevo
- Actualiza la URL en `script.js`

### Ver errores en consola:
1. Presiona **F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Intenta enviar un mensaje
4. Mira si aparece un error

---

## 📝 Código Relevante

El sistema está implementado en `script.js`:

```javascript
// 🔑 Tu constante del webhook (actualiza aquí)
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/...";

// 📨 Función que envía a Discord
async function sendToDiscord() {
  // ... obtiene datos de la cita
  // ... envía a Discord con fetch()
  // ... muestra confetti y notificaciones
}

// 🎯 Se ejecuta cuando haces clic en el botón
setupDiscordButton();
```

---

## 💝 Personalización

### Cambiar el color del embed:
En la función `sendToDiscord()`, busca:
```javascript
color: 16733015, // Rosa/Rojo (#FF69B7)
```

Reemplaza `16733015` con un color decimal:
- 16733015 = #FF69B7 (Rosa)
- 16711680 = #FF0000 (Rojo)
- 16776960 = #FFFF00 (Amarillo)
- 65280 = #00FF00 (Verde)

### Cambiar el mensaje de confirmación:
Busca `"✅ Detalles enviados a Discord!"` y cámbialo

### Cambiar el nombre del footer:
Busca `"Date Site 💕 | Invitación Romántica"` y personalizalo

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que el webhook sea válido
2. Abre la consola (F12) y busca errores
3. Prueba en un navegador diferente
4. Asegúrate de que Discord no está bloqueado por cortafuegos

---

## 🎉 ¡Listo!

Tu sitio romântico ahora envía notificaciones a Discord. Cada vez que alguien acepte una cita, recibirás un hermoso mensaje en tu canal privado. 💖

**¡Que disfrutes tu cita! ✨**
