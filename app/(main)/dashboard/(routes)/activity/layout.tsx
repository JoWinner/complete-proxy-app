import { redirectToSignIn } from "@clerk/nextjs";
import { DashboardMobileToggle } from "@/components/dashboard-mobile-toggle";

import { currentProfile } from "@/lib/current-profile";
import { ActivitySidebar } from "@/components/activity/activity-sidebar";

const ActivityLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="h-full bg-white dark:bg-[#313338]">
      <DashboardMobileToggle />
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ActivitySidebar
          role={profile.role}
          profileId={profile.id}
          isSeller={profile.isSeller}
        />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ActivityLayout;
