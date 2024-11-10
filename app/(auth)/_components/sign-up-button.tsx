import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Button asChild className="rounded-xl text-sm">
      <Link href="/sign-up">{children ? children : "Sign up"}</Link>
    </Button>
  );
}
