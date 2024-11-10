import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpButton from "../(auth)/_components/sign-up-button";
import SignInButton from "../(auth)/_components/sign-in-button";

export default async function Home() {
  const head = await headers();
  const session = await auth.api.getSession({ headers: head });
  const isSignedIn = session?.user?.id;
  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex gap-4 text-text px-[10%] items-center relative">
      <div className="flex flex-col">
        {/* <div className="size-16 rounded-lg bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-zinc-200 flex text-text/80 items-center justify-center">
          <p className="text-2xl font-serif font-medium ">Ella</p>
        </div> */}
        <h1 className="text-4xl font-bold my-2">
          Collaborate easier, faster and {<br />}smoother with the help of Ella.
        </h1>
        <p className="text-balance text-muted-foreground">
          Working with clients has never been easier.
          {<br />}
          Create a project, invite your client and collaborate in style.
        </p>
        <div className="flex gap-4 items-center mt-4">
          {isSignedIn ? (
            <>
              <Button asChild>
                <Link href="/project">
                  <p className="">Go to projects page</p>
                </Link>
              </Button>
            </>
          ) : (
            <>
              <SignUpButton>Try it for free</SignUpButton>
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
