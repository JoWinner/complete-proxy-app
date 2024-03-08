"use client";

import { AlertOctagon, UserSquare, UserCheck, ShoppingCart, } from "lucide-react";
import { useRouter } from "next/navigation";

export const SuperAdminSidebar = ({
  profileId,
}: {
  profileId?: string;
}) => {
  const router = useRouter();

  const navigationItems = [
    {
      label: "Overview",
      icon: (
        <UserCheck className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: `/super-admin/overview`,
    },
    {
      label: "Manage Orders",
      icon: (
        <ShoppingCart className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: `/super-admin/all-orders`,
    },
    {
      label: "Products Status",
      icon: (
        <AlertOctagon className=" flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: "/super-admin/products-status",
    },
    {
      label: "Users",
      icon: (
        <UserSquare className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: "/super-admin/users",
    },
  ];

  const handleNavigation = (path: string) => {
    router.refresh();
    router.push(path);
  };

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <div className="flex items-center justify-center py-3 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition border-neutral-200 dark:border-neutral-800 border-b-2">
        <h1 className="text-md font-semibold ">Super Admin</h1>
      </div>
      <div className="flex-1 px-3 mt-8">
        {navigationItems.map((item) => (
          <div
            key={item.label}
            className="mb-2 cursor-pointer"
            onClick={() => handleNavigation(item.path)}
          >
            <div className="flex items-center justify-between space-x-2 px-2 py-2 rounded-md gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1">
              <p className="font-medium">{item.label}</p>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
