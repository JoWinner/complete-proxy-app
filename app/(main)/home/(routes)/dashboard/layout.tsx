import { auth } from "@clerk/nextjs/server";
import { DashboardMobileToggle } from "@/components/dashboard/dashboard-mobile-toggle";

import { currentProfile } from "@/lib/current-profile";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="h-full bg-white dark:bg-[#313338]">
      <DashboardMobileToggle />
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <DashboardSidebar
          role={profile.role}
          profileId={profile.id}
          isSeller={profile.isSeller}
        />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default DashboardLayout;
