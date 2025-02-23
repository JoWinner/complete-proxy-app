import { Menu } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { currentProfile } from "@/lib/current-profile";

export const DashboardMobileToggle = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return (
      <SignInButton mode="modal">
        <Button
          variant="default"
          className="md:hidden ml-5 my-2 font-unbounded-style text-base"
        >
          Sign In
        </Button>
      </SignInButton>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden ml-5 mt-5">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <DashboardSidebar
          role={profile?.role || ""}
          profileId={profile?.id || ""}
          isSeller={profile?.isSeller || false}
        />
      </SheetContent>
    </Sheet>
  );
};
