import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        group: {
          include: {
            members: true, // Include the members relation
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
   

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const profileByUserId = await db.profile.findFirst({
      where: {
        id: profile.id,
        userId:profile.userId
      },
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; } }
) {
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


    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!moq) {
      return new NextResponse("Moq quantity is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
   
    if (!groupId) {
      return new NextResponse("Group id is required", { status: 400 });
    }

    const profileByUserId = await db.profile.findFirst({
      where: {
        id: profile.id,
        userId:profile.userId,
      },
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const store = await db.store.findUnique({
      where: {
        profileId: profile.id,
      },
    });
    
    if (!store) {
      return new NextResponse("Store not found for the user", { status: 404 });
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        weight,
        moq,
        groupId,
        categoryId,
        storeId: store.id,
        images: {
          deleteMany: {},
        },
        isArchived,
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
