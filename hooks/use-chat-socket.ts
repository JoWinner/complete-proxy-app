import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member, Message, Profile } from "@prisma/client";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { useSocket } from "@/components/providers/socket-provider";
import { useParams } from "next/navigation";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  chatPlaceId: string;
  type: "channel" | "conversation" | "group";
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  chatPlaceId,
  type,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const params = useParams();
  const { incrementUnread } = useNotificationStore();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (message: MessageWithMemberWithProfile) => {
      // Check if we're currently viewing this chat based on type
      const isCurrentlyViewing =
        (type === "channel" && params?.channelId === chatPlaceId) ||
        (type === "conversation" && params?.memberId === chatPlaceId) ||
        (type === "group" && params?.groupId === chatPlaceId);

      // Only increment unread if we're not viewing this chat
      if (!isCurrentlyViewing) {
        incrementUnread(type, chatPlaceId);
      }

      // Update the query data
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    };

    const handleUpdate = (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    };

    // Listen for new messages
    socket.on(addKey, handleMessage);
    // Listen for message updates
    socket.on(updateKey, handleUpdate);

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [
    socket,
    addKey,
    updateKey,
    queryKey,
    queryClient,
    chatPlaceId,
    params,
    type,
    incrementUnread,
  ]);
};
