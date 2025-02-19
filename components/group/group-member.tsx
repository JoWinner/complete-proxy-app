"use client";

import {
  Member,
  MemberRole,
  Profile,
  Group,
  Conversation,
} from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useNotificationStore } from "@/hooks/use-notification-store";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface GroupMemberProps {
  member: Member & { profile: Profile };
  group: Group;
  conversation?: Conversation | null;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const GroupMember = ({
  member,
  group,
  conversation,
}: GroupMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const { hasUnread, markAsRead, getTotalUnread } = useNotificationStore();

  useChatSocket({
    addKey: `chat:${member.id}:messages`,
    updateKey: `chat:${member.id}:messages:update`,
    queryKey: `chat:${member.id}`,
    chatPlaceId: member.id,
    type: "conversation",
  });

  const icon = roleIconMap[member.role];

  const onClick = () => {
    const conversationPath = `/dashboard/groups/${params?.groupId}/conversations/${member.id}`;
    router.push(conversationPath);

    if (hasUnread("conversation", member.id)) {
      markAsRead("conversation", member.id);
    }
  };

  const unreadCount = getTotalUnread("conversation", member.id);
  const isActive = params?.memberId === member.id;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 cursor-pointer",
        isActive && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {hasUnread("conversation", member.id) && (
        <div className="absolute right-10 h-2 w-2 rounded-full bg-red-500">
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
        </div>
      )}

      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          isActive &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
        {unreadCount > 0 && (
          <span className="ml-2 text-xs text-red-500">({unreadCount})</span>
        )}
      </p>
      {icon}
    </div>
  );
};
