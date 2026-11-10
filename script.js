
'use strict';

// =====================================================
// 1. CONFIGURACIÓN Y FUNCIONES GENERALES
// =====================================================

const cfg = window.INVITACION || {};

const $ = (id) => document.getElementById(id);

const filled = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const safeName = (value) =>
  filled(value) ? value.trim() : null;

function text(id, value) {
  const element = $(id);

  if (element) {
    element.textContent = value;
  }
}

function notify(message) {
  const toast = $('toast');

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(notify.timeout);

  notify.timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3400);
}

function clockTime(value) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value || '')) {
    return null;
  }

  const [hours, minutes] = value.split(':').map(Number);

  const hour12 = hours % 12 || 12;
  const period = hours >= 12 ? 'p. m.' : 'a. m.';

  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}


// =====================================================
// 2. NOMBRES DE LOS NOVIOS
// =====================================================

const novio = safeName(cfg.novio);
const novia = safeName(cfg.novia);

// Completar automáticamente los campos del HTML
document.querySelectorAll('[data-field]').forEach((element) => {
  const value = safeName(cfg[element.dataset.field]);

  if (value) {
    element.textContent = value;
    element.classList.remove('placeholder');
  }
});

// Despedida: mostrar ambos nombres
const nombresPareja = [novio, novia].filter(Boolean).join(' y ');

text('signoff', nombresPareja || 'Kennedy y Rosa');

// Título de la pestaña del navegador
if (novio && novia) {
  document.title = `${novio} y ${novia} · Nuestra Pedida de Mano`;
}


// =====================================================
// 3. MONOGRAMA PERSONALIZADO
// =====================================================

const monogramImage = $('monogram-image');

if (monogramImage && filled(cfg.monograma)) {
  monogramImage.src = cfg.monograma.trim();
}


// =====================================================
// 4. FECHA Y HORA DEL EVENTO
// =====================================================

let target = null;

const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(cfg.fecha || '');

if (dateOk) {
  const [year, month, day] = cfg.fecha.split('-').map(Number);

  const validTime = clockTime(cfg.hora);

  const [hours, minutes] = validTime
    ? cfg.hora.split(':').map(Number)
    : [0, 0];

  const eventDate = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes
  );

  const validDate =
    eventDate.getFullYear() === year &&
    eventDate.getMonth() === month - 1 &&
    eventDate.getDate() === day;

  if (validDate) {
    const weekday = new Intl.DateTimeFormat('es-PE', {
      weekday: 'long'
    }).format(eventDate);

    const monthYear = new Intl.DateTimeFormat('es-PE', {
      month: 'long',
      year: 'numeric'
    }).format(eventDate);

    text('weekday', weekday.toUpperCase());
    text('day-number', String(day));
    text('month-year', monthYear.toUpperCase());

    if (validTime) {
      text('time-label', `A las ${validTime}`);
      target = eventDate;
    }
  }
}


// =====================================================
// 5. CUENTA REGRESIVA
// =====================================================

function updateCountdown() {
  if (!target) return;

  const remaining = Math.max(
    0,
    target.getTime() - Date.now()
  );

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  const values = {
    days,
    hours,
    minutes,
    seconds
  };

  Object.entries(values).forEach(([id, value]) => {
    text(id, String(value).padStart(2, '0'));
  });

  if (remaining === 0) {
    text(
      'count-note',
      '¡Llegó el día de nuestra pedida de mano!'
    );
  } else {
    text(
      'count-note',
      'Contando los momentos para reunirnos.'
    );
  }
}

if (target) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}


// =====================================================
// 6. LUGAR DEL EVENTO Y GOOGLE MAPS
// =====================================================



if (filled(cfg.direccion)) {
  text('venue-address', cfg.direccion.trim());
}

const maps = $('maps-link');

