import { appConfig } from "@/config/app.config";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginCard } from "@/features/auth/components/login-card";
import { getPostAuthRedirect } from "@/services/auth/helpers";

type LoginPageProps = {
  searchParams?: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = getPostAuthRedirect(params?.next ?? null);

  return (
    <AuthLayout
      title="Log in"
      description="Use a secure email link or Google to access AgraAI."
    >
      <LoginCard redirectTo={`${appConfig.url}${nextPath}`} />
    </AuthLayout>
  );
}
