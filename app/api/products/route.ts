import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const body = await req.json();

    const {
      name,
      price,
      description,
      moq,
      weight,
      categoryId,
      groupId,
      images,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!moq) {
      return new NextResponse("Moq quantity is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
  
    if (!groupId) {
      return new NextResponse("Group id is required", { status: 400 });
    }

    if (!profile.id) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    const profileByUserId = await db.profile.findFirst({
      where: {
        id: profile.id,
        userId: profile.userId,
      },
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        description,
        moq,
        weight,
        isArchived,
        groupId,
        categoryId,
        profileId: profile.id,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("name") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const groupId = searchParams.get("groupId") || undefined;
    const isArchived = searchParams.get("isArchived");

    const _limit = parseInt(
      searchParams.get("_limit") || process.env.NEXT_PUBLIC_LOAD_PERPAGE || ""
    );

    const _start = parseInt(searchParams.get("_start") || "0");

    const products = await db.product.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
        categoryId,
        groupId,
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
