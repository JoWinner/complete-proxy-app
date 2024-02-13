import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ActivitySidebar } from "@/components/activity/activity-sidebar";
import { currentProfile } from "@/lib/current-profile";

export const DashboardMobileToggle = async (
 
) => {

  const profile = await currentProfile();


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
        <ActivitySidebar role={profile?.role || ''}  profileId={profile?.id || ''} isAgent={profile?.isAgent || false}/>
      </SheetContent>
    </Sheet>
  )
}