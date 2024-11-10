import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SignInForm from "./sign-in-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-full h-screen bg-background rounded-lg flex items-center justify-center relative">
      <Button asChild className="absolute left-12 top-12" variant={"link"}>
        <Link href="/">
          <ArrowLeft size={24} strokeWidth={1.5} />
          Go to homepage
        </Link>
      </Button>
      <article className="w-1/3 h-2/3 border rounded-xl shadow-lg border-slate-200 flex flex-col px-10 py-8 gap-8">
        <div className="flex flex-col">
          <div className="size-12 rounded-lg bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-zinc-200 mb-8 flex flex-col  text-text/80 items-center justify-center -space-y-3">
            <p className="text-xl font-serif font-medium ">Ella</p>
          </div>
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className=" text-muted-foreground text-sm">
            Welcome back, sign in to continue working.
          </p>
        </div>
        <SignInForm />
      </article>
    </div>
  );
}
