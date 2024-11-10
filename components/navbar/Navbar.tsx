import NavbarUserMenu from "./navbar-user-menu";

export default async function Navbar() {
  return (
    <div className="w-full h-16 flex items-center justify-between px-[10%] absolute top-0 left-0 z-50">
      <h1 className="text-2xl font-serif font-medium">Ella</h1>
      {/* Create own component */}
      <NavbarUserMenu />
    </div>
  );
}
