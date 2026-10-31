"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, Trash2, X } from "lucide-react";
import { Label } from "@/components/ui/field";

type GalleryItem = { url: string; publicId: string };

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Admin image field. Uploads straight to Cloudinary through the signed
 * `/api/upload` route, while still allowing a pasted URL as a fallback.
 * Submits the main image + gallery images as hidden inputs.
 */
export function ImageUpload({
  initialUrl,
  initialPublicId,
  initialImages = [],
  initialImagePublicIds = [],
}: {
  initialUrl?: string;
  initialPublicId?: string;
  initialImages?: string[];
  initialImagePublicIds?: string[];
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [publicId, setPublicId] = useState(initialPublicId ?? "");
  const [gallery, setGallery] = useState<GalleryItem[]>(
    initialImages
      .map((imgUrl, idx) => ({
        url: imgUrl,
        publicId: initialImagePublicIds[idx] ?? "",
      }))
      .filter((item) => item.url),
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      publicId?: string;
      error?: string;
    };
    if (!res.ok || !data.url) {
      throw new Error(data.error || "Upload failed.");
    }
    return { url: data.url, publicId: data.publicId ?? "" };
  }

  async function handleMainFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const result = await uploadFile(file);
      setUrl(result.url);
      setPublicId(result.publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleGalleryFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const uploads = await Promise.all(Array.from(files).map((file) => uploadFile(file)));
      setGallery((prev) => [...prev, ...uploads]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  }

  function clearMain() {
    setUrl("");
    setPublicId("");
    setError(null);
  }

  function removeFromGallery(id: string) {
    setGallery((prev) => prev.filter((item) => item.publicId ? item.publicId !== id : item.url !== id));
  }

  const imagesJson = JSON.stringify(gallery.map((item) => item.url));
  const imagePublicIdsJson = JSON.stringify(gallery.map((item) => item.publicId));

  return (
    <div className="sm:col-span-2">
      <Label>Product images</Label>

      <input type="hidden" name="image" value={url} />
      <input type="hidden" name="imagePublicId" value={publicId} />
      <input type="hidden" name="images" value={imagesJson} />
      <input type="hidden" name="imagePublicIds" value={imagePublicIdsJson} />

      <div className="flex flex-col gap-4 rounded-xl border border-ink-line bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-ink-line bg-ivory">
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="Main product preview" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-center text-[0.55rem] uppercase tracking-[0.18em] text-taupe">
                Main
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-mocha-soft disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ImageUp className="h-3.5 w-3.5" />
                )}
                {uploading ? "Uploading…" : "Upload main image"}
              </button>
              {url && (
                <button
                  type="button"
                  onClick={clearMain}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-taupe transition-colors hover:border-red-300 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove main
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleMainFile(e.target.files?.[0])}
            />

            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPublicId("");
              }}
              placeholder="…or paste a main image URL"
              className="mt-3 w-full rounded-lg border border-ink-line bg-white px-3 py-2 text-xs text-ink placeholder:text-taupe/70 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
            />
          </div>
        </div>

        <div className="border-t border-ink-line/60 pt-4">
          <p className="mb-3 text-[0.68rem] uppercase tracking-[0.2em] text-taupe">
            Gallery images
          </p>
          <div className="flex flex-wrap gap-3">
            {gallery.map((item) => (
              <div
                key={item.publicId || item.url}
                className="relative h-24 w-24 overflow-hidden rounded-lg border border-ink-line bg-ivory"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="Gallery image" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFromGallery(item.publicId || item.url)}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-taupe shadow-sm transition-colors hover:text-red-700"
                  aria-label="Remove gallery image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={uploading}
              className="grid h-24 w-24 place-items-center rounded-lg border border-dashed border-ink-line text-taupe transition-colors hover:border-brass hover:text-gold-deep disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
            </button>
          </div>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleGalleryFiles(e.target.files)}
          />
          <p className="mt-2 text-[0.68rem] text-taupe">
            Upload multiple photos for the gallery. Leave empty to render the commissioned line-art for this piece.
          </p>
        </div>

        {error && (
          <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
