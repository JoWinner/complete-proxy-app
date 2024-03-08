import { format } from "date-fns";
import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { UserOrdersClient } from "./components/client";
import { UserOrdersColumn } from "./components/columns";
import { TrackOrderChart } from "./components/track-order-chart";

const UserOrdersPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const userOrders = await db.order.findMany({
    where: {
      profileId: profile.id,
    },
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

  // const store = await db.store.findFirst({
  //   where: {
  //     profileId: profile.id,
  //   },
  // });

  const formattedOrders: UserOrdersColumn[] = userOrders.map((item) => ({
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
    <div className=" flex flex-col bg-white dark:bg-[#313338] ">
      <div className=" space-y-4 p-8 pt-6">
        <UserOrdersClient data={formattedOrders} />
        <div className="p-8 pt-14">
          <TrackOrderChart />
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;
