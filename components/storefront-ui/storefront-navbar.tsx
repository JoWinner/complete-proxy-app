"use client";

import { useEffect, useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

import { UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sparkles } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoreFrontSearchInput } from "./storefront-search-input";
import { Store } from "@/types";
import getStoreInfo from "@/actions/get-store-info";

export const StoreFrontNavbar = () => {
  const [store, setStore] = useState<Store | null>(null);

  const origin = useOrigin();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && typeof params.username === "string") {
          const fetchStoreInfo = await getStoreInfo(origin, params.username);
          setStore(fetchStoreInfo);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [origin, params?.username]);

  if (!store) {
    return null;
  }

  return (
    <div
      className={cn(
        "z-10 w-full bg-background shadow-md dark:bg-[#1f1f1f] fixed top-0 flex items-center justify-between py-4 px-6"
      )}
    >
      <div className="relative w-[50px] h-[40px] rounded-lg lg:w-[80px] lg:h-[60px]">
        <Image
          src={store.logoUrl || ""}
          alt="Storefront logo"
          fill
          className="aspect-square rounded-md object-cover"
        />
      </div>

      <StoreFrontSearchInput />

      <div className="hidden md:justify-end justify-between md:flex items-center gap-x-2">
        <>
          <Link href={"/dashboard"}>
            <Button size="sm">Dashboard</Button>
          </Link>
        </>

        <>
          <UserButton afterSignOutUrl="/" />
        </>

        <ModeToggle />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 flex gap-0">
          <div className="w-1/2 mx-auto py-10 flex flex-col items-center space-y-4  divide-y divide-gray-400">
            <div>
              {/* <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton> */}

              <Link href={"/dashboard"}>
                <Button size="lg">Dashboard</Button>
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
