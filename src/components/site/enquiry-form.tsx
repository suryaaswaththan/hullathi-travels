"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2, CalendarDays, X } from "lucide-react";
import { format } from "date-fns";
import { site, waLink, mailLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { GlassCalendar, type DateRange } from "@/components/ui/glass-calendar";
import { cn } from "@/lib/utils";

const fieldBase =
  "peer w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30";

function formatRange(r: DateRange) {
  if (r.from && r.to)
    return `${format(r.from, "d MMM yyyy")} – ${format(r.to, "d MMM yyyy")}`;
  if (r.from) return format(r.from, "d MMM yyyy");
  return "";
}

export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "Tamil Nadu",
    travellers: "2",
    message: "",
  });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = calOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [calOpen]);

  const update =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const compose = () =>
    [
      `New enquiry — ${site.fullName}`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Destination: ${form.destination}`,
      `Travel dates: ${formatRange(range) || "Flexible"}`,
      `Travellers: ${form.travellers}`,
      `Message: ${form.message || "—"}`,
    ].join("\n");

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    window.open(waLink(compose()), "_blank");
    setSent(true);
  };

  const handleEmail = () => {
    const subject = `Trip enquiry — ${form.destination} (${form.travellers} travellers)`;
    window.location.href = `${mailLink}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(compose())}`;
  };

  return (
    <form onSubmit={handleWhatsApp} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
            Full name *
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-muted">
            Phone number *
          </label>
          <input
            id="phone"
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 ..."
            className={fieldBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          className={fieldBase}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="destination" className="mb-1.5 block text-xs font-medium text-muted">
            Destination of interest
          </label>
          <select
            id="destination"
            value={form.destination}
            onChange={update("destination")}
            className={cn(fieldBase, "appearance-none")}
          >
            <option>Tamil Nadu</option>
            <option>Kerala</option>
            <option>Karnataka</option>
            <option>Tamil Nadu + Kerala</option>
            <option>All three states</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Travel dates
          </label>
          <button
            type="button"
            onClick={() => setCalOpen(true)}
            className={cn(
              fieldBase,
              "flex items-center justify-between text-left",
              !range.from && "text-muted/60"
            )}
          >
            <span className="truncate">
              {formatRange(range) || "Select travel dates"}
            </span>
            <CalendarDays className="ml-2 h-4 w-4 shrink-0 text-primary" />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="travellers" className="mb-1.5 block text-xs font-medium text-muted">
          Number of travellers
        </label>
        <select
          id="travellers"
          value={form.travellers}
          onChange={update("travellers")}
          className={cn(fieldBase, "appearance-none")}
        >
          {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
          Message / special requests
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us what you're dreaming of…"
          className={cn(fieldBase, "resize-none")}
        />
      </div>

      {sent ? (
        <div className="flex items-center gap-2 rounded-xl bg-accent-light px-4 py-3 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5" />
          Thank you! Your enquiry is opening in WhatsApp — we reply within the hour.
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="accent" className="flex-1">
            <Send className="h-4 w-4" /> Send via WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleEmail}
          >
            Send by email
          </Button>
        </div>
      )}
      <p className="text-center text-xs text-muted">
        We never share your details. Enquiries reach us 24/7.
      </p>

      {/* Travel-date range picker */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {calOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCalOpen(false)}
                className="fixed inset-0 z-[70] flex items-end justify-center bg-primary-dark/60 p-4 backdrop-blur-sm sm:items-center"
                role="dialog"
                aria-modal="true"
                aria-label="Select travel dates"
              >
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 40, opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-[360px]"
                >
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-sm font-medium text-white">
                      {range.from && !range.to
                        ? "Now pick your return date"
                        : "Select your travel dates"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setCalOpen(false)}
                      aria-label="Close"
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <GlassCalendar value={range} onChange={setRange} />

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setRange({})}
                      className="text-sm font-medium text-white/70 transition hover:text-white"
                    >
                      Clear
                    </button>
                    <Button
                      type="button"
                      variant="accent"
                      size="sm"
                      onClick={() => setCalOpen(false)}
                    >
                      {range.from ? "Done" : "Close"}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </form>
  );
}
