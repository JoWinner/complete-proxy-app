import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl, maxMembers } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!profile.isSeller) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const group = await db.group.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        maxMembers,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general", profileId: profile.id },
            { name: "product(s) info", type: "INFO", profileId: profile.id },
          ],
        },
        members: {
          create: [
            { profileId: profile.id, role: MemberRole.ADMIN },
            {
              profileId: "d69b6ad1-84d5-442e-b379-9b12e4b3012b",
              role: MemberRole.MODERATOR,
            },
          ],
        },
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[GROUPS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
