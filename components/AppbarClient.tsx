"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@/ui/src/Appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ redirect: false }); // prevent next-auth auto redirect
          router.push("/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
