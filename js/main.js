import { CONFIG } from './config.js';
import { PRODUCTS, CATEGORIES, priceLabel, unitLabel } from './products.js';
import { GALLERY, GALLERY_CATEGORIES } from './gallery.js';
import { buildWhatsAppLink, msgGeneral, msgProduct } from './whatsapp.js';

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, props = {}, ...kids) => { const e = document.createElement(tag); Object.assign(e, props); e.append(...kids); return e; };
const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || '';

/* Menú móvil */
const nav = $('.nav'), toggle = $('.nav__toggle');
const setMenu = (open) => {
  nav.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('nav-open')));
$('#menu').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* Vistas: cada apartado es una pantalla distinta (enrutado por #hash) */
const links = [...document.querySelectorAll('#menu a[href^="#"]')];
const views = [...document.querySelectorAll('[data-view]')];
const names = new Set(views.map((v) => v.dataset.view));
const TITLES = { nosotros: 'Nosotros', servicios: 'Servicios y productos', precios: 'Precios', galeria: 'Galería', 'como-pedir': 'Cómo pedir', faq: 'Preguntas frecuentes', contacto: 'Contacto' };
const BASE_TITLE = document.title;
function route() {
  const raw = location.hash.slice(1);
  if (raw === 'contenido') return; // enlace "saltar al contenido"
  const name = names.has(raw) ? raw : 'inicio';
  views.forEach((v) => (v.hidden = v.dataset.view !== name));
  links.forEach((a) => {
    const on = a.getAttribute('href') === '#' + name;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  document.title = TITLES[name] ? `${TITLES[name]} | Súper Naayk` : BASE_TITLE;
  window.scrollTo({ top: 0, behavior: 'instant' });
  const h = document.querySelector(`[data-view="${name}"] h1, [data-view="${name}"] h2`);
  if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
}
window.addEventListener('hashchange', route);

/* Animación escalonada de elementos (se reinicia al mostrar una vista) */
function stagger(box) { [...box.children].forEach((c, i) => { c.classList.add('rise'); c.style.setProperty('--i', Math.min(i, 10)); }); }

/* Brillo que sigue al cursor en botones y tarjetas */
document.addEventListener('pointermove', (e) => {
  const t = e.target.closest && e.target.closest('.btn,.card,.perks li,.why li,.price-list li');
  if (t) { const r = t.getBoundingClientRect(); t.style.setProperty('--mx', e.clientX - r.left + 'px'); t.style.setProperty('--my', e.clientY - r.top + 'px'); }
});

/* WhatsApp general y contacto desde config */
document.querySelectorAll('[data-wa="general"]').forEach((a) => (a.href = buildWhatsAppLink(msgGeneral)));
const call = $('#call-btn');
if (CONFIG.phone) call.href = `tel:+${CONFIG.phone}`; else call.hidden = true;
const info = $('#info');
const addInfo = (label, node) => info.append(el('li', {}, el('b', { textContent: label + ': ' }), node));
addInfo('WhatsApp', el('a', { href: buildWhatsAppLink(msgGeneral), target: '_blank', rel: 'noopener noreferrer', textContent: CONFIG.phoneDisplay || CONFIG.whatsapp }));
if (CONFIG.email) addInfo('Correo', el('a', { href: `mailto:${CONFIG.email}`, textContent: CONFIG.email }));
if (CONFIG.address) addInfo('Dirección', document.createTextNode(CONFIG.address));
if (CONFIG.hours) addInfo('Horario', document.createTextNode(CONFIG.hours));
Object.entries(CONFIG.social).forEach(([n, url]) => {
  if (url) $('#social').append(el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', textContent: n, ariaLabel: `${n} de ${CONFIG.name}` }));
});

/* Filtros reutilizables */
function makeFilters(box, options, onChange) {
  const all = [{ id: 'todos', name: 'Todos' }, ...options];
  all.forEach((o, i) => {
    const b = el('button', { type: 'button', textContent: o.name });
    b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', () => {
      box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      onChange(o.id);
    });
    box.append(b);
  });
}

/* Catálogo */
const visible = PRODUCTS.filter((p) => p.visible);
const grid = $('#catalog-grid');
function renderCatalog(cat) {
  grid.replaceChildren(...visible.filter((p) => cat === 'todos' || p.category === cat).map((p) => {
    const thumb = p.image
      ? el('img', { src: p.image, alt: p.name, loading: 'lazy', width: 400, height: 300, className: 'thumb-img' })
      : el('div', { className: `thumb thumb--${p.category}`, textContent: 'Imagen de referencia próximamente' });
    return el('article', { className: 'card card--prod' }, thumb, el('h3', { textContent: p.name }),
      el('p', { textContent: p.description }), el('p', { className: 'price', textContent: priceLabel(p) }),
      el('a', { className: 'btn btn--cta', href: buildWhatsAppLink(msgProduct(p.name, unitLabel(p.unit))), target: '_blank', rel: 'noopener noreferrer', textContent: 'Cotizar por WhatsApp' }));
  }));
  stagger(grid);
}
makeFilters($('#catalog-filters'), CATEGORIES, renderCatalog);
renderCatalog('todos');

/* Tabla de precios (misma fuente: PRODUCTS) y selector del formulario */
$('#price-table').append(el('ul', { className: 'price-list' }, ...visible.map((p) =>
  el('li', {}, el('strong', { textContent: p.name }), el('span', { textContent: p.presentation }),
    el('span', { className: 'price', textContent: priceLabel(p) })))));
const sel = $('#f-producto');
visible.forEach((p) => sel.append(el('option', { value: p.name, textContent: p.name })));

/* Galería con lightbox (solo si hay trabajos reales) */
if (GALLERY.length) {
  const dlg = el('dialog', { className: 'lightbox' });
  const big = el('img', { alt: '' }), cap = el('p');
  dlg.append(el('button', { className: 'lb-close', type: 'button', ariaLabel: 'Cerrar', textContent: '×' }), big, cap);
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb-close')) dlg.close(); });
  document.body.append(dlg); // Escape cierra el <dialog> de forma nativa
  const gg = $('#gallery-grid');
  const renderG = (cat) => gg.replaceChildren(...GALLERY.filter((g) => cat === 'todos' || g.category === cat).map((g) => {
    const b = el('button', { type: 'button', className: 'gitem' }, el('img', { src: g.src, alt: g.alt, width: g.width, height: g.height, loading: 'lazy' }));
    b.addEventListener('click', () => { big.src = g.src; big.alt = g.alt; cap.textContent = g.alt; dlg.showModal(); });
    return b;
  }));
  makeFilters($('#gallery-filters'), GALLERY_CATEGORIES.map((c) => ({ id: c, name: c })), renderG);
  renderG('todos');
}

/* Formulario: validación y continuación por WhatsApp (no se envía correo sin integración real) */
const form = $('#contact-form'), status = $('#form-status');
if (CONFIG.formEndpoint) form.querySelector('button[type=submit]').textContent = 'Enviar mensaje';
function setErr(input, msg) {
  let n = input.nextElementSibling;
  if (!n || !n.classList.contains('error')) { n = el('p', { className: 'error', id: input.id + '-err' }); input.after(n); }
  n.textContent = msg;
  input.setAttribute('aria-invalid', String(!!msg));
  input.setAttribute('aria-describedby', n.id);
  return !msg;
}
function validate() {
  const f = form.elements, bad = [];
  const chk = (input, msg) => { if (!setErr(input, msg)) bad.push(input); };
  chk(f.nombre, f.nombre.value.trim().length < 2 ? 'Escribe tu nombre.' : '');
  chk(f.telefono, f.telefono.value.replace(/\D/g, '').length < 8 ? 'Escribe un teléfono válido (mínimo 8 dígitos).' : '');
  chk(f.correo, f.correo.value && !/^\S+@\S+\.\S+$/.test(f.correo.value) ? 'El correo no parece válido.' : '');
  chk(f.mensaje, f.mensaje.value.trim().length < 5 ? 'Cuéntanos brevemente qué necesitas.' : '');
  if (bad.length) bad[0].focus();
  return !bad.length;
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) { status.textContent = 'Revisa los campos marcados.'; return; }
  const f = form.elements;
  const text = `Hola, soy ${f.nombre.value.trim()}. Me interesa ${f.producto.value || 'solicitar una cotización'}. ${f.mensaje.value.trim()} Mi teléfono: ${f.telefono.value.trim()}${f.correo.value ? `. Correo: ${f.correo.value.trim()}` : ''}`;
  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!r.ok) throw new Error();
      form.reset(); status.textContent = 'Mensaje enviado. Gracias.';
    } catch { status.textContent = 'No se pudo enviar. Puedes escribirnos por WhatsApp.'; }
  } else {
    window.open(buildWhatsAppLink(text), '_blank', 'noopener');
    status.textContent = 'Abrimos WhatsApp con tus datos. Recuerda pulsar "enviar" ahí; este formulario no envía correos.';
  }
});

/* Final: animaciones escalonadas y primera vista */
document.querySelectorAll('.perks,.why,.steps,.price-list,.faq,.photos,.cards--3').forEach(stagger);
route();
