import { CONFIG } from './config.js';
// Genera un enlace de WhatsApp con el mensaje codificado correctamente.
export function buildWhatsAppLink(text = '') {
  const n = String(CONFIG.whatsapp).replace(/\D/g, '');
  return `https://wa.me/${n}` + (text ? `?text=${encodeURIComponent(text)}` : '');
}
export const msgGeneral = 'Hola, vi la página de Súper Naayk y me gustaría solicitar una cotización';
export const msgProduct = (name, unit) =>
  `Hola, me interesa cotizar ${name}${unit ? ` (${unit})` : ''}. ¿Me podrían compartir precios y tiempos de entrega?`;
