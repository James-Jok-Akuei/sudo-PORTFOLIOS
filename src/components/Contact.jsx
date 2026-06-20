import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../i18n/LanguageContext.jsx";
import { whatsappUrl, isPlaceholder } from "../lib/links.js";
import { fadeRise } from "../lib/motion.js";
import Section from "./ui/Section.jsx";
import Eyebrow from "./ui/Eyebrow.jsx";
import CommandButton from "./ui/CommandButton.jsx";

export default function Contact() {
  const { brand, contact } = useContent();
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const formReady = !isPlaceholder(brand.web3formsKey);

  async function onSubmit(e) {
    e.preventDefault();
    if (!formReady) return;
    setStatus("sending");
    const data = new FormData(e.target);
    data.append("access_key", brand.web3formsKey);
    data.append("subject", "New .sudo PORTFOLIOS inquiry");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldBase =
    "w-full rounded-md border border-border bg-ink px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none";

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* WhatsApp — the primary path */}
        <motion.div variants={fadeRise}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-3 max-w-md text-text-muted">{contact.body}</p>

          <div className="mt-8 rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {contact.whatsappLabel}
            </p>
            <p className="mt-3 text-sm text-text-muted">{contact.whatsappHint}</p>
            <div className="mt-5">
              <CommandButton href={whatsappUrl(brand.whatsappMessage)}>
                {contact.whatsappCta}
              </CommandButton>
            </div>
          </div>
        </motion.div>

        {/* Backup form */}
        <motion.form
          variants={fadeRise}
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            {contact.formTitle}
          </p>

          {/* Web3Forms honeypot: hidden from humans, bots tick it and get
              rejected. Kept out of the tab order and the accessibility tree. */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {contact.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={field.name}
                className="font-mono text-xs text-text-muted"
              >
                {field.label}
                {field.required && <span className="text-accent"> *</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  className={fieldBase}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className={fieldBase}
                >
                  <option value="" disabled>
                    {contact.selectPlaceholder}
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className={fieldBase}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={status === "sending" || !formReady}
            className="mt-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-ink transition-all hover:bg-accent-deep hover:shadow-accent-glow disabled:opacity-60"
          >
            {status === "sending" ? contact.sending : contact.submit}
          </button>

          {!formReady && (
            <p className="font-mono text-xs text-text-muted">{contact.pending}</p>
          )}
          {status === "ok" && (
            <p className="font-mono text-xs text-accent">{contact.success}</p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-[#ff6b6b]">{contact.error}</p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
