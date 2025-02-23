import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface GroupIdPageProps {
  params: {
    groupId: string;
  };
}

const GroupIdPage = async ({ params }: GroupIdPageProps) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();

  if (!profile) {
    return redirectToSignIn();
  }

  const group = await db.group.findUnique({
    where: {
      id: params.groupId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = group?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(
    `/home/groups/${params.groupId}/channels/${initialChannel?.id}`
  );
};

export default GroupIdPage;
