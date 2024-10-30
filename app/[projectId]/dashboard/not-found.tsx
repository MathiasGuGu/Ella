"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center text-text">
      <div className="size-16 rounded-lg bg-[#DEE0FC] mb-8 flex flex-col  text-text/80 items-center justify-center -space-y-3">
        <p className="text-2xl font-serif font-medium">Sorry</p>
      </div>
      <h1 className="text-4xl font-medium">Something went wrong!</h1>
      <p className="w-1/2 text-balance text-center text-text/80">
        Something went wrong with this page. Please go back and try again. If
        the error persists, please reach out to us at the Ella team through our
        support channels.
      </p>
    </div>
  );
}
