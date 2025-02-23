"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useNotificationStore } from "@/hooks/use-notification-store";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { hasUnread, markAsRead, getTotalUnread } = useNotificationStore();

  useChatSocket({
    addKey: `group:${id}:messages`,
    updateKey: `group:${id}:messages:update`,
    queryKey: `group:${id}`,
    chatPlaceId: id,
    type: "group",
  });

  const onClick = () => {
    const groupPath = `/home/groups/${id}`;
    router.push(groupPath);

    if (hasUnread("group", id)) {
      markAsRead("group", id);
    }
  };

  const unreadCount = getTotalUnread("group", id);
  const isActive = params?.groupId === id;

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={`${name}${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
    >
      <div
        onClick={onClick}
        className="group relative flex items-center cursor-pointer"
      >
        {hasUnread("group", id) && (
          <div className="absolute top-3 right-2 h-3 w-3 rounded-full bg-red-500 z-50">
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
          </div>
        )}
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            !isActive && "group-hover:h-[20px]",
            isActive ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            isActive && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" priority />
        </div>
      </div>
    </ActionTooltip>
  );
};
