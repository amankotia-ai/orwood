"use client";

import { useState, useRef, useCallback, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import posthog from "posthog-js";
import { sectors } from "@/lib/content";
import { Arrow } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Form = {
  name: string;
  email: string;
  company: string;
  country: string;
  projectType: string;
  budget: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  company: "",
  country: "",
  projectType: "",
  budget: "",
  message: "",
};

const BUDGETS = [
  "Under $250k",
  "$250k – $1M",
  "$1M – $5M",
  "$5M+",
  "Not sure yet",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactForm({
  defaultProjectType,
  referrerProject,
}: {
  defaultProjectType?: string;
  referrerProject?: string;
} = {}) {
  const [form, setForm] = useState<Form>({
    ...EMPTY,
    ...(defaultProjectType ? { projectType: defaultProjectType } : {}),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formStartFired = useRef(false);

  const fireFormStart = useCallback(() => {
    if (formStartFired.current) return;
    formStartFired.current = true;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "form_start", { form_name: "contact", page: "/contact" });
    }
    posthog.capture("contact_form_started", {
      referrer_project: referrerProject ?? null,
    });
  }, [referrerProject]);

  const update =
    (key: keyof Form) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      fireFormStart();
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  function validate() {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Please add your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Tell us a little about the project";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Posts to /api/contact — a stub that accepts the enquiry. Wire that
      // route to a mail provider (Resend / Formspree / CRM) to deliver it.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...(referrerProject
            ? { _attribution: { referrerProject } }
            : {}),
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          project_type: form.projectType,
          budget: form.budget,
          country: form.country,
          page: "/contact",
        });
      }
      posthog.capture("contact_form_submitted", {
        project_type: form.projectType,
        budget: form.budget,
        country: form.country,
        referrer_project: referrerProject ?? null,
      });

      setSent(true);
    } catch {
      setErrors((er) => ({
        ...er,
        message: "Something went wrong — please email us directly.",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex min-h-[24rem] flex-col justify-center border-t border-line"
        >
          <span className="label text-clay">Message sent</span>
          <h3 className="mt-5 text-[clamp(1.8rem,4vw,2.8rem)]">
            Thank you, {form.name.split(" ")[0] || "there"}.
          </h3>
          <p className="mt-4 max-w-md text-stone">
            We&apos;ve received your note and will be in touch within two working
            days. For anything urgent, call the studio directly.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setSent(false);
            }}
            className="group mt-8 inline-flex items-center gap-2 self-start label text-ink"
          >
            <span className="link-underline group-hover:link-underline-on pb-1">
              Send another
            </span>
            <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-9"
        >
          <div className="grid gap-9 sm:grid-cols-2">
            <Field
              label="Name"
              required
              value={form.name}
              onChange={update("name")}
              error={errors.name}
              placeholder="Jane Cooper"
              autoComplete="name"
            />
            <Field
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
              placeholder="jane@studio.com"
              autoComplete="email"
            />
          </div>

          <div className="grid gap-9 sm:grid-cols-2">
            <Field
              label="Company"
              value={form.company}
              onChange={update("company")}
              placeholder="Optional"
              autoComplete="organization"
            />
            <Field
              label="Country"
              value={form.country}
              onChange={update("country")}
              placeholder="Where is the project?"
              autoComplete="country-name"
            />
          </div>

          <div className="grid gap-9 sm:grid-cols-2">
            <Select
              label="Project type"
              value={form.projectType}
              onChange={update("projectType")}
              placeholder="Select a sector…"
              options={[...sectors.map((s) => s.title), "Not sure yet"]}
            />
            <Select
              label="Budget range"
              value={form.budget}
              onChange={update("budget")}
              placeholder="Select a range…"
              options={BUDGETS}
            />
          </div>

          <label className="block">
            <span className="label text-ink">
              Project <span className="text-clay">*</span>
            </span>
            <textarea
              value={form.message}
              onChange={update("message")}
              required
              rows={4}
              placeholder="What are you building, where, and by when?"
              aria-invalid={!!errors.message}
              className={cn(
                "mt-3 w-full resize-none border-b bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-stone focus:border-ink focus-visible:outline-2 focus-visible:outline-clay focus-visible:outline-offset-2",
                errors.message ? "border-clay" : "border-line"
              )}
            />
            {errors.message && (
              <span className="mt-2 block text-sm text-clay">
                {errors.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[0.82rem] font-medium tracking-wide text-bone transition-colors duration-300 hover:bg-clay disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="label text-ink">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={cn(
          "mt-3 w-full border-b bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-stone focus:border-ink focus-visible:outline-2 focus-visible:outline-clay focus-visible:outline-offset-2",
          error ? "border-clay" : "border-line"
        )}
      />
      {error && <span className="mt-2 block text-sm text-clay">{error}</span>}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="label text-ink">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className={cn(
          "mt-3 w-full appearance-none border-b border-line bg-transparent pb-3 text-lg outline-none transition-colors focus:border-ink focus-visible:outline-2 focus-visible:outline-clay focus-visible:outline-offset-2",
          value ? "text-ink" : "text-stone-soft"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
