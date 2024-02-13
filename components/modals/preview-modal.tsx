"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ShopModal from "@/components/ui/shop-modal";
import { ProductWithGroupAndMembers } from "@/types";


const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return ( 
    <ShopModal 
      open={previewModal.isOpen} 
      onClose={previewModal.onClose}
    >
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12  lg:gap-x-8">
        <div className="sm:col-span-7 md:col-span-7">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-5 md:col-span-5">
          <Info data={product as ProductWithGroupAndMembers} />
        </div>
      </div>
    </ShopModal>
  );
}
 
export default PreviewModal;