"use client";

import Link from "next/link";
import { Plus, Sliders, ShoppingBag } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = ({
  profileId,
  isSeller,
}: {
  profileId?: string;
  isSeller: boolean;
}) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col space-y-1 ">
      <ActionTooltip side="right" align="center" label="Go Shopping">
        <Link href="/">
          <div className="group flex items-center">
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
              <ShoppingBag
                className="group-hover:text-white transition text-indigo-500"
                size={25}
              />
            </div>
          </div>
        </Link>
      </ActionTooltip>
      {isSeller && (
        <ActionTooltip side="right" align="center" label="Add group">
          <div
            onClick={() => onOpen("createGroup")}
            className="group flex items-center"
          >
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <Plus
                className="group-hover:text-white transition text-emerald-500"
                size={25}
              />
            </div>
          </div>
        </ActionTooltip>
      )}
      <ActionTooltip side="right" align="center" label="Dashboard">
        <Link href={`/home/dashboard/profile/${profileId}`}>
          <div className="group flex items-center">
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-orange-500">
              <Sliders
                className="group-hover:text-white transition text-orange-500"
                size={25}
              />
            </div>
          </div>
        </Link>
      </ActionTooltip>
    </div>
  );
};
