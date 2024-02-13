"use client";

import { Member, MemberRole, Profile, Group } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useChatSocket } from "@/hooks/use-chat-socket";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface GroupMemberProps {
  member: Member & { profile: Profile };
  group: Group;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const GroupMember = ({ member, group }: GroupMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const { newMessage } = useChatSocket({
    addKey: `chat:${member.id}:messages`,
    updateKey: `chat:${member.id}:messages:update`,
    queryKey: `chat:${member.id}`,
  });

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(
      `/dashboard/groups/${params?.groupId}/conversations/${member.id}`
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
    
     
        {newMessage && <div className="absolute right-8 h-2 w-2 rounded-full bg-blue-500 cursor-none" />}
      
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
