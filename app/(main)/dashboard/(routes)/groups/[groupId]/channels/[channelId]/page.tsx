import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import {ProductInfoProps} from "@/components/ui/product-info";

import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { db } from "@/lib/db";

interface ChannelIdPageProps {
  params: {
    groupId: string;
    channelId: string;
  };
}

//export const revalidate = 0;

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth()

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      groupId: params.groupId,
      profileId: profile.id,
    },
  });

  const productInfoData = await db.product.findMany({
    where: {
      groupId: params.groupId,
      isArchived: false,
    },
    include: {
      category: true,
      images: true,
      group: true,
    },
  });

  const formattedProducts: ProductInfoProps[] = productInfoData.map((item) => ({
    id: item.id,
    productName: item.name,
    price: item.price.toString(),
    moq: item.moq.toString(),
    weight: item.weight || "",
    images:item.images,
    description: item.description,
    categoryName: item.category.name,
    categoryId: item.category.id,
  }));


  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        groupId={channel.groupId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              groupId: channel.groupId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              groupId: channel.groupId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.INFO && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              groupId: channel.groupId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            channel={channel}
            productInfoData={formattedProducts}
          />
          {(member.role === MemberRole.ADMIN ||
            member.role === MemberRole.MODERATOR) &&
            channel.type === ChannelType.INFO && (
              <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  groupId: channel.groupId,
                }}
              />
            )}
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
