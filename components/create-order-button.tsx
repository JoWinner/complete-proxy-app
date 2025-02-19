"use client";
import { CreateOrder  } from "@/types";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ShoppingCart } from "lucide-react";

interface CreateOrderProps {
  products?: CreateOrder[];
}

export const CreateOrderButton = ({ products }: CreateOrderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="pt-2 px-3 flex items-center justify-center">
      <Button
        size="sm"
        variant="secondary"
      onClick={() => onOpen("createOrder", { products })}
        className="w-full flex justify-between"
      >
        Create Order
        <ShoppingCart className="w-4 h-4 ml-2 fill-white" />
      </Button>
    </div>
  );
};
