"use client";
import { authClient } from "@/lib/auth-client";

export default function SignInButton() {
  const signIn = async () => {
    await authClient.signIn.email(
      {
        email: "test@test.no",
        password: "testtesttest",
        callbackURL: "http://localhost:3000/project",
      },
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
  };

  return (
    <button
      onClick={signIn}
      className="bg-background hover:bg-stone-100 duration-200 border border-stone-300 text-text font-medium px-6 py-3 rounded-xl text-sm"
    >
      Sign in
    </button>
  );
}
