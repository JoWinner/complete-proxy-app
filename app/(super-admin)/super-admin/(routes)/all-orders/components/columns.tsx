"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Image as Images } from "@/types";

export type AllOrdersColumn = {
  id: string;
  productName: string;
  price: string;
  images: Images[];
  quantity: string;
  totalWeight: string;
  totalAmount: string;
  createdAt: string;
  status: string;
  sellerId: string;
  // buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerCountry: string;
  buyerProvince: string;
  buyerCity: string;
  buyerPhoneNumber: string;
  buyerZipCode: string;
  buyerStreetAddress: string;
};

type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

const statusClasses: Record<OrderStatus, string> = {
  PLACED: "bg-gray-500",
  PROCESSING: "bg-purple-500",
  SHIPPED: "bg-green-500",
  DELIVERED: "bg-blue-500",
  CANCELLED: "bg-red-500",
};

export const columns = (
  onImageClick: (rowData: AllOrdersColumn) => void
): ColumnDef<AllOrdersColumn>[] => [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.images[0]?.url}
        alt="Product"
        width="50"
        height="50"
        onClick={() => onImageClick(row.original)}
        className="cursor-pointer"
      />
    ),
  },
  {
    accessorKey: "productName",
    header: "Name",
  },

  {
    accessorFn: (row) => `${row.price} x ${row.quantity}`,
    header: "Price X Quantity",
  },

  {
    accessorKey: "totalAmount",
    header: "Amount",
  },
  {
    accessorKey: "totalWeight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: OrderStatus = row.original.status as OrderStatus;
      return (
        <span
          className={`text-white font-bold ${statusClasses[status]} p-1 rounded-md`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction data={row.original} orderDetails={row.original} />
    ),
  },
];
