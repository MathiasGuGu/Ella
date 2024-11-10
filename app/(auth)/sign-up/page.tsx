import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

export default function SignIn() {
  return (
    <div className="w-full h-screen bg-background rounded-lg flex items-center justify-center relative">
      <Button asChild className="absolute left-12 top-12" variant={"link"}>
        <Link href="/">
          <ArrowLeft size={24} strokeWidth={1.5} />
          Go to homepage
        </Link>
      </Button>
      <article className="w-1/3 h-auto border rounded-xl shadow-lg border-slate-200 flex flex-col px-10 pt-8 pb-12 gap-8">
        <div className="flex flex-col">
          <div className="size-12 rounded-lg bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-zinc-200 mb-8 flex flex-col  text-text/80 items-center justify-center -space-y-3">
            <p className="text-xl font-serif font-medium ">Ella</p>
          </div>
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className=" text-muted-foreground text-sm">
            Welcome! create an account to get started with Ella
          </p>
        </div>
        <SignUpForm />
      </article>
    </div>
  );
}
