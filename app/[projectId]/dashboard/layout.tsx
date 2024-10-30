import Sidebar from "./_components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <Sidebar />
      <section className="w-full h-full pt-6 px-4">{children}</section>
    </div>
  );
}
