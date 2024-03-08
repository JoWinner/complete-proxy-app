"use client";

import { ArrowUpRightFromCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { StoreOrdersColumn, columns } from "./columns";
import { useModal } from "@/hooks/use-modal-store";

interface StoreOrdersClientProps {
  data: StoreOrdersColumn[];
  username?: string;
}

export const StoreOrdersClient: React.FC<StoreOrdersClientProps> = ({
  data,
  username,
}) => {
  const { onOpen } = useModal();

  const handleImageClick = (rowData: StoreOrdersColumn) => {
    onOpen("viewOrderInfo", { orderDetails: rowData });
  };

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`Store Orders (${data.length})`}
          description="Confirm and manage store orders for processing and shipping"
        />
        <a
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          <ArrowUpRightFromCircle />
        </a>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns(handleImageClick)}
        data={data}
      />
    </>
  );
};
