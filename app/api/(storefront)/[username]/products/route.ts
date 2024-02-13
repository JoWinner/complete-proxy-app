import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


export async function GET(req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("name") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;

    const isArchived = searchParams.get("isArchived");

    const _limit = parseInt(
      searchParams.get("_limit") || process.env.NEXT_PUBLIC_LOAD_PERPAGE || ""
    );
    const _start = parseInt(searchParams.get("_start") || "0");
    
    const store = await db.store.findUnique({
      where: {
        username: params.username
      }
    })

    if (!store) {
      return new NextResponse("Store id is required", { status: 400 });
      
    }

    const products = await db.product.findMany({
      where: {
         profileId: store?.profileId,
        // group: {
        //   isNot: null,
        // },
        name: {
          contains: searchQuery,
        },
        categoryId,
        isArchived: isArchived ? false : undefined,

      },
       take: _limit,

      skip: _start,
      include: {
        images: true,
        category: true,
        group: {
          include: {
            members: true,
          },
        },
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
