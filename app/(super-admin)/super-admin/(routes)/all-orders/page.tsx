import { format } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { AllOrdersClient } from "./components/client";
import { AllOrdersColumn } from "./components/columns";

const AllOrdersPage = async () => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth()

  if (!profile) {
    return redirectToSignIn();
  }

  const allOrders = await db.order.findMany({
    include: {
      profile: {
        include: {
          country: true,
        },
      },
      product: {
        include: {
          images: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: AllOrdersColumn[] = allOrders.map((item) => ({
    id: item.id,
    productName: item.name,
    price: formatter.format(item.product.price.toNumber()),
    totalAmount: formatter.format(item.totalAmount.toNumber()),
    totalWeight: item.totalWeight.toString(),
    quantity: item.quantity.toString(),
    images: item.product.images,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    status: item.status,
    sellerId: item.sellerId || "",
    // buyerId: item.profile.id,
    buyerName: item.profile.name,
    buyerEmail: item.profile.email,
    buyerCountry: item.profile.country?.name || "",
    buyerProvince: item.profile.stateProvince || "",
    buyerCity: item.profile.city || "",
    buyerPhoneNumber: item.profile.phoneNumber || "",
    buyerZipCode: item.profile.zipCode || "",
    buyerStreetAddress: item.profile.streetAddress || "",
  }));

  return (
    <div className="h-full flex-col bg-white dark:bg-[#313338] ">
      <div className=" space-y-4 p-8 pt-6">
        <AllOrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default AllOrdersPage;
