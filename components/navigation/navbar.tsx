"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { SearchInput } from "../search-input";

import { Logo } from "@/components/logo";

export const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div
      className={cn(
        "z-10 w-full bg-background shadow-md dark:bg-[#1F1F1F] fixed top-0 flex items-center justify-between py-4 px-1 md:px-6"
      )}
    >
      <Logo />

      <SearchInput />

      <div className="hidden md:justify-end justify-between md:flex items-center gap-x-2">
        <>
          <Link href={"/home"}>
            <Button variant="default" className="font-unbounded-style text-sm">
              Dashboard
            </Button>
          </Link>
        </>

        <>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="font-unbounded-style text-sm"
              >
                Log in
              </Button>
            </SignInButton>
          )}
          <UserButton afterSignOutUrl="/" />
        </>

        {/* <ModeToggle /> */}
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
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    className="font-unbounded-style text-sm"
                  >
                    Log in
                  </Button>
                </SignInButton>
              )}

              <Link href={"/home"}>
                <Button
                  variant="default"
                  className="font-unbounded-style text-sm"
                >
                  Dashboard
                </Button>
              </Link>
            </div>

            {/* <div className="w-full flex items-center justify-center">
              <ModeToggle />
            </div> */}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
