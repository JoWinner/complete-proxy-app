"use client";

import { useRouter } from "next/navigation";
import { Boxes, MessagesSquare, Users2 } from "lucide-react";
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

  return (
    <div className="">
      <h1 className="mb-2 text-xl md:text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">
        {data?.name}
      </h1>
      <p className="mb-2 text-sm px-1 text-gray-700 bg-yellow-300 rounded-sm w-fit">
        {data.category?.name}
      </p>
      <div className="my-2 flex items-center justify-normal space-x-2">
        <span className="text-2xl font-bold">
        <Currency value={data?.price} />
        </span>
        <span className="text-sm font-bold px-1 border-2 border-green-500 bg-green-900 rounded-sm text-white flex flex-row items-center">
          <Boxes />
          {data?.moq}
        </span>
      </div>
      <h3 className="text-base text-gray-800 dark:text-gray-300 font-medium">
        
        { data?.weight }kg
      </h3>
      <p className="text-base text-gray-700 dark:text-gray-200">
        {data?.description}
      </p>
      <hr className="my-4 dark:border-gray-200" />

      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={chatInGroup} className="flex items-center gap-x-2">
         Chat <MessagesSquare size={20} />
        </Button>
        <div className="flex flex-row items-end gap-x-2">
        <Button onClick={joinGroup} >
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
