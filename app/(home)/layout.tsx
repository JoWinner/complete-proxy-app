import { redirectToSignIn } from "@clerk/nextjs";

import { Navbar } from "@/components/navigation/navbar";
import Categories from "./components/category-list";

import { initialProfile } from "@/lib/initial-profile";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

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
