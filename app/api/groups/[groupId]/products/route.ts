import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    // const profile = await currentProfile();
    // if (!profile) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    const products = await db.product.findMany({
      where: {
        groupId: params.groupId,
        // isArchived: false ,
      },

      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
