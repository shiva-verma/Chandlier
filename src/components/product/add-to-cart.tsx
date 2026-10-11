"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  label = "Add to cart",
  ...props
}: {
  product: Product;
  quantity?: number;
  label?: string;
} & Pick<ButtonProps, "variant" | "size" | "className">) {
  const { add } = useCart();

  return (
    <Button
      {...props}
      onClick={() =>
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity,
          art: product.art,
          image: product.image,
        })
      }
      disabled={product.stock <= 0}
    >
      {product.stock <= 0 ? "Sold out" : label}
    </Button>
  );
}
