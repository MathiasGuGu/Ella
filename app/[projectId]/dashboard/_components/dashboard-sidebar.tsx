"use client";
import { cn } from "@/lib/utils";
import {
  CheckCheck,
  ChevronDown,
  Clock,
  Files,
  GitGraph,
  Home,
  List,
  PencilLine,
  Plus,
  Settings,
  User2,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type sidebarLink = {
  title: string;
  icon: React.ReactNode;
  href: string;
  parentHref?: string;
  urlRef: string;
  subLinks?: sidebarLink[];
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
    subLinks: [
      {
        title: "Upload",
        icon: <Plus strokeWidth={1.5} size={14} />,
        href: "upload",
        parentHref: "files",
        urlRef: "upload",
      },
      {
        title: "Client",
        icon: <User2 strokeWidth={1.5} size={14} />,
        href: "client",
        parentHref: "files",
        urlRef: "client",
      },
      {
        title: "Developer",
        icon: <Wrench strokeWidth={1.5} size={14} />,
        href: "developer",
        parentHref: "files",
        urlRef: "developer",
      },
    ],
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
  subLinks,
  currentPath,
  parentHref = "",
}: sidebarLink & { currentPath: string[] }) {
  // Determine the full href for the link
  const currentProjectId = currentPath[1];
  const baseUrl = `/${currentProjectId}/dashboard`; // Adjust this to match the fixed part of your URL structure
  const isParentLink = subLinks && subLinks.length > 0;

  // Construct full href paths
  const fullHref = isParentLink
    ? `${baseUrl}/${href}`
    : `${baseUrl}/${parentHref}/${href}`;

  return (
    <>
      <Link
        href={fullHref}
        className={cn({
          "flex gap-2 group items-center justify-between pr-3 pl-3 rounded-xl w-full py-3 text-text/80 text-sm":
            true,
          "font-semibold text-[#525DF9] bg-zinc-50 ":
            currentPath.includes(urlRef),
          "hover:bg-zinc-50": !currentPath.includes(urlRef),
        })}
      >
        <div className="flex gap-2 items-center">
          {icon}
          <p className="">{title}</p>
        </div>
        {subLinks && <ChevronDown size={16} strokeWidth={2} />}
      </Link>
      {subLinks && currentPath.includes(urlRef) && (
        <div className="pl-4 flex flex-col border-l border-[#525DF9]">
          {subLinks.map((sub: sidebarLink) => (
            <SidebarLink
              key={sub.title}
              {...sub}
              currentPath={currentPath}
              parentHref={href} // Pass parent's href to sublinks
            />
          ))}
        </div>
      )}
    </>
  );
}
// "flex gap-2 items-center  rounded-xl justify-start px-4 py-3  text-sm font-medium"

export default function Sidebar() {
  // Get the current url
  const currentUrl = usePathname();
  const path = currentUrl.split("/");
  const currentPath = path;
  return (
    <div className="h-[calc(100vh-5rem)] border-r border-slate-200 flex-grow w-[25%] bg-background p-4 text-text">
      <ul className="flex flex-col items-start justify-between h-full w-full gap-1 ">
        <div className="w-full gap-1 flex flex-col">
          {sidebardLinks.map((link) => (
            <SidebarLink key={link.title} {...link} currentPath={currentPath} />
          ))}
        </div>
        <div className="w-full">
          {/* <div className="w-full h-32 mb-6 bg-gradient-to-tr from-[#DEE0FC] to-zinc-100 border border-slate-200 text-sm rounded-xl flex flex-col gap-2 items-center justify-center text-text/80">
            <Stars strokeWidth={1} size={28} />
            <div className="flex flex-col items-center justify-center">
              <p>Invite clients</p>
              <p>Coming soon</p>
            </div>
          </div> */}
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
