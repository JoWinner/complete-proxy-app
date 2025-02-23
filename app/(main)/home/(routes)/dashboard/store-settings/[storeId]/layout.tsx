import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      profileId: profile.id,
    },
  });

  if (!store) {
    redirect(`/home/dashboard/profile/${profile.id}`);
  }

  return <>{children}</>;
}
