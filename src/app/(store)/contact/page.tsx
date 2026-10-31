import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow">Concierge</p>
      <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
        We reply the way we light rooms —{" "}
        <span className="italic text-gold-deep">quickly.</span>
      </h1>
      <p className="mt-5 max-w-xl text-taupe">
        For product enquiries, commissions and delivery questions, reach us
        directly on WhatsApp or email. No forms, no waiting rooms.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <a
          href={whatsappLink("Hello Tejora, I have a question about a light.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-brass/30 bg-brass/5 p-8 transition-colors hover:border-brass/70"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brass text-mocha">
            <MessageCircle className="h-6 w-6" />
          </span>
          <h2 className="mt-6 font-display text-3xl text-ink group-hover:text-gold-deep">
            WhatsApp us
          </h2>
          <p className="mt-3 text-sm text-taupe">
            Fastest replies. Send a photo of your room and we&apos;ll suggest
            pieces, sizes and finishes.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink">
            Start a chat · {siteConfig.whatsapp.display}
          </p>
        </a>

        <a
          href={mailtoLink("Enquiry", "Hello Tejora,")}
          className="group rounded-2xl border border-ink-line p-8 transition-colors hover:border-brass/70"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-brass/40 text-gold-deep">
            <Mail className="h-6 w-6" />
          </span>
          <h2 className="mt-6 font-display text-3xl text-ink group-hover:text-gold-deep">
            Email the studio
          </h2>
          <p className="mt-3 text-sm text-taupe">
            For commissions, corporate gifting and detailed quotations.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink">
            Write to us · {siteConfig.email}
          </p>
        </a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-ink-line p-8">
          <div className="flex gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <div>
              <h3 className="eyebrow">Showroom</h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-ink-line p-8">
          <div className="flex gap-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
            <div>
              <h3 className="eyebrow">Hours</h3>
              <p className="mt-3 text-sm text-taupe">
                {siteConfig.hours}
                <br />
                Appointments for evening viewings available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-taupe">
        Prefer to browse in person? Drop by — the showroom is always lit.
      </p>
    </div>
  );
}
