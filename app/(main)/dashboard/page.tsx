import Image from "next/image";
import Link from "next/link";

import { DashboardMobileToggle } from "@/components/dashboard-mobile-toggle";
import {
  SearchCheck,
  Users,
  BadgeCheck,
  ShoppingCart,
  BadgeDollarSign,
  ShoppingBag,
} from "lucide-react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="bg-[#f4f4f4] dark:bg-[#13111c] min-h-screen">
      <DashboardMobileToggle />
      <div className="w-full ">
        <div className="aspect-square relative w-full h-[700px] md:h-screen ">
          <Image
            src="/images/4-hero.png"
            alt="/"
            fill
            className="aspect-square object-cover "
          />
        </div>
        <div className="absolute top-56 md:top-28  lg:top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white ">
          <div className="md:left-[10%]  absolute md:p-10 lg:p-20">
            <div className="flex flex-row items-center my-2 lg:my-3">
              <hr className="w-5 lg:w-[70px] h-[2px] lg:h-[3px] bg-white border-0 " />
              <h5 className="text-sm lg:text-2xl text-white font-thin font-unbounded-style px-1 lg:px-2">
                The leading
              </h5>
              <hr className="w-5 lg:w-[70px] h-[2px] lg:h-[3px] bg-white border-0 " />
            </div>
            <h1
              className="font-thin font-unbounded-style leading-none text-5xl lg:text-[130px] 
            max-w-fit backdrop-blur-sm bg-black/10"
            >
              B2B
            </h1>
            <h1 className="font-thin leading-none max-w-fit font-unbounded-style text-5xl lg:text-[130px]   backdrop-blur-sm bg-black/10 ">
              Ecommerce
            </h1>
            <div className="flex flex-row items-center my-4 lg:my-8">
              <hr className="w-5 lg:w-[70px] h-[2px] lg:h-[3px] bg-white border-0 " />
              <h5 className="text-sm lg:text-lg text-white font-thin font-unbounded-style px-2">
                #No.1 For Global Group Trade
              </h5>
              <hr className="w-5 lg:w-[70px] h-[2px] lg:h-[3px] bg-white border-0 " />
            </div>
            <SearchInput />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative gap-x-8 gap-y-16 px-8 py-8 bg-sky-950">
          <div className="bg-slate-900 rounded-tl-sm shadow-2xl p-3 text-white border-t-4 border-t-slate-500 border-l-slate-700 border-l-2  ">
            <h3 className="font-bold text-2xl my-1">
              Millions Of Business Offerings
            </h3>
            <p className="text-base">
              Explore Products And Suppliers For Your Business From Millions Of
              Offerings.
            </p>
          </div>
          <div className="bg-slate-900 rounded-tl-sm shadow-2xl p-3 text-white border-t-4 border-t-slate-500 border-l-slate-700 border-l-2 ">
            <h3 className="font-bold text-2xl my-1">
              Assure Quality And Transactions
            </h3>
            <p className="text-base">
              Ensure Production Quality From Verified Suppliers, With Your
              Orders Protected From Payment To Delivery.
            </p>
          </div>
          <div className="bg-slate-900 rounded-tl-sm shadow-2xl p-3 text-white border-t-4 border-t-slate-500 border-l-slate-700 border-l-2   ">
            <h3 className="font-bold text-2xl my-1">
              One-Stop Trading Solution
            </h3>
            <p className="text-base">
              Order Seamlessly From Product Search To Order Management, Payment,
              And Fulfillment.
            </p>
          </div>
          <div className="bg-slate-900 rounded-tl-sm shadow-2xl p-3 text-white border-t-4 border-t-slate-500 border-l-slate-700 border-l-2  ">
            <h3 className="font-bold text-2xl my-1">
              Open Group Trading Experience
            </h3>
            <p className="text-base">
              Get Curated Benefits. Such As Group Discounts, Group Deals, Group
              MOQs To Grow Small Businesses.
            </p>
          </div>
        </div>
        <div className="py-8 px-8 gap-y-4 bg-white flex flex-col lg:flex-row items-center justify-around">
          <div className="flex flex-col gap-y-8 lg:gap-y-0 items-center">
            <h1 className="text-7xl lg:text-[130px] font-unbounded-style font-thin text-rose-500">
              Explore
            </h1>
            <h1 className="text-7xl lg:text-[130px] font-unbounded-style font-thin text-rose-500">
              Millions
            </h1>
          </div>
          <div className="grid grid-cols-2 text-black relative gap-8 lg:gap-16">
            <div className="flex flex-col items">
              <h1 className="text-4xl font-medium text-slate-900">200K+</h1>
              <p className="text-2xl text-gray-600">Curated Products</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-medium text-slate-900">200+</h1>
              <p className="text-2xl text-gray-600">Verified Supplier</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-medium text-slate-900">2,000+</h1>
              <p className="text-2xl text-gray-600">Products Categories</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-medium text-slate-900">200+</h1>
              <p className="text-2xl text-gray-600">Countries and Regions</p>
            </div>
          </div>
        </div>
        <div className="bg-[#f4f4f4] grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold font-unbounded-style  sm:text-3xl  text-slate-900">
              How All The Traders Do It
            </h3>

            <div className="mt-12 space-y-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12   bg-[#28e3fc] rounded-full  text-gray-900">
                    <SearchCheck />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium  text-slate-900">
                    Search Products
                  </h4>
                  <p className="mt-2  text-gray-600">
                    Search and find from millions of products and supplier
                    offerings to find the matching ones for your business.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12   bg-[#38e641] rounded-full  text-gray-900">
                    <Users />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium  text-slate-900">
                    Join Group
                  </h4>
                  <p className="mt-2  text-gray-600">
                    Be quick to join the sales group before its too late. Join
                    sales group to discuss about products, negotiate as group
                    for better deals together with supplier.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12   bg-[#fffc34] rounded-full  text-gray-900">
                    <ShoppingCart />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium   text-slate-900">
                    Create Order
                  </h4>
                  <p className="mt-2  text-gray-600">
                    Easily create an order in the group chat, after making
                    better deals and meeting MOQs. Creating order is just a few
                    clicks.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12   bg-[#e328fc] rounded-full  text-gray-900">
                    <BadgeDollarSign />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium   text-slate-900">
                    Pay Order
                  </h4>
                  <p className="mt-2  text-gray-600">
                    Because we are business-first, we discuss details with every
                    business owner after creating an order. Time and mode of
                    shipment for business growth and many more before processing
                    payment.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12   bg-[#f3093c] rounded-full  text-gray-300">
                    <BadgeCheck />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium   text-slate-900">
                    Fulfill With Transparency
                  </h4>
                  <p className="mt-2  text-gray-600">
                    Openly track orders from creation to delivery. Before orders
                    are shipped, they are QUALITY-CHECKED at PROCESSING stage
                    before SHIPPING. A better quality for great business!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="mt-16 ">
            <div className="  relative w-full h-[830px] ">
              <Image
                src="/images/products-collage.png"
                alt=""
                className="mx-auto object-cover h-full shadow-lg  bg-gray-500"
                fill
              />
            </div>
          </div>
        </div>
        <div className="bg-[#f4f4f4] flex items-center justify-center py-8">
          <Link href="/">
            <Button
              variant="premium"
              className="flex flex-row items-center justify-center font-unbounded-style rounded-full font-medium text-lg drop-shadow-xl "
              size="lg"
            >
              Shop Now
              <ShoppingBag className="ml-2" size={26} strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
