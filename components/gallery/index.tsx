"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { Image } from "@/types";

import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse ">
      <div className="mx-auto mt-4  w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-5 gap-6 ">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="min-h-[50vh] w-2/3 mx-auto ">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className=" relative h-72 w-72  rounded-lg overflow-hidden">
              <NextImage
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center rounded-lg"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
