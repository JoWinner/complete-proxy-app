"use client";
import { Settings2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import axios from 'axios';

const ProductStatus = () => {

  const onUpdateProductStatus = async () => {
    try {
      // const response = await axios.post('/api/super-admin/product-status');
      const response = await axios.post('/api/super-admin/actions');
  
      toast.success("Updated: " + response.data.message);
    } catch (error: any) {
      toast.error("An error occurred: " + error.message);
    }
  };


  return (
    <div className="h-full px-8 pt-14 space-y-2 bg-white dark:bg-[#313338]">
      <h3 className="text-lg font-medium">
        Update Published/Unpublished Products
      </h3>
      <p className="text-muted-foreground text-sm">
        This sets products to published/unpublished if the store owner has
        subscribed or not.
      </p>

      <Button
        onClick={onUpdateProductStatus}
        variant="default"
      >
        <Settings2 size={20} className="text-gray-700 dark:text-slate-300" />
      </Button>
    </div>
  );
};

export default ProductStatus;
