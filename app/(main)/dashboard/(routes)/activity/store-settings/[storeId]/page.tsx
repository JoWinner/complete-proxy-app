import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { StoreSettingsForm } from "./components/store-settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      profileId: profile.id,
    },
  });
  if (!store) {
    redirect(`/dashboard/activity/profile/${profile.id}`);
  }

  return (
    <div className="flex-col bg-white dark:bg-[#313338]">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StoreSettingsForm initialData={store} username={store.username} fileUrl={store.fileUrl} storeBio={store.storeBio} />
      </div>
    </div>
  );
};

export default SettingsPage;
