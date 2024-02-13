import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    if (!params.username) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!store) {
      return new NextResponse("Store does not exist", { status: 404 });
    }
    
    return NextResponse.json(store);
  } catch (error) {
    // console.log("[STORE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}