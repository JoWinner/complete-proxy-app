"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { UserOrdersColumn, columns } from "./columns";
import { useModal } from "@/hooks/use-modal-store";

interface UserOrdersClientProps {
  data: UserOrdersColumn[];
  username?: string;
}

export const UserOrdersClient: React.FC<UserOrdersClientProps> = ({ data }) => {
  const { onOpen } = useModal();

  const handleImageClick = (rowData: UserOrdersColumn) => {
    onOpen("viewOrderInfo", { orderDetails: rowData });
  };

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`My Orders (${data.length})`}
          description="View and track orders"
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
