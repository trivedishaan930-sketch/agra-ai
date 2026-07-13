import Link from "next/link";
import { dashboardNav } from "@/config/navigation";

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background p-6 md:block">
      <Link href="/" className="text-lg font-bold">AgraAI</Link>
      <nav className="mt-8 space-y-2">
        {dashboardNav.map((item) => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><item.icon className="h-4 w-4" />{item.title}</Link>)}
      </nav>
    </aside>
  );
}
