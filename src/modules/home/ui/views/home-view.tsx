"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { AuthenticatedSession } from "@/types/session";

interface HomeViewProps {
  session: AuthenticatedSession;
}

export const HomeView = ({ session }: HomeViewProps) => {
  const router = useRouter();

  return (
    <div className="w-96 mx-auto mt-8 flex flex-col gap-4">
      <p>
        Logged in as <span className="capitalize">{session.user.name}</span>
      </p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
