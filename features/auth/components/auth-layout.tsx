import type { ReactNode } from "react";
import Link from "next/link";

export function AuthLayout({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-xl font-bold">AgraAI</Link>
          <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
