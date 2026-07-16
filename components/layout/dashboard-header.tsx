import { ThemeToggle } from "@/components/theme/theme-toggle";

export function DashboardHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6 backdrop-blur">
      <div>
        <p className="text-sm font-medium">AgraAI Workspace</p>
      </div>
      <ThemeToggle />
    </header>
  );
}
