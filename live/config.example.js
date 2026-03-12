// ═══════════════════════════════════════════════════════════════
// CREAFILMS LIVE — Configuración global (EJEMPLO)
// ═══════════════════════════════════════════════════════════════
//
// INSTRUCCIONES:
// 1. Copia este archivo: cp live/config.example.js live/config.js
// 2. Reemplaza los valores con tus credenciales reales
// 3. NUNCA subas config.js a GitHub (está en .gitignore)
//
// ═══════════════════════════════════════════════════════════════

const CONFIG = {

  // Supabase — obtener en supabase.com/dashboard
  // Tu proyecto → Connect → App Frameworks
  supabaseUrl: 'https://TU-PROJECT-ID.supabase.co',
  supabaseKey: 'sb_TU-PUBLISHABLE-KEY-AQUI',

  // WhatsApp Business
  whatsappNumero: '521XXXXXXXXXX', // Formato: 521 + 10 dígitos sin espacios
  whatsappMensaje: 'Hola, me interesa cotizar transmisión en vivo para mi boda en Puerto Vallarta',

  // Estudio
  nombreEstudio: 'CreaFilms',
  sitioWeb: 'estudiocreafilms.com',
  urlSitio: 'https://estudiocreafilms.com'

};

// ═══════════════════════════════════════════════════════════════
// Funciones auxiliares — no modificar
// ═══════════════════════════════════════════════════════════════

CONFIG.getWhatsAppURL = function() {
  const msg = encodeURIComponent(this.whatsappMensaje);
  return `https://wa.me/${this.whatsappNumero}?text=${msg}`;
};

CONFIG.isConfigured = function() {
  return this.supabaseUrl !== 'https://TU-PROJECT-ID.supabase.co' &&
         this.supabaseKey !== 'sb_TU-PUBLISHABLE-KEY-AQUI';
};
