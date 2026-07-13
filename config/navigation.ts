import { BarChart3, Home, Settings, Sprout } from "lucide-react";

export const marketingNav = [
  { title: "Platform", href: "#platform" },
  { title: "Security", href: "#security" },
  { title: "Docs", href: "/docs" },
] as const;

export const dashboardNav = [
  { title: "Overview", href: "/dashboard", icon: Home },
  { title: "Insights", href: "/dashboard/insights", icon: BarChart3 },
  { title: "Fields", href: "/dashboard/fields", icon: Sprout },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;
