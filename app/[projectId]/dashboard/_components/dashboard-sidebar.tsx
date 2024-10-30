"use client";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCheck,
  ChevronDown,
  Clock,
  Dot,
  Files,
  GitGraph,
  Home,
  List,
  PencilLine,
  Settings,
  Stars,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarProjectCard() {
  return (
    <div className="py-4  rounded-xl bg-zinc-50 border border-slate-100 flex items-center justify-between gap-4 relative px-4">
      <div className="flex flex-col -space-y-1">
        <p className="text-base font-bold font-serif">Kulien Gartneri</p>
        <p className="text-sm text-text/80">Utvikling av nettside</p>
      </div>
      <div>
        <ChevronDown size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}

type sidebarLink = {
  title: string;
  icon: React.ReactNode;
  href: string;
  urlRef: string;
};

const sidebardLinks: sidebarLink[] = [
  {
    title: "Project overview",
    icon: <Home strokeWidth={1.5} size={18} />,
    href: "overview",
    urlRef: "overview",
  },
  {
    title: "Feed",
    icon: <List strokeWidth={1.5} size={18} />,
    href: "feed",
    urlRef: "feed",
  },
  {
    title: "Threads",
    icon: <PencilLine strokeWidth={1.5} size={18} />,
    href: "threads",
    urlRef: "threads",
  },
  {
    title: "Ai feedback",
    icon: <GitGraph strokeWidth={1.5} size={18} />,
    href: "ai-feedback",
    urlRef: "ai-feedback",
  },
  {
    title: "Files",
    icon: <Files strokeWidth={1.5} size={18} />,
    href: "files",
    urlRef: "files",
  },
  {
    title: "Checklist",
    icon: <CheckCheck strokeWidth={1.5} size={18} />,
    href: "checklist",
    urlRef: "checklist",
  },
  {
    title: "Deadlines",
    icon: <Clock strokeWidth={1.5} size={18} />,
    href: "deadlines",
    urlRef: "deadlines",
  },
];

function SidebarLink({
  href,
  icon,
  title,
  urlRef,
  currentPath,
}: sidebarLink & any) {
  return (
    <Link
      href={href}
      className={cn({
        "flex gap-2 group items-center duration-200 font-semibold  pl-3 rounded-xl justify-start w-full py-3 text-text/60 text-sm":
          true,
        "font-semibold text-text bg-zinc-100 ": urlRef == currentPath,
        "hover:bg-zinc-50": urlRef != currentPath,
      })}
    >
      {icon}
      <p className="">{title}</p>
      {title !== "Files" && (
        <div className=" text-xs bg-slate-100 rounded-full px-2  border border-zinc-300 text-text/60">
          coming soon
        </div>
      )}
    </Link>
  );
}

// "flex gap-2 items-center  rounded-xl justify-start px-4 py-3  text-sm font-medium"

export default function Sidebar() {
  // Get the current url
  const currentUrl = usePathname();
  const path = currentUrl.split("/");
  const currentPath = path[path.length - 1];
  return (
    <div className="h-[calc(100vh-5rem)] border-r border-slate-200 flex-grow max-w-[20%] min-w-[20%] w-[20%] bg-background p-4 text-text">
      {/* <SidebarProjectCard /> */}

      {/* <div className="w-full h-4 flex items-center justify-center">
        <div className="w-full h-[1px] bg-zinc-200"></div>
      </div> */}

      <ul className="flex flex-col items-start justify-between h-full w-full gap-1 ">
        <div className="w-full">
          {sidebardLinks.map((link) => (
            <SidebarLink key={link.title} {...link} currentPath={currentPath} />
          ))}
        </div>
        <div className="w-full">
          <div className="w-full h-32 mb-6 bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-slate-200 text-sm rounded-xl flex flex-col gap-2 items-center justify-center text-text/80">
            <Stars strokeWidth={1} size={28} />
            <div className="flex flex-col items-center justify-center">
              <p>Invite clients to your project</p>
              <p>Coming soon</p>
            </div>
          </div>
          <SidebarLink
            currentPath={currentPath}
            urlRef="account"
            href="/account"
            title="Account"
            icon={<User2 strokeWidth={1.5} size={18} />}
          />
          <SidebarLink
            currentPath={currentPath}
            urlRef="settings"
            href="/settings"
            title="Settings"
            icon={<Settings strokeWidth={1.5} size={18} />}
          />
        </div>
      </ul>
    </div>
  );
}
