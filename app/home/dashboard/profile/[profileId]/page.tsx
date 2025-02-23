import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { ProfileForm } from "./components/profile-form";
import { currentProfile } from "@/lib/current-profile";

const ProfilePage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const profileData = await db.profile.findUnique({
    where: {
      id: profile.id,
    },
  });

  const countries = await db.country.findMany();

  return (
    <div className=" flex-col bg-white dark:bg-[#313338]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileForm countries={countries} initialData={profileData} />
      </div>
    </div>
  );
};

export default ProfilePage;
