import SignUpButton from "@/app/(auth)/_components/sign-up-button";
import SignInButton from "@/app/(auth)/_components/sign-in-button";
import SignOutButton from "@/app/(auth)/_components/sign-out-button";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export default async function NavbarUserMenu() {
  const head = await headers();
  const session = await auth.api.getSession({ headers: head });
  const isSignedIn = session?.user.id;
  return (
    <div className="flex items-center gap-2">
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <SignOutButton />
        </div>
      ) : (
        <>
          <SignUpButton />
          <SignInButton />
        </>
      )}
    </div>
  );
}
