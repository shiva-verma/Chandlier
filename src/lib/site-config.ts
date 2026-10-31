export const siteConfig = {
  name: "Tejora",
  tagline: "Light, sculpted.",
  description:
    "Tejora crafts statement chandeliers and precision smart lighting for interiors that deserve to be remembered.",
  /**
   * Inquiry is intentionally limited to WhatsApp + email only.
   * Update these two values to point at the real store.
   */
  whatsapp: {
    /** International format without + or spaces, e.g. 91 for India. */
    number: "919000000000",
    display: "+91 90000 00000",
  },
  email: "concierge@tejora.com",
  address: "12 Studio Lane, Design District, Mumbai 400001",
  hours: "Mon–Sat · 10:00 – 20:00 IST",
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
  },
  freeShippingThreshold: 5000000, // ₹50,000 in paise
  shippingFlat: 99000, // ₹990 in paise
  adminPasswordEnv: "ADMIN_PASSWORD",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}
