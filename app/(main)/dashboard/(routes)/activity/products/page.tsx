import { format } from "date-fns";
import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const products = await db.product.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const store = await db.store.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    moq: item.moq.toString(),
    imageUrl: item.images[0]?.url || "",
    // description: item.description,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="h-full flex-col bg-white dark:bg-[#313338] ">
      <div className=" space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} username={store?.username} />
      </div>
    </div>
  );
};

export default ProductsPage;
