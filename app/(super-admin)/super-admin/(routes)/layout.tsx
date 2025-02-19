import { auth } from "@clerk/nextjs/server";

import { currentProfile } from "@/lib/current-profile";
import { SuperAdminMobileToggle } from "@/components/super-admin-mobile-toggle";
import { SuperAdminSidebar } from "@/components/super-admin/super-admin-sidebar";

const AdminLayout = async ({
  children
}: {
  children: React.ReactNode;
  
}) => {
  const profile = await currentProfile();

  if (!profile || profile.role !== 'SUPERADMIN') {
    // Redirect to a different page or show an error message
    return <div>You are not authorized to view this page</div>;
  }

  if (!profile) {
    return redirectToSignIn();
  }

  return ( 
    <div className="h-full ">
      <SuperAdminMobileToggle />
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <SuperAdminSidebar  profileId={profile.id}/>
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
}
 
export default AdminLayout;