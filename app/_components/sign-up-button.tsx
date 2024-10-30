"use client";
import { authClient } from "@/lib/auth-client";

export default function SignUpButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const signUp = async () => {
    const {} = await authClient.signUp.email(
      {
        email: "test@test.no",
        password: "testtesttest",
        name: "admin",
      },
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
  };
  return (
    <button
      onClick={signUp}
      className="bg-text hover:bg-slate-800 duration-200 border border-text text-background font-medium px-6 py-3 rounded-xl text-sm"
    >
      {children ? children : "Sign up"}
    </button>
  );
}
