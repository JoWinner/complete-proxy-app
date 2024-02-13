"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { toast } from "react-hot-toast";
import { Expand, MessagesSquare, Boxes, Users2 } from "lucide-react";
import {  useRouter } from "next/navigation";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import { ProductWithGroupAndMembers as Product } from "@/types";
import Link from "next/link";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const joinGroup = () => {
    if (data.group.members.length >= data.group.maxMembers) {    
      toast.error("Can't join, you're late! Group is full.");
    } else {     
      router.push(`/invite/${data.group?.inviteCode}`);
    }
  };

  const chatInGroup = async () => {
      router.push(`/invite/${data.group?.inviteCode}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  return (
    <div className="bg-[#feffff] dark:bg-gray-900 group rounded-xl border p-2 md:p-3 space-y-4">
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={
                <Expand
                  size={20}
                  className="text-gray-500 dark:text-slate-300"
                />
              }
            />
            <IconButton
              onClick={chatInGroup}
              icon={
                <MessagesSquare
                  size={20}
                  className="text-gray-500 dark:text-slate-300"
                />
              }
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col justify-center">
        <h5 className="text-base font-unbounded-style md:text-xl font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal ">
          {data?.name}
        </h5>
        <div className="flex flex-row justify-between items-center">
          <Link href={`/category/${data.category?.id}`} className="w-fit">
            <p className="text-sm px-1 text-gray-700 bg-yellow-300 rounded-sm w-fit">
              {data.category?.name}
            </p>
          </Link>
          <h3 className="bg-blue-200 rounded-t-md px-1 border-b-8 border-blue-800 text-base text-black font-medium md:font-semibold">
            {data?.weight}kg
         
          </h3>
        </div>
      </div>
      {/* Price & Review */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-center ">
          <span className="text-xl lg:text-2xl font-medium md:font-bold">
          <Currency value={data?.price} />
          </span>
          <span className="text-sm font-bold px-1 border-2 border-green-500 bg-green-900 rounded-sm text-white flex flex-row items-center">
            <Boxes size={20} />
            {data?.moq}
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center ">
          <IconButton
            onClick={joinGroup}
            disabled={data.group.members.length >= data.group.maxMembers}
            icon={<Users2 size={20} className="text-rose-500 font-bold" />}
          />
          <h5 className="text-rose-500 text-sm font-bold">{`${data.group.members.length}/${data.group?.maxMembers}`}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
