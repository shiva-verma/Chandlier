"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function EnquiryFab() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3 transition-all duration-500",
        ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-ink-line bg-ink/95 shadow-2xl backdrop-blur">
          <div className="border-b border-ink-line px-5 py-4">
            <p className="eyebrow">Enquire</p>
            <p className="mt-1 font-display text-xl">Speak with a stylist</p>
          </div>
          <div className="space-y-2 p-3">
            <a
              href={whatsappLink(
                "Hello Éclat Maison, I'd like help choosing a chandelier.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={mailtoLink("Product enquiry")}
              className="flex items-center gap-3 rounded-xl border border-ink-line px-4 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
            >
              <span className="grid h-4 w-4 place-items-center text-gold">@</span>
              Email the atelier
            </a>
            <p className="px-2 pt-1 text-xs text-ivory-dim/70">
              {siteConfig.whatsapp.display} · {siteConfig.hours}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close enquiry options" : "Open enquiry options"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-[0_12px_40px_-8px_rgba(198,161,91,0.85)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
