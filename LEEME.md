# Blue Romance — Nuestra pedida de mano

Versión actualizada a partir del proyecto original publicado en `ramosaridd-lab/blue-romance-pedida`.

## ¿Cómo usar?
1. Abre la carpeta `blue-romance-pedida` en Visual Studio Code.
2. Edita `config.js` para modificar nombres, fecha, hora, local, dirección, WhatsApp y rutas de imágenes.
3. Reemplaza `assets/monograma.png` si deseas cambiar el diseño diagonal K & R. Ya está incluido.
4. Agrega la fotografía real como `assets/pareja.jpg`. Mientras falte, se verá un marcador floral, no una imagen rota.
5. Agrega tu música propia/licenciada a `assets/musica.mp3`. La música puede comenzar al pulsar «Ver invitación» y se controla con el botón flotante.
6. Publica todos los archivos en la raíz del mismo repositorio de GitHub y activa Pages desde la rama `main`, carpeta `/(root)`.

## ¿Qué hace?
- Al entrar solo se ve la portada. Los detalles se mantienen ocultos.
- Al tocar «Ver invitación», aparece la foto ovalada, el mensaje personal, la fecha/cuenta regresiva, el lugar y el RSVP.
- La imagen de WhatsApp está en `assets/portada-whatsapp.jpg` (1200×630).
- Las etiquetas Open Graph del `<head>` usan `https://ramosaridd-lab.github.io/blue-romance-pedida/`. Cambia esas URLs si publicas en otra dirección.
- WhatsApp puede guardar la imagen anterior en caché; después de publicar, prueba el enlace en otro chat.

## Publicar cambios en GitHub (terminal VS Code)
Si la carpeta ya está vinculada al repositorio:
```bash
git add .
git commit -m "Actualizar portada, monograma y vista previa WhatsApp"
git push origin main
```
Si descargaste este ZIP por separado, copia **su contenido** sobre la carpeta del proyecto local ya conectada a Git y luego usa los comandos anteriores.

## Nota de privacidad
El número de WhatsApp, dirección y demás datos de `config.js` serán públicos en GitHub Pages y en un repositorio público. Confirma que quieres compartirlos.


## Corrección del 8 de noviembre
Se corrigió un contenedor duplicado de `contenido-invitacion` y una fotografía duplicada en `index.html`, responsables de ocultar las secciones posteriores. Se mantiene la portada independiente y al pulsar «Ver invitación» se habilitan las cinco secciones.
