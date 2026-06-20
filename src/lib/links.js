import { config } from "../i18n/config.js";

// Build the WhatsApp click-to-chat link. Pass the active locale's message.
export function whatsappUrl(message = "") {
  const base = `https://wa.me/${config.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Cal.com public page link, used as a fallback when the inline embed handle
// is not configured yet.
export function calUrl() {
  return `https://cal.com/${config.calUsername}/${config.calEvent}`;
}

// True when a placeholder token has not been replaced with a real value yet.
export function isPlaceholder(value) {
  return typeof value === "string" && value.startsWith("{{") && value.endsWith("}}");
}
