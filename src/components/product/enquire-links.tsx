import { MessageCircle, Mail } from "lucide-react";
import type { Product } from "@/lib/types";
import { whatsappLink, mailtoLink } from "@/lib/site-config";

export function EnquireLinks({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const message = `Hello Tejora, I'd like to enquire about the "${product.name}" (${product.slug}). Could you share availability and delivery details?`;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border transition-colors text-[0.72rem] uppercase tracking-[0.18em]";
  const sizing = compact ? "h-9 px-4" : "h-11 px-5";

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizing} border-brass/50 text-ink hover:border-brass hover:bg-brass/15`}
      >
        <MessageCircle className="h-3.5 w-3.5 text-gold-deep" /> Enquire on WhatsApp
      </a>
      <a
        href={mailtoLink(`Enquiry · ${product.name}`, message)}
        className={`${base} ${sizing} border-ink-line text-ink hover:border-brass hover:text-gold-deep`}
      >
        <Mail className="h-3.5 w-3.5" /> Email us
      </a>
    </div>
  );
}
