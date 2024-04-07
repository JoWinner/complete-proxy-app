import { Store } from "@/types";

const getStoreInfo = async (
  origin: string,
  username: string
): Promise<Store> => {
  const URL = `${origin}/api/${username}/storefront`;
  const res = await fetch(URL);

  const data = await res.json();
  // console.log("Store", data)
  return data;

  // return res.json();
};

export default getStoreInfo;
