"use client";

import { useEffect, useState } from "react";
import type { AuthState } from "@/features/auth/types";
import { getAuthClient } from "@/services/auth/client";

export function useSession() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });

  useEffect(() => {
    const supabase = getAuthClient();

    supabase.auth.getSession().then(({ data }) => {
      setState({
        user: data.session?.user ?? null,
        session: data.session,
        isLoading: false,
      });
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({ user: session?.user ?? null, session, isLoading: false });
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return state;
}
