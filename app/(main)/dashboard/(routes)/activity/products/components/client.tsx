"use client";

import { Plus, ArrowUpRightFromCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/activity-button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
  username?: string;
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data,
  username,
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <a
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          <ArrowUpRightFromCircle />
        </a>
        <Button onClick={() => router.push(`/dashboard/activity/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for Products" /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
