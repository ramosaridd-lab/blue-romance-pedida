# Blue Romance — Invitación web para pedida de mano

Diseño pensado para móvil, en tonos marfil y azul empolvado. Contiene portada floral directa, mensaje en primera persona del novio, cuenta regresiva, un solo local, confirmación por WhatsApp y música opcional. **Sin galería, itinerario ni ceremonia civil.**

## Personalización (sin editar el diseño)

1. Abre `config.js` con VS Code o un editor de texto.
2. Completa los campos que están entre comillas: `novio`, `novia`, `fecha` (`AAAA-MM-DD`), `hora` (`HH:MM` en formato de 24 horas), `local`, `direccion`, `mapsUrl`, `whatsapp` (código de país + teléfono, solo números) y `fechaLimiteRSVP` (opcional).
3. Para la música, guarda **tu propio archivo autorizado** como `assets/musica.mp3`. Este ZIP no incluye música. Reproducción al pulsar «Ver invitación» o el botón flotante.
4. Abre `index.html` para previsualizar. Idealmente usa la extensión Live Server de VS Code para verlo desde un servidor local.

Si dejas valores vacíos, se mostrarán textos como «Nombre del novio», «Fecha por confirmar» y «Dirección por completar». Los botones de Google Maps y WhatsApp se activan cuando agregas sus datos. No se envía información a ningún servidor propio.

## Publicación en GitHub Pages

1. Crea un repositorio público (por ejemplo `blue-romance-pedida`) en GitHub.
2. Sube `index.html`, `styles.css`, `script.js`, `config.js` y la carpeta `assets` manteniendo la estructura.
3. En **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**, rama **main** y carpeta **/(root)**. Guarda.
4. La dirección suele ser `https://TU-USUARIO.github.io/blue-romance-pedida/`.
5. Cada vez que edites `config.js` y subas el cambio, se actualizan los datos visibles.

## Archivos
- `index.html`: estructura de la invitación.
- `styles.css`: colores, tipografías, composición y animaciones.
- `script.js`: cuenta regresiva, botones, música, visibilidad.
- `config.js`: **único archivo de datos a completar**.
- `assets/floral-esquina.svg` y `assets/floral-centro.svg`: ilustraciones florales originales en SVG transparente, listas para usarse en la web.

Nota: las flores son ilustraciones SVG decorativas originales; están inspiradas en la paleta y distribución de la maqueta, pero no son recortes idénticos de la imagen conceptual.
