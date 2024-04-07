"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import {
  Youtube,
  Instagram,
  Send,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import getStoreInfo from "@/actions/get-store-info";
import { Store } from "@/types";

export const StoreFrontFooter = () => {
  const [store, setStore] = useState<Store | null>(null);

  const origin = useOrigin();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params && typeof params.username === "string") {
          const fetchStoreInfo = await getStoreInfo(origin, params.username);
          setStore(fetchStoreInfo);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [origin, params?.username]);

  if (!store) {
    return null;
  }

  return (
    <footer className="relative bg-gray-300 shadow-md dark:bg-[#1f1f1f] dark:dark:text-gray-50 py-2 mt-12 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap space-y-8 items-center text-left lg:text-left">
          <div className="w-full lg:w-1/3 px-4">
            <h4 className="text-3xl font-semibold ">Lets keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blue-600">
              Find us on any of these platforms
            </h5>
            <span className="flex flex-row items-center gap-1">
              <MapPin color="#ea6d2a" size={28} strokeWidth={2.25} />
              {store.country.name}
            </span>
          </div>
          <div className="w-full lg:w-1/3 px-4 flex items-center gap-2">
            {store.instagram && (
              <a
                rel="noopener noreferrer"
                href={store.instagram}
                title="Instagram"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Instagram className="text-bold" />
              </a>
            )}
            {store.whatsApp && (
              <a
                rel="noopener noreferrer"
                href={store.whatsApp}
                title="WhatsApp"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"/>
                </svg>
              </a>
            )}
            {store.facebook && (
              <a
                rel="noopener noreferrer"
                href={store.facebook}
                title="Facebook"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Facebook />
              </a>
            )}

            {store.youtube && (
              <a
                rel="noopener noreferrer"
                href={store.youtube}
                title="Youtube"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Youtube />
              </a>
            )}

            {store.xTwitter && (
              <a
                rel="noopener noreferrer"
                href={store.xTwitter}
                title="Twitter"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Twitter />
              </a>
            )}

            {store.telegram && (
              <a
                rel="noopener noreferrer"
                href={store.telegram}
                title="Telegram"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Send />
              </a>
            )}

            {store.tiktok && (
              <a
                rel="noopener noreferrer"
                href={store.tiktok}
                title="Tiktok"
                className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-tiktok"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                </svg>
              </a>
            )}
          </div>
          <div className="w-full lg:w-1/3 px-4 ">
            <div className="flex flex-wrap items-top space-y-8">
              <div className="w-full lg:w-7/12 px-4 ml-auto">
                <span className="block uppercase text-lg font-semibold">
                  Contact us
                </span>
                <ul className="list-unstyled py-2 space-y-2 mb-2 ">
                  <li className="flex flex-row items-center gap-2 font-medium">
                    <Mail className=" text-gray-500 dark:text-slate-300" />
                    {store.storeMail}
                  </li>
                  <li className="flex flex-row gap-2 font-medium">
                    <Phone className=" text-gray-500 dark:text-slate-300" />
                    {store.storePhone}
                  </li>
                </ul>
                <div className="relative w-[100px] h-[80px] lg:mx-auto ">
                  <Image
                    src={store.logoUrl || ""}
                    alt="Storefront logo"
                    fill
                    className="aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
