# 🎸 Whitedemon — Official Page

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)

**Landing page con escena 3D interactiva construida con Three.js**

[Demo en vivo](#) · [Reportar bug](../../issues) · [Solicitar feature](../../issues)

</div>

---

## 📖 Descripción

Página web oficial de **Whitedemon** — una landing page premium con estética dark/minimalista que presenta una escena 3D interactiva renderizada en tiempo real con Three.js. Incluye modelos 3D animados de manos que flotan con movimiento orgánico, procesados mediante un shader de umbral blanco/negro para lograr un estilo visual de alto contraste único.

## ✨ Características

- **Escena 3D en tiempo real** — Modelos GLTF animados con floating motion y sutil rotación.
- **Post-procesamiento personalizado** — Shader de umbral (threshold) que convierte la escena en alto contraste B/N.
- **Diseño responsive** — Adaptación fluida a móvil, tablet, laptop y ultrawide con 6 breakpoints.
- **Menú hamburguesa** — Navegación fullscreen con blur y transiciones suaves para dispositivos móviles.
- **Estética premium** — Paleta monocromática oscura, tipografía Inter, efectos glassmorphism y micro-animaciones.
- **Optimizado** — Pixel ratio limitado, carga diferida de scripts, `preconnect` a CDNs externos.

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica |
| **CSS3** | Diseño responsive, variables CSS, media queries, `backdrop-filter` |
| **JavaScript (ES6+)** | Lógica de la escena 3D y menú interactivo |
| **Three.js r128** | Renderizado 3D, carga GLTF, post-procesamiento |
| **Google Fonts** | Tipografía Inter (300, 400, 700) |

## 📁 Estructura del Proyecto

```
whitedemon-page/
├── assets/
│   ├── logo_wd.png        # Logo principal de Whitedemon
│   ├── manos.glb          # Modelo 3D de manos (GLTF Binary)
│   └── nv_merch.png       # Banner de nuevo merchandise
├── index.html             # Página principal
├── styles.css             # Estilos y diseño responsive
├── scripts.js             # Escena Three.js y lógica interactiva
└── README.md
```

## 🚀 Instalación y Uso

### Requisitos previos

- Un navegador moderno con soporte WebGL (Chrome, Firefox, Edge, Safari).
- Un servidor local para servir los archivos (necesario para la carga del modelo GLTF).

### Ejecución local

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/whitedemon-page.git
   cd whitedemon-page
   ```

2. **Inicia un servidor local** (elige una opción):

   ```bash
   # Con Python 3
   python -m http.server 8000

   # Con Node.js (npx)
   npx serve .

   # Con la extensión Live Server de VS Code
   # Click derecho en index.html → "Open with Live Server"
   ```

3. **Abre el navegador** en `http://localhost:8000`

> [!NOTE]
> Es necesario un servidor local porque los modelos `.glb` no se pueden cargar directamente desde el sistema de archivos debido a restricciones CORS del navegador.

## 🎨 Personalización

### Paleta de colores

Los colores se gestionan mediante variables CSS en `:root` dentro de `styles.css`:

```css
:root {
    --color-bg: #050505;
    --color-surface: #111111;
    --color-border: #222222;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a0a0a0;
    --color-accent: #ffffff;
}
```

### Shader de post-procesamiento

El valor `threshold` en `scripts.js` controla el punto de corte del efecto blanco/negro:

```js
"threshold": { value: 1 }  // Rango: 0.0 (todo blanco) — 1.0 (alto contraste)
```

### Modelo 3D

Para reemplazar el modelo, sustituye `assets/manos.glb` por tu propio archivo `.glb` y ajusta las escalas y posiciones en la función `getResponsiveParams()`.

## 📱 Breakpoints Responsive

| Breakpoint | Dispositivo | Comportamiento |
|---|---|---|
| `< 480px` | Móvil portrait | Menú hamburguesa, logo compacto |
| `≥ 480px` | Móvil landscape | Logo y tipografía ligeramente mayores |
| `≥ 768px` | Tablet | Menú horizontal visible, header centrado |
| `≥ 1024px` | Laptop | Sombras más pronunciadas en el canvas 3D |
| `≥ 1280px` | Desktop | Logo y merch a escala completa |
| `≥ 1920px` | Ultra-wide | Tamaño de logo limitado |

## ⚡ Rendimiento

- **Pixel ratio limitado** a `1` para evitar sobrecarga en pantallas de alta densidad.
- **Scripts `defer`** para no bloquear el renderizado inicial.
- **`preconnect`** a Google Fonts, cdnjs y jsDelivr para reducir latencia DNS.
- **Carga lazy** de imágenes secundarias con `loading="lazy"`.

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados © Whitedemon.

---

<div align="center">



</div>
