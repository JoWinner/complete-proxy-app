"use client";

import { DashboardModal } from "@/components/modals/dashboard-modal";
import { useEffect, useState } from "react";

export const DashboardModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DashboardModal />
    </>
  );
};
