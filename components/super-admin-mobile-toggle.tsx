import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { SuperAdminSidebar } from "@/components/super-admin/super-admin-sidebar";
import { currentProfile } from "@/lib/current-profile";

export const SuperAdminMobileToggle = async (
 
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
        <SuperAdminSidebar profileId={profile?.id}/>
      </SheetContent>
    </Sheet>
  )
}