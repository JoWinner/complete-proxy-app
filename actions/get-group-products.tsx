import { Product } from "@/types";

const getGroupProducts = async (groupId: string): Promise<Product[]> => {
  const URL = `http://localhost:3000/api/groups/${groupId}/products`;

  const res = await fetch(URL);

  console.log("URL", URL);
  //   const data = await res.json();
  //   console.log("group", data)
  //   return data;
  // TODO: let's try it this way
  console.log("Response: ", res);
  return res.json();
};

export default getGroupProducts;
