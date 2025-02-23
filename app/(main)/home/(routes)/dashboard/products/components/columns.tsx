"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  moq: string;
  category: string;
  createdAt: string;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ( { row } ) => <Image src={row.original.imageUrl} alt="Product" width="50" height="50" />, // Display the image in a cell
  },{
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "category",
    header: "Category",
  },
  
 
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "price",
    header: "Price",

  },
  {
    accessorKey: "moq",
    header: "Moq",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
