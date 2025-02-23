"use client";
import { useEffect, useState } from "react";

import { useOrigin } from "@/hooks/use-origin";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";
import { Product } from "@/types";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";

// export const revalidate = 0;

export default function HomePage() {
  const origin = useOrigin();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [hasMore, setHasMore] = useState(true); 
  const [loading, setLoading] = useState(true); 


  const perPage = process.env.NEXT_PUBLIC_LOAD_PERPAGE;

  useEffect(() => {
    if (inView && hasMore) {
      getProducts({ isArchived: false}, origin, page).then((newProducts) => {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage(page + 1);
        if (newProducts.length < Number(perPage)) {
          setHasMore(false);
        }
        setLoading(false);
      });
    }
  }, [origin, inView, hasMore]);

  return (
    <>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 min-h-full mb-12">
        <ProductList title=" " items={products} loading={loading} />
        <div ref={ref}>{hasMore && !loading && <Spinner />}</div>
      </div>
    </>
  );
}
