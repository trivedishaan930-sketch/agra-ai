import { appConfig } from "@/config/app.config";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignupCard } from "@/features/auth/components/signup-card";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create account"
      description="Start with passwordless email authentication or Google OAuth."
    >
      <SignupCard redirectTo={`${appConfig.url}/dashboard`} />
    </AuthLayout>
  );
}
