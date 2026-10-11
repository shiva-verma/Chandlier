import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-ui";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { EnquiryFab } from "@/components/site/enquiry-fab";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="min-h-[60vh]">{children}</main>
      <SiteFooter />
      <CartDrawer />
      <EnquiryFab />
    </CartProvider>
  );
}
