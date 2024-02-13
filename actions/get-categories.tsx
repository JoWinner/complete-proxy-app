import { Category } from "@/types";

const getCategories = async (origin: string): Promise<Category[]> => {
  const URL = `${origin}/api/categories`;
  const res = await fetch(URL);

  const data = await res.json();
  return data;

  // return res.json();
};

export default getCategories;
