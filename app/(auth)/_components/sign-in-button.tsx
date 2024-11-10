"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Button variant={"outline"} asChild className="rounded-xl text-sm">
      <Link href="/sign-in">Sign in</Link>
    </Button>
  );
}
