"use client";

import { motion } from "framer-motion";
import { site, waLink } from "@/lib/site";
import { CallButton } from "@/components/site/call-button";
import { WhatsAppIcon, PhoneFilledIcon } from "@/components/site/icons";

export function FloatingActions() {
  const msg = `Hi ${site.fullName}, I'd like to plan a South India trip.`;
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-5">
      <motion.a
        href={waLink(msg)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group flex h-14 items-center overflow-hidden rounded-full bg-[#25d366] px-4 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)]"
      >
        <WhatsAppIcon className="h-6 w-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-smooth group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
          WhatsApp
        </span>
      </motion.a>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 18 }}
      >
        <CallButton
          ariaLabel="Call us"
          className="group flex h-14 items-center overflow-hidden rounded-full bg-primary px-4 text-white shadow-hover transition-transform hover:scale-105 active:scale-95"
        >
          <PhoneFilledIcon className="h-5 w-5 shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-smooth group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
            Call now
          </span>
        </CallButton>
      </motion.div>
    </div>
  );
}
