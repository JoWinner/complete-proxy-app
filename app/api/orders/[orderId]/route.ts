import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import {db} from "@/lib/db";


export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string; } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();

    const {status} = body;


    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Order status is required", { status: 400 });
    }

    const profileByUserId = await db.profile.findFirst({
      where: {
        id: profile.id,
        userId: profile.userId,
        OR: [
          { isSeller: true },
          { role: 'SUPERADMIN' }
        ],
      },
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const updateOrder = await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(updateOrder);
  } catch (error) {
    console.log("[Order_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
