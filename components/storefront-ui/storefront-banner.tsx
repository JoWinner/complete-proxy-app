"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { StoreIcon } from "lucide-react";

import getStoreInfo from "@/actions/get-store-info";
import { Store } from "@/types";

export const StoreFrontBanner = () => {
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
  const fileType = store.fileUrl?.split(".").pop();

  const isImage =
    ["jpg", "jpeg", "png", "gif"].includes(fileType || "") && !!store.fileUrl;
  const isVideo =
    ["mp4", "mov", "wmv"].includes(fileType || "") && !!store.fileUrl;

  return (
    <div className="px-5 pt-24 mx-auto  bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden">
        {isImage && (
          <div className="w-full h-60 sm:h-96 relative">
            <Image
              src={store.fileUrl || ""}
              alt={store.storeName}
              fill
              className=" w-full h-full rounded-md object-fill"
            />
          </div>
        )}
        {isVideo && (
          <div className="relative aspect-square overflow-hidden border flex items-center w-full rounded-md h-60 sm:h-96">
            <video
              src={store.fileUrl}
              controls
              autoPlay
              muted
              preload="metadata"
              className="w-full h-full rounded-md object-cover"
            >
              Your browser does not support the video.
            </video>
          </div>
        )}
        <div className="p-6 pb-12 space-y-2  ">
          <div className="flex flex-row items-center gap-x-1">
            <StoreIcon
              size={25}
              className="text-slate-900 dark:text-gray-100 "
            />
            <h2 className="inline-block font-unbounded-style text-2xl font-semibold sm:text-3xl text-slate-900 dark:text-gray-100 tracking-tight">
              {store.storeName}
            </h2>
          </div>

          <div className="text-lg text-gray-700 dark:text-gray-200">
            <p>{store.storeBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
