import Image from "next/image";
import { DashboardMobileToggle } from "@/components/dashboard-mobile-toggle";

const DashboardPage = () => {
  return (
    <div className="bg-gradient-to-bl from-neutral-800 h-screen via-sky-700 to-current min-h-screen">
      <DashboardMobileToggle />

      <div className=" items-center px-10 flex flex-col ">
        <div className="flex flex-col items-center px-10 py-20">
          <h1 className=" text-center font-bold font-unbounded-style text-white text-[50px] tracking-widest leading-7 md:leading-[3.8rem]">
            Let&apos;s help you do group commerce, a more organized way, the
            best way😎
          </h1>
        </div>
        {/* <div className="w-1/3 items-center py-20 px-10 flex flex-col ">
          <h1 className="text-center font-unbounded-style text-white text-[30px] md:text-[50px] font-bold bg-transparent tracking-widest leading-7 md:leading-[2.8rem] py-10">
            Let&apos;s help you do group commerce, a more organized way, the best way😎
          </h1>
          
          div</div> */}
        <div className="flex flex-col md:flex-row">
          <div className="grid grid-cols-12">
            <div className="cols-span-8">
              <div className="flex flex-col md:flex-row  dark:bg-[#f4f4f4] bg-gray-900 rounded-md ">
                <div className="aspect-square ">
                  <Image
                    src="/images/1-min.jpg"
                    width={100}
                    height={100}
                    alt=""
                    className="aspect-square object-cover "
                  />
                </div>
                <div className="flex flex-col ">
                  <h1 className="text-lg font-bold text-white dark:text-gray-900">Connect to 80 million shoppers</h1>
                  <p className="text-slate-300 dark:text-gray-900">
                    Don’t just sell to anyone. Sell to the group that are
                    already interested, don’t just invite them, let them join,
                    they are interested.
                  </p>
                </div>
              </div>
            </div>

            <div className="cols-span-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
