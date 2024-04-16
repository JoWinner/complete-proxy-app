"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import {
  Youtube,
  Instagram,
  Send,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import getStoreInfo from "@/actions/get-store-info";
import { Store } from "@/types";

export const StoreFrontFooter = () => {
  const [store, setStore] = useState<Store | null>(null);

  const origin = useOrigin();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && typeof params.username === "string") {
          const fetchStoreInfo = await getStoreInfo(origin, params.username);
          setStore(fetchStoreInfo);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [origin, params?.username]);

  if (!store) {
    return null;
  }

  return (
    <footer className="relative bg-gray-300 shadow-md dark:bg-[#1f1f1f] dark:dark:text-gray-50 py-2 mt-12 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap space-y-8 items-center text-left lg:text-left">
          <div className="w-full lg:w-1/3 px-4">
            <h4 className="text-3xl font-semibold ">Lets keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blue-600">
              Find us on any of these platforms
            </h5>
            
          </div>
          
          <div className="w-full lg:w-1/3 px-4 ">
            <div className="flex flex-wrap items-top space-y-8">
              <div className="w-full lg:w-7/12 px-4 ml-auto">
                <span className="block uppercase text-lg font-semibold">
                  Contact us
                </span>
                
                <div className="relative w-[100px] h-[80px] lg:mx-auto ">
                  <Image
                    src={store.logoUrl || ""}
                    alt="Storefront logo"
                    fill
                    className="aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
