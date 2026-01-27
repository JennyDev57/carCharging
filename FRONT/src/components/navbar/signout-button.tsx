'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { navigate } from "astro:transitions/client";

export function SignOutButton({ className, initialSession, ...props}: React.ComponentProps<"button"> & { initialSession?: string | undefined }) {

  async function handleSignOut() {
    if (initialSession) {
      await authClient.signOut();
    }
    navigate('/login');
  }

  return (
    <Button
      variant="outline"
      className="hidden sm:inline-flex rounded-full"
      onClick={handleSignOut}
    >
      {!initialSession ? "Sign In" : "Log Out"}
    </Button>
  );
}
