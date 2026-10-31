"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductArt } from "./product-art";

export function ProductImage({
  image,
  images = [],
  art,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  showThumbnails = true,
}: {
  image?: string;
  images?: string[];
  art: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showThumbnails?: boolean;
}) {
  const gallery = [image, ...(Array.isArray(images) ? images : [])].filter((img): img is string => Boolean(img && typeof img === "string" && img.trim()));
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [image, Array.isArray(images) ? images.join("|") : ""]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setActive((a) => (a === 0 ? gallery.length - 1 : a - 1));
      if (e.key === "ArrowRight") setActive((a) => (a === gallery.length - 1 ? 0 : a + 1));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, gallery.length]);

  const current = gallery[active];

  return (
    <>
      <div className={cn("flex flex-col gap-4", className)}>
        <div className={cn("group relative overflow-hidden rounded-2xl border border-ink-line bg-gradient-to-b from-white via-ivory to-sand/70", "aspect-square")}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(178,148,99,0.14),transparent_62%)]" />
          {current ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 cursor-zoom-in"
              aria-label="Zoom image"
            >
              <Image
                src={current}
                alt={`${alt} ${active + 1}`}
                fill
                sizes={sizes}
                priority={priority && active === 0}
                className="object-cover"
                unoptimized={current.startsWith("http")}
              />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-3.5 w-3.5" /> Zoom
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 p-8">
              <ProductArt variant={art} />
            </div>
          )}
        </div>

        {showThumbnails && gallery.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {gallery.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(idx);
                }}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-lg border transition-colors sm:h-20 sm:w-20",
                  idx === active ? "border-brass" : "border-ink-line hover:border-brass/60",
                )}
                aria-label={`View image ${idx + 1}`}
              >
                <Image src={img} alt={`${alt} thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" unoptimized={img.startsWith("http")} />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActive((a) => (a === 0 ? gallery.length - 1 : a - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setActive((a) => (a === gallery.length - 1 ? 0 : a + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-[90vh] w-[90vw] max-w-6xl">
            <Image
              src={current}
              alt={`${alt} ${active + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized={current.startsWith("http")}
            />
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    idx === active ? "bg-white" : "bg-white/40 hover:bg-white/60",
                  )}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
