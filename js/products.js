// ÚNICA FUENTE DE DATOS de catálogo y precios.
// Para agregar un producto: copia una línea P(...) y cambia sus datos.
// Para ocultarlo: cambia visible a false (o bórralo). Para poner precio: price y priceConfirmed=true.
// unit: 'm2' | 'pieza' | 'paquete' | 'cotizacion'.  image: ruta como 'assets/img/products/lona.webp' o null.
export const CATEGORIES = [
  { id: 'gran-formato', name: 'Impresión de gran formato' },
  { id: 'sublimacion', name: 'Sublimación' },
  { id: 'otros', name: 'Otros servicios' }
];
const U = { m2: 'por metro cuadrado', pieza: 'por pieza', paquete: 'por paquete', cotizacion: 'Cotización personalizada' };
export const unitLabel = (u) => (u === 'cotizacion' ? '' : U[u] || '');
export const priceLabel = (p) =>
  p.priceConfirmed && p.price != null ? `Desde $${p.price} MXN ${U[p.unit]}` : 'Solicita cotización';
const P = (id, category, name, description, unit = 'cotizacion', price = null, priceConfirmed = false, presentation = 'Según medidas y cantidad') =>
  ({ id, category, name, description, image: null, unit, price, priceConfirmed, presentation, visible: true });

export const PRODUCTS = [
  // PRECIO DE PRUEBA: $20/m² por confirmar con el negocio
  P('lonas', 'gran-formato', 'Lonas impresas', 'Impresión de lonas en gran formato para negocios y eventos.', 'm2', 20, true, 'Por metro cuadrado'),
  P('vinil-adhesivo', 'gran-formato', 'Vinil adhesivo', 'Impresión en vinil adhesivo para superficies y rótulos.'),
  P('vinil-lona', 'gran-formato', 'Vinil sobre lona', 'Vinil aplicado sobre lona para anuncios.'),
  P('pendones', 'gran-formato', 'Pendones, banners y roll-ups', 'Material publicitario para exhibir tu marca.'),
  P('vinil-corte', 'gran-formato', 'Vinil de corte', 'Letras y figuras recortadas en vinil.'),
  P('rotulacion', 'gran-formato', 'Rotulación de vehículos y locales', 'Rotulación para vehículos y fachadas.'),
  P('playeras', 'sublimacion', 'Playeras personalizadas', 'Playeras con tu diseño sublimado.', 'pieza', null, false, 'Por pieza'),
  P('gorras', 'sublimacion', 'Gorras personalizadas', 'Gorras con tu diseño o logotipo.', 'pieza', null, false, 'Por pieza'),
  P('tazas', 'sublimacion', 'Tazas personalizadas', 'Tazas con fotos, frases o logotipos.', 'pieza', null, false, 'Por pieza'),
  P('termos', 'sublimacion', 'Termos', 'Termos personalizados para regalo o negocio.', 'pieza', null, false, 'Por pieza'),
  P('mousepads', 'sublimacion', 'Mousepads', 'Mousepads con diseño personalizado.', 'pieza', null, false, 'Por pieza'),
  P('rompecabezas', 'sublimacion', 'Rompecabezas', 'Rompecabezas con tu foto o ilustración.', 'pieza', null, false, 'Por pieza'),
  P('llaveros', 'sublimacion', 'Llaveros', 'Llaveros personalizados.', 'pieza', null, false, 'Por pieza'),
  P('cojines', 'sublimacion', 'Cojines', 'Cojines sublimados con tu diseño.', 'pieza', null, false, 'Por pieza'),
  P('tarjetas', 'otros', 'Tarjetas de presentación', 'Tarjetas para presentar tu negocio.'),
  P('volantes', 'otros', 'Volantes', 'Volantes para promocionar tu negocio o evento.'),
  P('lonas-eventos', 'otros', 'Lonas para eventos', 'Lonas y publicidad para celebraciones y eventos.'),
  P('uniformes', 'otros', 'Uniformes', 'Uniformes personalizados para equipos y empresas.'),
  P('regalos', 'otros', 'Regalos personalizados', 'Ideas de regalo con tu diseño.'),
  P('paquetes', 'otros', 'Paquetes para negocios y eventos', 'Combinaciones de productos a la medida.', 'paquete', null, false, 'Por paquete')
];
