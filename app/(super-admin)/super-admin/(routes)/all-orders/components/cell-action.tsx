"use client";

import axios from "axios";
import {
  Ticket,
  Package,
  PackageOpen,
  XCircle,
  PackageCheck,
  Copy,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { OrderInfo } from "@/types";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/activity-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AllOrdersColumn } from "./columns";

interface CellActionProps {
  data: AllOrdersColumn;
  orderDetails?: OrderInfo;

}

export const CellAction: React.FC<CellActionProps> = ({ data, orderDetails }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { onOpen } = useModal();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard");
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/orders/${orderId}`, {
        status,
      });

      // Assuming the API returns the updated order in the response
      if (response.status === 200) {
        toast.success("Order status updated successfully");
      } else {
        throw new Error("Failed to update order status");
      }
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => ""}
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
          <DropdownMenuItem
            onClick={() => updateOrderStatus(data.id, "PLACED")}
          >
            <Ticket className="mr-2 h-4 w-4 text-gray-500" /> Placed order
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateOrderStatus(data.id, "PROCESSING")}
          >
            <PackageOpen className="mr-2 h-4 w-4 text-purple-500" /> Order
            processing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateOrderStatus(data.id, "SHIPPED")}
          >
            <Package className="mr-2 h-4 w-4 text-green-500" /> Order shipped
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateOrderStatus(data.id, "DELIVERED")}
          >
            <PackageCheck className="mr-2 h-4 w-4 text-blue-500" /> Order
            delivered
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateOrderStatus(data.id, "CANCELLED")}
          >
            <XCircle className="mr-2 h-4 w-4 text-red-500" /> Order cancelled
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
