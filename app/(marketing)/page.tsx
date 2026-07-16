import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

const sections = [
  "AI crop intelligence",
  "Operational analytics",
  "Workflow automation",
  "Enterprise security",
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 text-center md:py-32">
          <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase">
            AgraAI Platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            AI-native agriculture SaaS foundation.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Placeholder landing page for a modular, scalable product experience.
          </p>
          <div className="flex justify-center gap-3">
            <Button>Get started</Button>
            <Button variant="outline">View roadmap</Button>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-24 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section} className="bg-card rounded-lg border p-8">
              <h2 className="text-xl font-semibold">{section}</h2>
              <p className="text-muted-foreground mt-3">
                Placeholder section reserved for future business content.
              </p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
