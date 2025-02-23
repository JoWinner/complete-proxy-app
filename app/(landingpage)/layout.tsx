import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/components/navigation/navbar";
import Categories from "@/components/category-list";

import { initialProfile } from "@/lib/initial-profile";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  // const profile = await initialProfile();
  // const { redirectToSignIn } = await auth()

  // if (!profile) {
  //   return redirectToSignIn();
  // }

  return (
    <div className="h-full">
      <Navbar />
      <div className="mt-32 mb-20">
        <Categories />
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
