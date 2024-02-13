import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingGroup = await db.group.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
     include: {
      members: true
    }
  });

  if (existingGroup) {
    return redirect(`/dashboard/groups/${existingGroup.id}`);
  }

  const group = await db.group.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
    include: {
      members: true
    }
  });

  if (group) {
    const isFull = group.members.length >= group.maxMembers;
    if (isFull) {
      return redirect("/");
    }
    await db.group.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            }
          ]
        }
      }
    });
  
    return redirect(`/dashboard/groups/${group.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;