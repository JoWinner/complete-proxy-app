import Image from "next/image";
import Link from "next/link";
import { Image as Images } from "@/types";
import Currency from "@/components/ui/currency";

export type ProductInfoProps = {
  id: string;
  productName: string;
  images: Images[];
  description: string;
  weight: string;
  price: string;
  moq: string;
  categoryName: string;
  categoryId: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  productName,
  images,
  description,
  weight,
  price,
  moq,
  categoryName,
  categoryId,
}) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 p-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-row">
            <h3 className="font-normal font-urbanist-style text-base mr-2">
              Product name:
            </h3>
            <h5 className="text-base md:text-xl font-unbounded-style font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal">
              {productName}
            </h5>
          </div>

          <div className="flex flex-row">
            <h3 className="font-normal font-urbanist-style text-base mr-2">
              Product category:
            </h3>
            <Link
              href={`/category/${categoryId}`}
              className="text-base md:text-xl font-unbounded-style font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal  underline hover:text-blue-500"
            >
              {categoryName}
            </Link>
          </div>

          <div className="flex flex-row">
            <h3 className="font-normal font-urbanist-style text-base mr-2">
              Price:
            </h3>
            <h5 className="text-base md:text-xl font-unbounded-style font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal">
            <Currency value={price} />
            </h5>
          </div>

          <div className="flex flex-row">
            <h3 className="font-normal font-urbanist-style text-base mr-2">
              Minimum order quantity (moq):
            </h3>
            <h5 className="text-base md:text-xl font-unbounded-style font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal">
              {moq}
            </h5>
          </div>

          <div className="flex flex-row">
            <h3 className="font-normal font-urbanist-style text-base mr-2">
              Product weight:
            </h3>
            <h5 className="text-base md:text-xl font-unbounded-style font-medium tracking-tight text-slate-900 dark:text-gray-100 leading-normal">
              {weight}kg
            </h5>
          </div>

          <div className="flex flex-row">
            <h5 className="text-sm md:text-base font-unbounded-style font-normal text-slate-900 dark:text-gray-100 leading-normal text-left">
              {description}
            </h5>
          </div>
        </div>
        <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative ">
          <Image
            src={images?.[0]?.url}
            alt=""
            fill
            className="aspect-square object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative">
            <Image
              src={images?.[1]?.url}
              alt=""
              fill
              className="aspect-square object-cover rounded-md"
            />
          </div>
          <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative">
            <Image
              src={images?.[2]?.url}
              alt=""
              fill
              className="aspect-square object-cover rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative">
            <Image
              src={images?.[3]?.url}
              alt=""
              fill
              className="aspect-square object-cover rounded-md"
            />
          </div>
          <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 relative">
            <Image
              src={images?.[4]?.url}
              alt=""
              fill
              className="aspect-square object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
