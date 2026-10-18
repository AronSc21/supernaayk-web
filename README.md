# Súper Naayk — prototipo web estático

## Abrir en Visual Studio Code
1. Archivo > Abrir carpeta > `supernaayk`.
2. Instala la extensión **Live Server**, clic derecho en `index.html` > "Open with Live Server".
   (No funciona con doble clic: los módulos JS requieren servidor.)

## Navegación
Cada apartado es una vista distinta (enrutado por #hash en `js/main.js`). Para agregar una vista nueva: crea un `<section data-view="nombre" hidden>` en `index.html`, un enlace `#nombre` en el menú y su título en `TITLES`.

## Dónde editar
- `js/config.js`: WhatsApp, teléfono, correo, dirección, horarios, redes, endpoint del formulario. Un valor vacío oculta ese dato.
- `js/products.js`: catálogo y precios (una sola fuente). Instrucciones al inicio del archivo.
- `js/gallery.js`: trabajos reales. Fotos en `assets/img/gallery/`.
- Logo: reemplaza `assets/img/logo/logo-supernaayk.jpeg` (si el nuevo tiene fondo transparente, quita el fondo negro de `.hero__panel` en `css/styles.css`).

## Antes de publicar (todo es dato de prueba)
Confirmar WhatsApp, redes, correo, dirección, horarios, precios ($20/m² de lona), ventajas ("entrega rápida", "precios competitivos"), historia, FAQ y aviso de privacidad (`privacidad.html`). Cambiar `TU-DOMINIO` en `robots.txt` y `sitemap.xml`. Agregar JSON-LD LocalBusiness solo con datos verificados.

## Publicar gratis (Cloudflare Pages)
1. Sube la carpeta a un repositorio de GitHub.
2. En Cloudflare Pages: Create project > Connect to Git > elige el repositorio; build command vacío; output directory `/`.
3. Obtendrás `proyecto.pages.dev` con HTTPS. Cada `git push` actualiza la web.
Alternativa: GitHub Pages (Settings > Pages). El dominio propio tiene costo.

## Limitaciones
- El formulario NO envía correos: continúa por WhatsApp. Para correo real, crea un formulario en Formspree/Web3Forms y pon su URL en `formEndpoint`.
- No hay panel de administración: se edita `products.js`.
- Analytics y Meta Pixel no están incluidos; requieren IDs y consentimiento.
