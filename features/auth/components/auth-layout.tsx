import type { ReactNode } from "react";
import Link from "next/link";

export function AuthLayout({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-xl font-bold">
            AgraAI
          </Link>
          <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
