import Image from "next/image";

export const Logo = () => (
  <div className="w-12 h-12 md:w-16 md:h-16 rounded-md relative bg-white">
    <Image src="/images/logo.png" alt="Soplano" fill className="  h-full  " />
  </div>
);
