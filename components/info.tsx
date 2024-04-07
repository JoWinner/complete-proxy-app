"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Boxes, MessagesSquare, Users2, StoreIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import { Button } from "@/components/ui/button";
import { ProductWithGroupAndMembers as Product } from "@/types";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();

  const joinGroup = () => {
    if (data.group.members.length >= data.group.maxMembers) {
      toast.error("Can't join, you're late! Group is full.");
    } else {
      previewModal.onClose();
      router.push(`/invite/${data.group?.inviteCode}`);
    }
  };

  const chatInGroup = async () => {
    previewModal.onClose();
    router.push(`/invite/${data.group?.inviteCode}`);
  };

  const visitStore = async () => {
    previewModal.onClose();
    router.push(`/${data.store?.username}`);
  };

  const visitCategory = async () => {
    previewModal.onClose();
    router.push(`/category/${data.category?.name}`);
  };

  return (
    <div className="">
      <div
        onClick={visitStore}
        className="flex flex-row items-center gap-x-1 mb-2 cursor-pointer"
      >
        <div className="relative w-[60px] h-[60px] rounded-lg  border-2 border-gray-400">
          <Image
            src={data.store?.logoUrl || ""}
            alt=""
            fill
            className="aspect-square object-cover rounded-md"
          />
        </div>
        <h2 className=" text-lg font-medium text-slate-900 dark:text-gray-100">
          {data.store?.storeName}
        </h2>
      </div>

      <h1 className=" text-xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">
        {data?.name}
      </h1>
      <div className="flex flex-row items-center gap-x-6">
        <h3 className="bg-blue-200 rounded-t-md px-1 border-b-8 border-blue-800 text-base text-black font-medium md:font-semibold">
          {data?.weight}kg
        </h3>
        <p
          onClick={visitCategory}
          className="text-base px-1 text-gray-700 bg-yellow-300 rounded-sm w-fit cursor-pointer"
        >
          {data.category?.name}
        </p>
      </div>
      <div className="my-2 flex items-center justify-normal space-x-2">
        <span className="text-2xl font-bold">
          <Currency value={data?.price} />
        </span>
        <span className="text-sm font-bold px-1 border-2 border-green-500 bg-green-900 rounded-sm text-white flex flex-row items-center">
          <Boxes />
          {data?.moq}
        </span>
      </div>

      <p className="text-base text-gray-700 dark:text-gray-200">
        {data?.description}
      </p>
      <hr className="my-4 dark:border-gray-200" />

      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={chatInGroup} className="flex items-center gap-x-2">
          Chat <MessagesSquare size={20} />
        </Button>
        <div className="flex flex-row items-end gap-x-2">
          <Button onClick={joinGroup}>
            <Users2 size={25} className="text-rose-500 " />
          </Button>
          <h3 className="text-rose-500 text-base">
            {`${data.group.members.length}/${data.group?.maxMembers}`}
          </h3>
        </div>
      </div>
      <h3 className="text-sm m-3 text-gray-800 dark:text-gray-300  font-normal">
        Join seller. Join Buyers. For Best Deals.
      </h3>
    </div>
  );
};

export default Info;
