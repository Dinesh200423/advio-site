// ─────────────────────────────────────────────────────────────
// ADVIO site configuration — the only place contact details live.
// Anything left empty is hidden from the site (nothing is invented).
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'ADVIO',
  location: 'Chennai, India',

  // Contact options. Leave '' to hide.
  email: '',                // e.g. 'hello@yourdomain.com'
  whatsapp: '918939127720', // international format, digits only (+91 89391 27720)
  whatsappDisplay: '+91 89391 27720',

  // Optional line shown on the Contact page, e.g. 'Typically replies within 1 business day.'
  // Leave '' to hide it. Only add a promise you can keep.
  replyNote: '',
  instagram: 'https://instagram.com/advio.in',
  instagramHandle: 'advio.in',

  // Enquiry form delivery. Create a free form at https://formspree.io (or any
  // service that accepts a JSON POST) and paste its endpoint here, e.g.
  // 'https://formspree.io/f/xxxxxxxx'. Can also be set with VITE_FORM_ENDPOINT.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};
