import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  Hash,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Video,
  Globe,
  Info,
} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { GroupHeader } from "./group-header";
import { GroupSearch } from "./group-search";
import { GroupSection } from "./group-section";
import { GroupChannel } from "./group-channel";
import { GroupMember } from "./group-member";
import { CreateOrderButton } from "@/components/create-order-button";
import Link from "next/link";
import { CreateOrder } from "@/types";

interface GroupSidebarProps {
  groupId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  [ChannelType.INFO]: <Info className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

export const GroupSidebar = async ({ groupId }: GroupSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const groupWithCurrentUserRole = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: {
        where: {
          profileId: profile.id,
        },
      },
    },
  });

  const currentUserRole = groupWithCurrentUserRole?.members[0]?.role;

  const group = await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
        where: {
          // Exclude GUEST members if the current user's role is GUEST
          NOT:
            currentUserRole === MemberRole.GUEST
              ? { role: MemberRole.GUEST }
              : {},
        },
      },
    },
  });

  const totalMemberCount = await db.member.count({
    where: {
      groupId: groupId,
    },
  });

  const groupProducts = await db.product.findMany({
    where: {
      groupId: groupId,
      isArchived: false,
    },
    include: {
      images: true,
      // group: true,
    },
  });

  const formattedProducts: CreateOrder[] = groupProducts.map((item) => ({
    id: item.id,
    name: item.name,
    sellerId: item.profileId,
    groupId: item.groupId || "",
    price: item.price.toString(),
    moq: item.moq.toString(),
    weight: item.weight || "N/A",
    images: item.images,
  }));

  // console.log("Formatted", formattedProducts);

  const store = await db.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      profile: {
        select: {
          store: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  const storeUsername = store?.profile?.store?.username;

  const textChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const infoChannels = group?.channels.filter(
    (channel) => channel.type === ChannelType.INFO
  );
  const members = group?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!group) {
    return redirect("/home");
  }

  const role = group.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <GroupHeader group={group} role={role} />
      <div className="mt-2 px-3">
        <Link
          href={`/${storeUsername}`}
          className="group px-2 py-2 rounded-md flex items-center justify-between gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
            Visit storefront
          </p>
          <Globe className="h-4 w-4 mr-2 text-indigo-500" />
        </Link>
      </div>

      <CreateOrderButton products={formattedProducts} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <GroupSearch
            data={[
              {
                label: "Info Channels",
                type: "channel",
                data: infoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },

              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!infoChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Info Channels"
            />
            <div className="space-y-[2px]">
              {infoChannels.map((channel) => (
                <GroupChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
        {!!textChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <GroupChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <GroupChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <GroupChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  group={group}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <GroupSection
              sectionType="members"
              role={role}
              label={`Members (${totalMemberCount}/${group.maxMembers})`}
              group={group}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <GroupMember key={member.id} member={member} group={group} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
