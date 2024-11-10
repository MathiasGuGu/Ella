export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <section className="w-full h-full pl-1 pt-1 overflow-y-scroll bg-zinc-50">
        {children}
      </section>
    </div>
  );
}
