import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const current = await currentProfile();

    if (!current || current.role !== "SUPERADMIN") {
      throw new Error("Unauthorized");
    }
    const profiles = await db.profile.findMany();


    // return NextResponse.json("Products status  updated successfully", { status: 200 });
    return NextResponse.json(
      { message: "Products status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[PRODUCT_STATUS_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
