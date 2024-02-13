import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const {
      storeName,
      logoUrl,
      username,
    } = body;

    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeName) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    if (!username) {
      return new NextResponse("Username is required", { status: 400 });
    }

    const existingStore = await db.store.findUnique({
      where: { username },
    });

    if (existingStore && existingStore.id !== params.storeId) {
      return new NextResponse("Username already exists", { status: 400 });
    }

    if (!logoUrl) {
      return new NextResponse("Logo is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        profileId: profile.id,
      },
      data: {
        storeName,
        logoUrl,
        username,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    // console.log("[STORE_PATCH]", error);
    toast.error("Something went wrong");

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    // console.log("[STORE_DELETE]", error);
    toast.error("Something went wrong");
    return new NextResponse("Internal error", { status: 500 });
  }
}
