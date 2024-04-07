import { redirectToSignIn } from "@clerk/nextjs";

import { StoreFrontFooter } from "@/components/storefront-ui/storefront-footer";
import { StoreFrontNavbar } from "@/components/storefront-ui/storefront-navbar";
import { initialProfile } from "@/lib/initial-profile";

const StoreFrontLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="h-full ">
      <StoreFrontNavbar
      />

      <div className="mt-32 mb-20">{/* <Categories /> */}</div>
      {children}
    </div>
  );
};

export default StoreFrontLayout;
