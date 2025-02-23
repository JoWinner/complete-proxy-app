"use client";

import { Channel, ChannelType, MemberRole, Group } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video, Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useNotificationStore } from "@/hooks/use-notification-store";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface GroupChannelProps {
  channel: Channel;
  group: Group;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
  [ChannelType.INFO]: Info,
};

export const GroupChannel = ({ channel, group, role }: GroupChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const { hasUnread, markAsRead, getTotalUnread } = useNotificationStore();

  useChatSocket({
    addKey: `chat:${channel.id}:messages`,
    updateKey: `chat:${channel.id}:messages:update`,
    queryKey: `chat:${channel.id}`,
    chatPlaceId: channel.id,
    type: "channel",
  });

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/home/groups/${params?.groupId}/channels/${channel.id}`);
    markAsRead("channel", channel.id);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, group });
  };

  const unreadCount = getTotalUnread("channel", channel.id);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {hasUnread("channel", channel.id) && (
        <div className="absolute right-10 h-2 w-2 rounded-full bg-red-500">
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
        </div>
      )}

      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
        {unreadCount > 0 && (
          <span className="ml-2 text-xs text-red-500">({unreadCount})</span>
        )}
      </p>
      {channel.name !== "general" &&
        channel.name !== "product(s) info" &&
        role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={(e) => onAction(e, "editChannel")}
                className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={(e) => onAction(e, "deleteChannel")}
                className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
      {(channel.name === "general" || channel.name === "product(s) info") && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </div>
  );
};
