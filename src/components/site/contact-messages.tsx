"use client";

import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { ColorIcon } from "@/components/site/color-icon";
import { WhatsAppIcon } from "@/components/site/icons";
import { site, waLink, mailLink } from "@/lib/site";

type Kind = "whatsapp" | "email";

function MessageCard({ kind }: { kind: Kind }) {
  const [text, setText] = useState("");
  const isWa = kind === "whatsapp";

  const send = () => {
    const body = text.trim() || `Hi ${site.fullName}, I'd like to plan a trip.`;
    if (isWa) {
      window.open(waLink(body), "_blank");
    } else {
      const subject = `Trip enquiry — ${site.fullName}`;
      window.location.href = `${mailLink}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="rounded-3xl bg-primary-dark p-5 text-white shadow-premium sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {isWa ? (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25d366]">
            <WhatsAppIcon className="h-6 w-6 text-white" />
          </span>
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent">
            <ColorIcon name="envelope" size={22} float={false} className="text-primary-dark" />
          </span>
        )}
        <h3 className="font-display text-xl text-white">
          {isWa ? "WhatsApp Message" : "Email Message"}
        </h3>
      </div>

      {/* Text box */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Type your message…"
        className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-white/25 focus:ring-2 focus:ring-white/10"
      />

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs leading-snug text-white/50">
          {isWa
            ? "You'll continue in the WhatsApp app / web"
            : "Opens in your email app, ready to send"}
        </p>
        <div className="flex items-center gap-2">
          {text && (
            <button
              type="button"
              onClick={() => setText("")}
              aria-label="Clear message"
              className="grid h-11 w-11 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={send}
            aria-label={isWa ? "Send on WhatsApp" : "Send by email"}
            className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-white shadow-lg transition-transform hover:-translate-y-0.5 ${
              isWa ? "bg-[#25d366] hover:brightness-105" : "bg-accent text-primary-dark"
            }`}
          >
            <Send className="h-6 w-6 translate-x-px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactMessages() {
  return (
    <div className="space-y-5">
      <MessageCard kind="whatsapp" />
      <MessageCard kind="email" />
    </div>
  );
}
