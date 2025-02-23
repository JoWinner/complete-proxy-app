"use client";

import { MapPin, Copy, MoreHorizontal} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";
import { OrderInfo } from "@/types";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/dashboard-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StoreOrdersColumn } from "./columns";

interface CellActionProps {
  data: StoreOrdersColumn;
  orderDetails?: OrderInfo;

}

export const CellAction: React.FC<CellActionProps> = ({ data,orderDetails }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { onOpen } = useModal();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={()=> ""}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy order Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpen("viewOrderInfo", { orderDetails })}>
            <MapPin className="mr-2 h-4 w-4" /> View order details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
