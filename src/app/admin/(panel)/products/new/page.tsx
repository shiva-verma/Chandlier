import { ProductForm } from "@/components/admin/product-form";

export default function AdminNewProductPage() {
  return (
    <>
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-2 font-display text-4xl">Add a product</h1>
      <p className="mt-3 max-w-2xl text-sm text-ivory-dim">
        Prices are entered in rupees (e.g. 249900 = ₹2,49,900). Leave the image
        URL empty and the storefront will render commissioned artwork for the
        piece.
      </p>
      <ProductForm />
    </>
  );
}