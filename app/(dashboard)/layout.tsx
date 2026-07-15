import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { ProtectedLayout } from "@/features/auth/components/protected-layout";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ProtectedLayout pathname="/dashboard">
      <div className="min-h-screen bg-muted/30">
        <DashboardSidebar />
        <div className="md:pl-64">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
