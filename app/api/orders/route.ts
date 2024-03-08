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
      productId,
      quantity,
      totalAmount,
      totalWeight,
      sellerId,
      groupId,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    if (!totalAmount) {
      return new NextResponse("totalAmount id is required", { status: 400 });
    }
    if (!totalWeight) {
      return new NextResponse("TotalWeight id is required", { status: 400 });
    }
    if (!groupId) {
      return new NextResponse("Group id is required", { status: 400 });
    }

    if (!sellerId) {
      return new NextResponse("Seller id is required", { status: 400 });
    }
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const order = await db.order.create({
      data: {
        name,
        productId,
        quantity,
        totalAmount,
        totalWeight,
        groupId,
        sellerId: product.profileId,
        profileId: profile.id,
        status: "PLACED",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
