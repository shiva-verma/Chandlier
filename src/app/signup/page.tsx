import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-display text-3xl tracking-[0.1em] text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-taupe">
            Create your account
          </p>
        </div>

        <AuthForm mode="register" />

        <p className="mt-6 text-center text-[0.66rem] uppercase tracking-[0.2em] text-taupe">
          <Link href="/" className="transition-colors hover:text-ink">
            ← Back to store
          </Link>
        </p>
      </div>
    </main>
  );
}
