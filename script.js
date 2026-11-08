'use strict';
const cfg=window.INVITACION||{};
const $=id=>document.getElementById(id);
const filled=value=>typeof value==='string'&&value.trim().length>0;
const text=(id,value)=>{if($(id))$(id).textContent=value;};
const safeName=value=>filled(value)?value.trim():null;
function notify(message){const t=$('toast');t.textContent=message;t.classList.add('visible');clearTimeout(notify.timeout);notify.timeout=setTimeout(()=>t.classList.remove('visible'),3400)}
function clockTime(v){if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(v||''))return null;const [hh,mm]=v.split(':').map(Number);return `${hh%12||12}:${String(mm).padStart(2,'0')} ${hh>=12?'p. m.':'a. m.'}`}
const novio=safeName(cfg.novio),novia=safeName(cfg.novia);
document.querySelectorAll('[data-field]').forEach(el=>{const value=safeName(cfg[el.dataset.field]);if(value){el.textContent=value;el.classList.remove('placeholder')}});
text('monogram',safeName(cfg.iniciales)||(novio&&novia?`${novio[0].toUpperCase()} · ${novia[0].toUpperCase()}`:'♡'));
text('signoff',novio||'el novio');
if(novio&&novia)document.title=`${novio} y ${novia} · Nuestra pedida de mano`;
const dateOk=/^\d{4}-\d{2}-\d{2}$/.test(cfg.fecha||'');
let target=null;
if(dateOk){const [y,m,d]=cfg.fecha.split('-').map(Number);const [h,minute]=/^([01]\d|2[0-3]):[0-5]\d$/.test(cfg.hora||'')?cfg.hora.split(':').map(Number):[0,0];const candidate=new Date(y,m-1,d,h,minute);if(candidate.getFullYear()===y&&candidate.getMonth()===m-1&&candidate.getDate()===d){const label=new Intl.DateTimeFormat('es-PE',{weekday:'long'}).format(candidate);const month=new Intl.DateTimeFormat('es-PE',{month:'long',year:'numeric'}).format(candidate);text('weekday',label.toUpperCase());text('day-number',String(d));text('month-year',month.toUpperCase());if(clockTime(cfg.hora))text('time-label',`A las ${clockTime(cfg.hora)}`);target=clockTime(cfg.hora)?candidate:null;}}
function tick(){if(!target)return;const remaining=Math.max(0,target.getTime()-Date.now());const seconds=Math.floor(remaining/1000);const parts=[Math.floor(seconds/86400),Math.floor(seconds%86400/3600),Math.floor(seconds%3600/60),seconds%60];['days','hours','minutes','seconds'].forEach((id,i)=>text(id,String(parts[i]).padStart(2,'0')));text('count-note',remaining===0?'¡Llegó el día de nuestra pedida de mano!':'Contando los momentos para reunirnos.');}
if(target){tick();setInterval(tick,1000)}
if(filled(cfg.local))text('venue-name',cfg.local.trim());
if(filled(cfg.direccion))text('venue-address',cfg.direccion.trim());
const maps=$('maps-link');
const mapsUrl=filled(cfg.mapsUrl)?cfg.mapsUrl.trim():(filled(cfg.direccion)?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.direccion.trim())}`:null);
if(mapsUrl&&/^https:\/\//.test(mapsUrl)){maps.href=mapsUrl;maps.target='_blank';maps.rel='noopener noreferrer';maps.classList.remove('is-disabled');maps.removeAttribute('aria-disabled');maps.removeAttribute('tabindex')}
const wa=$('whatsapp-link');
const phone=(cfg.whatsapp||'').replace(/\D/g,'');
if(phone.length>=10&&phone.length<=15){const greeting=`Hola, confirmo mi asistencia a la pedida de mano${novio&&novia?` de ${novio} y ${novia}`:''}. ¡Muchas gracias por la invitación!`;wa.href=`https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`;wa.target='_blank';wa.rel='noopener noreferrer';wa.classList.remove('is-disabled');wa.removeAttribute('aria-disabled');wa.removeAttribute('tabindex')}
if(filled(cfg.fechaLimiteRSVP)){const limit=$('rsvp-limit');limit.hidden=false;limit.textContent=`Agradeceré tu confirmación antes del ${cfg.fechaLimiteRSVP.trim()}.`}
const audio=$('music');const musicBtn=$('music-toggle');if(filled(cfg.musica))audio.src=cfg.musica;function syncMusic(){const playing=!audio.paused;musicBtn.classList.toggle('playing',playing);musicBtn.setAttribute('aria-pressed',String(playing));musicBtn.setAttribute('aria-label',playing?'Pausar música':'Activar música');musicBtn.title=playing?'Pausar música':'Activar música';musicBtn.textContent=playing?'♫':'♪'}
async function toggleMusic(){if(!audio.src){notify('Agrega tu archivo MP3 en assets/musica.mp3.');return}if(audio.paused){try{await audio.play()}catch(e){notify('Para escuchar música, agrega un archivo MP3 en assets/musica.mp3.')}}else audio.pause();syncMusic()}
musicBtn.addEventListener('click',toggleMusic);audio.addEventListener('pause',syncMusic);audio.addEventListener('play',syncMusic);audio.addEventListener('error',()=>{syncMusic();notify('Todavía falta colocar el archivo de música MP3.')});
$('abrir').addEventListener('click',()=>{$('mensaje').scrollIntoView({behavior:'smooth'});if(audio.paused&&audio.src)toggleMusic()});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.body.classList.add('js-ready')}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
