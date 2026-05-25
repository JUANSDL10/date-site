# 💗 Date Site — Invitación romántica

Sitio web multi-paso para invitar a alguien especial a una cita. Estética pastel rosa, animaciones suaves y diseño responsive.

## Estructura del proyecto

```
date-site/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── img/
│   │   ├── portada.jpg      ← Imagen de la intro
│   │   ├── foto1.jpg        ← Imagen de la página sorpresa
│   │   ├── foto2.jpg        ← Foto circular en la página final
│   │   └── stickers/
│   │       ├── gato.png
│   │       └── shrek.png
│   └── music/
│       └── song.mp3         ← Música de fondo (opcional)
└── README.md
```

## Personalización rápida

### Imágenes

Reemplaza los archivos en `assets/img/` manteniendo los mismos nombres:

| Archivo | Uso |
|---------|-----|
| `portada.jpg` | Imagen principal en la intro |
| `foto1.jpg` | Página “¿¡ESPERA, DE VERDAD DIJISTE QUE SÍ!?” |
| `foto2.jpg` | Foto circular en el mensaje final |
| `stickers/gato.png` | Sticker decorativo izquierdo |
| `stickers/shrek.png` | Sticker decorativo derecho |

También puedes cambiar las rutas en `index.html` (busca los comentarios `Reemplaza`).

### Textos

- **HTML:** títulos, subtítulos y pie de página en `index.html`
- **JavaScript:** mensajes del botón NO y mensaje final dinámico en `script.js` (`NO_MESSAGES` y `updateFinalMessage`)

### Colores y estilo

Edita las variables CSS al inicio de `style.css` (`:root`).

### Música

Añade tu archivo `assets/music/song.mp3`. El botón 🎵 en la esquina activa o pausa la música (requiere interacción del usuario por políticas del navegador).

## Uso local

Abre `index.html` en el navegador, o sirve la carpeta con un servidor estático:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Luego visita `http://localhost:8080`.

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de `date-site/`.
2. Ve a **Settings → Pages**.
3. En **Source**, elige la rama `main` (o `master`) y la carpeta `/ (root)`.
4. Guarda. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo/`.

> Si el repo no está en la raíz, asegúrate de que `index.html` esté en la raíz del branch publicado.

## Requisitos

- Solo HTML, CSS y JavaScript vanilla
- Sin dependencias de build
- Compatible con navegadores modernos y móviles

## Licencia

Proyecto personal — úsalo con amor 💕
