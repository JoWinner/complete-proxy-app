"use client";

import { useRef, useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useOrigin } from "@/hooks/use-origin";
import { Product } from "@/types";
import getStoreFrontSearch from "@/actions/get-storefront-search";
import ProductList from "@/components/product-list";
import { Spinner } from "@/components/ui/spinner";

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("name") : null;
  const prevSearchQuery = useRef(searchQuery);
  const params = useParams();

  const origin = useOrigin();
  const perPage = process.env.NEXT_PUBLIC_LOAD_PERPAGE;

  useEffect(() => {
      // Reset the state variables when the search query changes
  if (searchQuery !==prevSearchQuery.current) {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    prevSearchQuery.current = searchQuery;
    }
    
  // Fetch new products when in view and has more
    if (inView && hasMore && searchQuery) {
      if (params && typeof params.username === "string") {
        getStoreFrontSearch({ name: searchQuery }, origin, page, params?.username).then((newProducts) => {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setPage(page + 1);
          if (newProducts.length < Number(perPage)) {
            setHasMore(false);
          }
          setLoading(false);
        });
      }
    }
  }, [origin, searchQuery, inView, hasMore, params?.username]);

  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pt-4 min-h-full mb-12">
      <ProductList
        title={`Search ${params?.username} for "${searchQuery}"`}
        items={products}
        loading={loading}
      />

      <div ref={ref}>{hasMore && !loading && <Spinner />}</div>
    </div>
  );
};

export default SearchPage;