const mapsUrl = filled(cfg.mapsUrl)
  ? cfg.mapsUrl.trim()
  : filled(cfg.direccion)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.direccion.trim())}`
    : null;

if (maps && mapsUrl && /^https:\/\//i.test(mapsUrl)) {
  maps.href = mapsUrl;
  maps.target = '_blank';
  maps.rel = 'noopener noreferrer';

  maps.classList.remove('is-disabled');
  maps.removeAttribute('aria-disabled');
  maps.removeAttribute('tabindex');
}


// =====================================================
// 7. CONFIRMACIÓN POR WHATSAPP
// =====================================================

const whatsappButton = $('whatsapp-link');

const phone = String(cfg.whatsapp || '').replace(/\D/g, '');

if (
  whatsappButton &&
  phone.length >= 10 &&
  phone.length <= 15
) {
  const coupleText = novio && novia
    ? ` de ${novio} y ${novia}`
    : '';

  const message =
    `Hola, confirmo mi asistencia a la pedida de mano${coupleText}. ` +
    '¡Muchas gracias por la invitación!';

  whatsappButton.href =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  whatsappButton.target = '_blank';
  whatsappButton.rel = 'noopener noreferrer';

  whatsappButton.classList.remove('is-disabled');
  whatsappButton.removeAttribute('aria-disabled');
  whatsappButton.removeAttribute('tabindex');
}

// Fecha límite para confirmar asistencia
if (filled(cfg.fechaLimiteRSVP)) {
  const limit = $('rsvp-limit');

  if (limit) {
    limit.hidden = false;

    limit.textContent =
      `Agradeceré tu confirmación antes del ${cfg.fechaLimiteRSVP.trim()}.`;
  }
}


// =====================================================
// 8. MÚSICA DE FONDO
// =====================================================

const audio = $('music');
const musicButton = $('music-toggle');

if (audio && filled(cfg.musica)) {
  audio.src = cfg.musica.trim();
  audio.volume = 1;
  audio.muted = false;
}

function syncMusic() {
  if (!audio || !musicButton) return;

  const playing = !audio.paused;

  musicButton.classList.toggle('playing', playing);
  musicButton.setAttribute('aria-pressed', String(playing));

  const label = playing
    ? 'Pausar música'
    : 'Activar música';

  musicButton.setAttribute('aria-label', label);
  musicButton.title = label;
  musicButton.textContent = playing ? '♫' : '♪';
}

async function toggleMusic() {
  if (!audio || !audio.getAttribute('src')) {
    notify('No se ha configurado la música.');
    return;
  }

  if (!audio.paused) {
    audio.pause();
    syncMusic();
    return;
  }

  try {
    audio.muted = false;
    audio.volume = 1;

    await audio.play();
  } catch (error) {
    console.error('Error al reproducir música:', error);

    notify(
      'No se pudo reproducir la música. Verifica el formato del archivo.'
    );
  }

  syncMusic();
}

if (audio) {
  audio.addEventListener('play', syncMusic);
  audio.addEventListener('pause', syncMusic);
  audio.addEventListener('ended', syncMusic);

  audio.addEventListener('error', () => {
    syncMusic();

    notify(
      'No se pudo cargar el archivo de música.'
    );
  });
}

if (musicButton) {
  musicButton.addEventListener('click', toggleMusic);
}

syncMusic();


// =====================================================
// 9. FOTOGRAFÍA DE KENNEDY Y ROSA
// =====================================================

const photo = $('couple-photo');
const photoFallback = $('couple-photo-placeholder');

function handlePhotoError() {
  if (photo) photo.hidden = true;
  if (photoFallback) photoFallback.hidden = false;
}

if (photo) {
  if (filled(cfg.fotoPareja)) {
    photo.src = cfg.fotoPareja.trim();
  }

  photo.addEventListener('error', handlePhotoError);

  photo.addEventListener('load', () => {
    photo.hidden = false;

    if (photoFallback) {
      photoFallback.hidden = true;
    }
  });

  if (photo.complete && photo.naturalWidth === 0) {
    handlePhotoError();
  }
}


// =====================================================
// 10. ABRIR LA INVITACIÓN
// =====================================================

const details = $('contenido-invitacion');
const openButton = $('abrir');

let invitationOpened = false;

if (openButton && details) {
  openButton.addEventListener('click', () => {
    if (invitationOpened) return;

    invitationOpened = true;

    // Mostrar todas las secciones
    details.hidden = false;

    openButton.setAttribute(
      'aria-expanded',
      'true'
    );

    // Iniciar música al abrir la invitación
    if (audio && audio.getAttribute('src') && audio.paused) {
      toggleMusic();
    }

    // Mostrar las secciones y desplazarse a la fotografía
    requestAnimationFrame(() => {
      details.querySelectorAll('.reveal').forEach((section) => {
        section.classList.add('visible');
      });

      const photoSection = $('foto-pareja');

      if (photoSection) {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        photoSection.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
}


// =====================================================
// 11. ANIMACIONES AL DESPLAZARSE
// =====================================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  document.body.classList.add('js-ready');
} else {
  revealElements.forEach((element) => {
    element.classList.add('visible');
  });
}
