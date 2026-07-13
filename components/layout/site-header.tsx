import Link from "next/link";
import { marketingNav } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold">AgraAI</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.title}</Link>)}
        </nav>
        <div className="flex items-center gap-2"><ThemeToggle /><Button asChild size="sm"><Link href="/dashboard">Dashboard</Link></Button></div>
      </div>
    </header>
  );
}
