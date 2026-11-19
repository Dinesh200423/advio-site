// ─────────────────────────────────────────────────────────────
// ADVIO site configuration — the only place contact details live.
// Anything left empty is hidden from the site (nothing is invented).
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'ADVIO',
  location: 'Chennai, India',

  // Contact options. Leave '' to hide.
  email: '',                // e.g. 'hello@yourdomain.com'
  whatsapp: '',             // international format, digits only, e.g. '919876543210'
  instagram: 'https://instagram.com/_advio_',

  // Enquiry form delivery. Create a free form at https://formspree.io (or any
  // service that accepts a JSON POST) and paste its endpoint here, e.g.
  // 'https://formspree.io/f/xxxxxxxx'. Can also be set with VITE_FORM_ENDPOINT.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};
