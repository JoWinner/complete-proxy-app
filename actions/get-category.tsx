import { Category } from "@/types";

const getCategory = async (id: string, origin: string): Promise<Category> => {

  const URL = `${origin}/api/categories/${id}`; 
  const res = await fetch(URL);

  const data = await res.json();
  return data;

  // return res.json();
};

export default getCategory;
