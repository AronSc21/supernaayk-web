// CONFIGURACIÓN CENTRAL. Todos los datos son DE PRUEBA para el prototipo.
// Un valor vacío ('') oculta ese dato en la web. Confirma cada uno antes de publicar.
export const CONFIG = {
  name: 'Súper Naayk',
  whatsapp: '522281256779',          // PRUEBA: formato internacional, sin + ni espacios
  phone: '522281256779',             // PRUEBA: vacío '' oculta el botón "Llamar"
  phoneDisplay: '228 125 6779',
  email: 'supernike@gmail.com',      // PRUEBA
  address: 'Bodega Aurrera Casablanca, Xalapa, Veracruz', // PRUEBA
  hours: 'Lunes a sábado, 8:00 a 18:00 h',                // PRUEBA
  social: {                          // PRUEBA: confirmar que son del negocio
    Facebook: 'https://www.facebook.com/share/14oy7V2dUP6/?mibextid=wwXIfr',
    Instagram: 'https://www.instagram.com/aronms_/'
  },
  // Servicio de formularios (Formspree, Web3Forms...). Vacío = el formulario continúa por WhatsApp.
  formEndpoint: ''
};
