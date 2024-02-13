import { Product } from "@/types";
import qs from "query-string";

interface Query {
  name?: string;
  categoryId?: string;
  groupId?: string;
  isArchived?: boolean;
}

const getStorefrontProducts = async (
  query: Query,
  origin: string,
  page: number,
  username: string
): Promise<Product[]> => {
  const perPage = process.env.NEXT_PUBLIC_LOAD_PERPAGE;

  const URL = `${origin}/api/${username}/products`;

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      name: query.name,
      categoryId: query.categoryId,
      groupId: query.groupId,
      isArchived: query.isArchived,
      // ...query,
      _limit: Number(perPage),
      _start: (page - 1) * Number(perPage),
    },
  });

  const res = await fetch(url);

  const data = await res.json();
  return data;

  // return res.json();
};

export default getStorefrontProducts;
