"use client";

import {
  Box,
  Boxes,
  UserCheck,
  Store,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const ActivitySidebar = ({
  profileId,
  isSeller,
  role,
}: {
  profileId?: string;
  isSeller: boolean;
  role: string;
}) => {
  const router = useRouter();

  const navigationItems = [
    {
      label: "Account",
      icon: (
        <UserCheck className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: `/dashboard/activity/profile/${profileId}`,
    },

    ...(isSeller
      ? [
          {
            label: "Store Orders",
            icon: (
              <Boxes className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            ),
            path: "/dashboard/activity/store-orders",
          },
          {
            label: "Manage Products",
            icon: (
              <Box className=" flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            ),
            path: "/dashboard/activity/products",
          },

          {
            label: "Store Settings",
            icon: (
              <Store className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            ),
            path: "/dashboard/activity/store-settings",
          },
        ]
      : []),

    {
      label: "My Orders",
      icon: (
        <ShoppingCart className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      ),
      path: "/dashboard/activity/user-orders",
    },
    ...(role === "SUPERADMIN"
      ? [
          {
            label: "SUPER ADMIN",
            icon: (
              <ShieldCheck className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            ),
            path: "/super-admin",
          },
        ]
      : []),
  ];

  const handleNavigation = (path: string) => {
    router.refresh();
    router.push(path);
  };

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <div className="flex items-center justify-center py-3 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition border-neutral-200 dark:border-neutral-800 border-b-2">
        <h1 className="text-md font-semibold ">Activity</h1>
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
