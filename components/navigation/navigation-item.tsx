"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useChatSocket } from "@/hooks/use-chat-socket";

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
  const { newMessage, resetNewMessage } = useChatSocket({
    addKey: `chat:${id}:messages`,
    updateKey: `chat:${id}:messages:update`,
    queryKey: `chat:${id}`,
  });

  const onClick = () => {
    router.push(`/dashboard/groups/${id}`);
    resetNewMessage(); 
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        {newMessage && 
          <div className="absolute top-0 right-2 h-2 w-2 rounded-full bg-red-600 cursor-none" />
        }

        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.groupId !== id && "group-hover:h-[20px]",
            params?.groupId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.groupId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};
