"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { signInWithEmailOtp, signInWithOAuth } from "@/services/auth/client";

export function LoginCard({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await signInWithEmailOtp({ email, redirectTo });
    setMessage(
      error ? error.message : "Check your email for a secure login link.",
    );
    setIsSubmitting(false);
  }

  async function handleGoogleLogin() {
    setIsSubmitting(true);
    const { error } = await signInWithOAuth({ provider: "google", redirectTo });
    if (error) setMessage(error.message);
    setIsSubmitting(false);
  }

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <form className="space-y-4" onSubmit={handleEmailLogin}>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="bg-background focus:ring-primary h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2"
          placeholder="you@example.com"
        />
        <Button className="w-full" disabled={isSubmitting} type="submit">
          Continue with email
        </Button>
      </form>
      <div className="bg-border my-6 h-px" />
      <Button
        className="w-full"
        disabled={isSubmitting}
        onClick={handleGoogleLogin}
        variant="outline"
      >
        Continue with Google
      </Button>
      {message ? (
        <p className="text-muted-foreground mt-4 text-sm">{message}</p>
      ) : null}
    </div>
  );
}
