import { auth } from "@clerk/nextjs/server";

import { StoreFrontFooter } from "@/components/storefront-ui/storefront-footer";
import { StoreFrontNavbar } from "@/components/storefront-ui/storefront-navbar";
import { initialProfile } from "@/lib/initial-profile";
import { StoreFrontBanner } from "@/components/storefront-ui/storefront-banner";

const StoreFrontLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const profile = await initialProfile();
  const { redirectToSignIn } = await auth()

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="h-full ">
      <StoreFrontNavbar />
      <StoreFrontBanner />
      <div className="mt-32 mb-20">{/* <Categories /> */}</div>
      {children}
    </div>
  );
};

export default StoreFrontLayout;
