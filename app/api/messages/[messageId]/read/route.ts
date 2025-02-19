import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const profile = await currentProfile();
    const { messageId } = params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messageId) {
      return new NextResponse("Message ID missing", { status: 400 });
    }

    // Create or update message read status
    const messageRead = await db.messageRead.upsert({
      where: {
        messageId_profileId: {
          messageId,
          profileId: profile.id,
        },
      },
      create: {
        messageId,
        profileId: profile.id,
      },
      update: {
        readAt: new Date(),
      },
    });

    return NextResponse.json(messageRead);
  } catch (error) {
    console.log("[MESSAGE_READ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
