"use client";
import { useSession } from "@/lib/auth-client";
import SignInButton from "../sign-in-button";
import SignUpButton from "../sign-up-button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function NavbarDesktop() {
  const { data } = useSession();
  return (
    <div className="text-text/80 w-screen h-20  border-b border-stone-200 px-[5%] flex items-center justify-between">
      <div className="flex items-center gap-12">
        <h1 className="text-text text-2xl font-serif">Ella</h1>
        <div className="flex items-center gap-2 px-1 py-3  border-slate-200 text-text/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="">Kulien Gartneri</div>
            <ChevronDown size={18} strokeWidth={1.5} />
          </div>
          <div className="text-text/20">/</div>
          <div>Files</div>
        </div>
      </div>
      <div className="flex items-center h-full w-auto gap-2">
        {data?.user ? (
          <div>
            {data.user.image ? (
              <Image src={data.user.image} alt="user" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-500" />
            )}
          </div>
        ) : (
          <>
            <SignInButton />
            <SignUpButton>Try if for free</SignUpButton>
          </>
        )}
      </div>
    </div>
  );
}
