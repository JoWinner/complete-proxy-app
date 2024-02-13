import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import {db} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
      const body = await req.json();

    const { storeName } = body;

    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    } 
   
    if (!storeName) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        storeName,
        profileId:profile.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    // console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
