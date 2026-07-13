"use client";

import { LoginCard } from "@/features/auth/components/login-card";

export function SignupCard({ redirectTo }: { redirectTo: string }) {
  return <LoginCard redirectTo={redirectTo} />;
}
