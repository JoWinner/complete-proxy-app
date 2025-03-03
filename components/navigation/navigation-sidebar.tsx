import { redirect } from "next/navigation";
import { UserButton, SignInButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  const groups = profile
    ? await db.group.findMany({
        where: {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      })
    : [];

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      {profile ? (
        <NavigationAction
          profileId={profile.id}
          isSeller={profile.isSeller || false}
        />
      ) : (
        <SignInButton mode="modal">
          <Button variant="default" className="font-unbounded-style text-sm h-[52px] w-[52px] rounded-[24px] flex flex-col items-center">
              Sign
              <br/>
              In
           
          </Button>
        </SignInButton>
      )}
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {groups.map((group) => (
          <div key={group.id} className="mb-4">
            <NavigationItem
              id={group.id}
              name={group.name}
              imageUrl={group.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        {/* <ModeToggle /> */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[38px] w-[38px]",
            },
          }}
        />
      </div>
    </div>
  );
};
