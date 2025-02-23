import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { ProductForm } from "./components/product-form";
import { currentProfile } from "@/lib/current-profile";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const profile = await currentProfile();

  const categories = await db.category.findMany();

  if (!profile) {
    return redirect("/");
  }
  const groups = await db.group.findMany({
    where: {
      profileId: profile.id,
    },
  });

  return (
    <div className="flex-col bg-white dark:bg-[#313338]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          groups={groups}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
