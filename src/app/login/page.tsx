import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { isMongoConfigured } from "@/lib/mongoose";
import { adminEmail } from "@/lib/users";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : undefined;

  const devHint =
    !isMongoConfigured() && process.env.NODE_ENV !== "production"
      ? `Dev mode · ${adminEmail()} / chandelier-admin`
      : undefined;

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-display text-3xl tracking-[0.1em] text-ink">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-taupe">
            Sign in to your account
          </p>
        </div>

        <AuthForm mode="login" next={next} devHint={devHint} />

        <p className="mt-6 text-center text-[0.66rem] uppercase tracking-[0.2em] text-taupe">
          <Link href="/" className="transition-colors hover:text-ink">
            ← Back to store
          </Link>
        </p>
      </div>
    </main>
  );
}
