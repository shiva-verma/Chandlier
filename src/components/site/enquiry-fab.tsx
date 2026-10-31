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
        <div className="card-shadow w-72 overflow-hidden rounded-2xl border border-ink-line bg-white/95 text-ink backdrop-blur">
          <div className="border-b border-ink-line px-5 py-4">
            <p className="eyebrow">Enquire</p>
            <p className="mt-1 font-display text-xl">Speak with a stylist</p>
          </div>
          <div className="space-y-2 p-3">
            <a
              href={whatsappLink(
                "Hello Tejora, I'd like help choosing a chandelier.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink transition-colors hover:bg-brass/20"
            >
              <MessageCircle className="h-4 w-4 text-gold-deep" />
              Chat on WhatsApp
            </a>
            <a
              href={mailtoLink("Product enquiry")}
              className="flex items-center gap-3 rounded-xl border border-ink-line px-4 py-3 text-sm text-ink transition-colors hover:border-brass hover:text-gold-deep"
            >
              <span className="grid h-4 w-4 place-items-center text-gold-deep">@</span>
              Email the studio
            </a>
            <p className="px-2 pt-1 text-xs text-taupe">
              {siteConfig.whatsapp.display} · {siteConfig.hours}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close enquiry options" : "Open enquiry options"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full bg-ink text-ivory shadow-[0_14px_40px_-10px_rgba(48,40,32,0.6)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
