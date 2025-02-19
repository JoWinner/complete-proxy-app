"use client";
import { useEffect, useState } from "react";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

import ProductList from "@/components/product-list";
import getStorefrontProducts from "@/actions/get-storefront-products";
import { Product } from "@/types";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";

// export const revalidate = 0;

export default function StoreFrontPage() {
  const origin = useOrigin();
  const params = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const perPage = process.env.NEXT_PUBLIC_LOAD_PERPAGE;

  useEffect(() => {
    if (inView && hasMore) {
      if (params && typeof params.username === "string") {
        getStorefrontProducts(
          { isArchived: false },
          origin,
          page,
          params?.username
        ).then((newProducts) => {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setPage(page + 1);
          if (newProducts.length < Number(perPage)) {
            setHasMore(false);
          }
          setLoading(false);
        });
      }
    }
  }, [origin, inView, hasMore, params?.username]);

  return (
    <>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 min-h-full mb-12">
        <ProductList title=" " items={products} loading={loading} />
        <div ref={ref}>{hasMore && !loading && <Spinner />}</div>
      </div>
    </>
  );
}
