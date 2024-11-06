import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import Sidebar from "./_components/dashboard-sidebar";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <Sidebar />
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <section className="w-full h-full pl-1 pt-1 overflow-y-scroll bg-zinc-50">
        {children}
      </section>
    </div>
  );
}
