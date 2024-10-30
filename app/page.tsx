import SignInButton from "./_components/sign-in-button";
import SignUpButton from "./_components/sign-up-button";

export default function Home() {
  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex flex-col gap-4 items-center justify-center text-text">
      <div className="size-16 rounded-lg bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-zinc-200 mb-8 flex flex-col  text-text/80 items-center justify-center -space-y-3">
        <p className="text-2xl font-serif font-medium">Ella</p>
      </div>
      <h1 className="text-4xl font-medium">Welcome to Ella</h1>
      <p className="w-1/2 text-balance text-center text-text/80">
        Ella is a tool for developers working with client projects. It gives the
        user an overview of the project, including information such as the
        useful links to tools and designs and the list of requirements from the
        client.
      </p>
      <p className="w-1/2 text-balance text-center text-text/80">
        Ella has built in AI to give useful tips and critiques to the user. It
        uses project definitions to analyze the work done and give useful tips
        and critiques.
      </p>
      <p className="text-text/80">
        To get started, create an account or sign in
      </p>
      <div className="flex gap-4 mt-6">
        <SignUpButton>Try it for free</SignUpButton>
        <SignInButton />
      </div>
    </div>
  );
}
