"use client";

// import { useEffect } from "react";
import { Button } from "@/components/ui/dashboard-button";

import { useStoreModal } from "@/hooks/use-store-modal";

const StoreSetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);
  
  return(
    <div className="flex items-center justify-center h-full">
       <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            {/* <h1 className="text-3xl md:text-4xl ">Create Store</h1> */}
            <p className="text-lg text-muted-foreground">
              Create and manage a store
            </p>
          <Button onClick={onOpen}>Create Store</Button>
          </div>

        </div>

      </div>
    </div>
  );
  
};
export default StoreSetupPage;
