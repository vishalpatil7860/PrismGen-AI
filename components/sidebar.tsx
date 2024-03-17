"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, File, ImageIcon, LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    href: '/code',
  },
  // 'Chat with PDF' entry with comingSoon flag
  {
    label: 'Chat with PDF',
    icon: File,
    color: "text-pink-700",
    href: "",
    comingSoon: true, // Indicates that this feature is not yet available
  },
  {
    label: 'Chat with Image',
    icon: ImageIcon,
    color: "text-yellow-700",
    bgColor: "bg-yellow-700/10",
    href:'',
    comingSoon: true
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();


  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo2.png" />
          </div>
          <h1 className="text-2xl font-bold">
            PrismGen AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href && !route.comingSoon;
            const isComingSoon = route.comingSoon;

            return (
              <div key={route.label} className={cn(
                "group flex p-3 w-full items-center justify-start font-medium rounded-lg transition",
                isActive ? "text-white bg-white/10" : "text-zinc-400",
                isComingSoon ? "opacity-50 cursor-default" : "cursor-pointer hover:text-white hover:bg-white/10"
              )}>
                {isComingSoon || route.href === '' ? (
                  // Non-clickable div for 'Coming Soon' or empty href
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                    {isComingSoon && <span className="ml-2 text-xs uppercase">Coming Soon</span>}
                  </div>
                ) : (
                  // Clickable Link for other routes
                  <Link href={route.href}>
                    <div className="flex items-center flex-1">
                      <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                      {route.label}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};