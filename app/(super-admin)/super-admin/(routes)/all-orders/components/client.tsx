"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { AllOrdersColumn, columns } from "./columns";
import { useModal } from "@/hooks/use-modal-store";

interface AllOrdersClientProps {
  data: AllOrdersColumn[];
}

export const AllOrdersClient: React.FC<AllOrdersClientProps> = ({ data }) => {
  const { onOpen } = useModal();

   const handleImageClick = (rowData: AllOrdersColumn) => {
    onOpen("viewOrderInfo", { orderDetails: rowData });
  };
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`All Orders (${data.length})`}
          description="Confirm and manage orders for processing and shipping"
        />
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
