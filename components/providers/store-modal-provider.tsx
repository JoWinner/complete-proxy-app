"use client"

import { ActivityModal } from "@/components/modals/activity-modal";
import { useEffect,useState } from "react"

export const ActivityModalProvider = () =>{
    const [isMounted, setIsMounted] = useState (false);

    useEffect(() =>{
        setIsMounted(true);
    },[]);

    if (!isMounted) {
        return null;
    }

    return(
        <>
        <ActivityModal/>
        </>
    )
}