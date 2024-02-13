"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useOrigin } from "@/hooks/use-origin";
import getProducts from "@/actions/get-products";
import getCategory from "@/actions/get-category";
import { Product, Category } from "@/types";
import ProductList from "@/components/product-list";
import { Spinner } from "@/components/ui/spinner";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const params = useParams();
  const origin = useOrigin();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const perPage = process.env.NEXT_PUBLIC_LOAD_PERPAGE;

  useEffect(() => {
    if (params && inView && hasMore) {
      const categoryId = Array.isArray(params.categoryId)
        ? params.categoryId[0]
        : params.categoryId;
      getCategory(categoryId, origin).then(setCategory);

      getProducts({ isArchived: false, categoryId }, origin, page).then(
        (newProducts) => {
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          setPage(page + 1);
          if (newProducts.length < Number(perPage)) {
            setHasMore(false);
          }
          setLoading(false);
        }
      );
    }
  }, [origin, inView, hasMore, params?.categoryId]);

  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 min-h-full mb-12">
      <ProductList
        title={`${category?.name || " "}`}
        items={products}
        loading={loading}
      />

      <div ref={ref}>{hasMore && !loading && <Spinner />}</div>
    </div>
  );
};

export default CategoryPage;
