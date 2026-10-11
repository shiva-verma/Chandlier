import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductArt } from "./product-art";

export function ProductImage({
  image,
  art,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  image?: string;
  art: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-ink-soft via-ink to-black",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(198,161,91,0.10),transparent_60%)]" />
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 p-8">
          <ProductArt variant={art} />
        </div>
      )}
    </div>
  );
}
