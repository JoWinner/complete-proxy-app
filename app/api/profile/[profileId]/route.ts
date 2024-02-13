import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    if (!params.profileId) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    const profile = await db.profile.findUnique({
      where: {
        id: params.profileId,
      },
      include: {        
        country: true,         
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string; } }
) {
  try {
    const currentProfileData = await currentProfile();
    if (!currentProfileData) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();

    const {
      phoneNumber,
      city,
      streetAddress,
      zipCode,
      countryId,
      stateProvince,
    } = body;


    if (!params.profileId) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    if (!city) {
      return new NextResponse("City is required", { status: 400 });
    }


    if (!zipCode) {
      return new NextResponse("Zip Code is required", { status: 400 });
    }

    if (!phoneNumber) {
      return new NextResponse("Phone Number is required", { status: 400 });
    }

    if (!countryId) {
      return new NextResponse("Country id is required", { status: 400 });
    }

    if (!streetAddress) {
      return new NextResponse("Street Address id is required", { status: 400 });
    }

    
    if (!stateProvince) {
      return new NextResponse("State/Province id is required", { status: 400 });
    }

    const profileByUserId = await db.profile.findFirst({
      where: {
        id: currentProfileData.id,
        userId:currentProfileData.userId,
      },
    });

    if (!profileByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await db.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        phoneNumber,
        city,
        streetAddress,
        zipCode,
        countryId,
        stateProvince,   
      },
    });

    const profile = await db.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
        phoneNumber,
        city,
        streetAddress,
        zipCode,
        countryId,
        stateProvince,   
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[PROFILE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
