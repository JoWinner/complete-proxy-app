"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

import { OrderInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "react-hot-toast";

export const OrderDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "viewOrderInfo";
  const { orderDetails } = data;

  // const onCopy = (id: string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success("Order details copied to clipboard");
  // };

  const onCopy = (orderDetails: OrderInfo) => {
    const detailsString = `
  Order ID: ${orderDetails.id}
  Date: ${orderDetails?.createdAt}
  Product: ${orderDetails.productName}
  Price: ${orderDetails.price}
  Quantity: ${orderDetails.quantity}
  Total Amount: ${orderDetails.totalAmount}
  Weight: ${orderDetails.totalWeight}kg
  Name: ${orderDetails.buyerName}
  Email: ${orderDetails.buyerEmail}
  Phone: ${orderDetails.buyerPhoneNumber}
  Country: ${orderDetails.buyerCountry}
  State/Province: ${orderDetails.buyerProvince}
  City: ${orderDetails.buyerCity}
  Street Address: ${orderDetails.buyerStreetAddress}
  ZIP/Postal Code: ${orderDetails.buyerZipCode}
    `.trim();

    navigator.clipboard.writeText(detailsString);
    toast.success("Order details copied to clipboard");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-4 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Order Details
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            View all details for order the order including seller Id
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" max-h-[420px]">
          <div className="flex  items-center justify-center pb-3">
            <Carousel className="w-full max-w-xs flex  items-center justify-center">
              <CarouselContent>
                {orderDetails?.images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="aspect-square h-48 rounded-xl  relative flex items-center">
                      <Image
                        src={image.url}
                        alt={`Product Image ${index + 1}`}
                        fill
                        className="aspect-square object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant="default" />
              <CarouselNext variant="default" />
            </Carousel>
          </div>
          <div className="flex flex-col items-start px-14 justify-between space-y-3 ">
            <div className="flex flex-col  space-y-1 ">
              <h2 className="text-xl font-semibold underline">Order Details</h2>
              <h3 className="text-sm bg-orange-500 rounded-md p-1 text-white font-medium ">
                Status:
                <span className="ml-4 font-semibold">
                  {orderDetails?.status}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Order Id:
                <span className="ml-4 font-semibold">{orderDetails?.id}</span>
              </h3>
              <h3 className="text-sm font-normal ">
                Date:
                <span className="ml-4 font-semibold">
                  {orderDetails?.createdAt}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Product:
                <span className="ml-4 font-semibold">
                  {orderDetails?.productName}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Price:
                <span className="ml-4 font-semibold">
                  {orderDetails?.price}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Quantity :
                <span className="ml-4 font-semibold">
                  {orderDetails?.quantity}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Amount:
                <span className="ml-4 font-semibold">
                  {orderDetails?.totalAmount}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Weight:
                <span className="ml-4 font-semibold">
                  {orderDetails?.totalWeight}kg
                </span>
              </h3>
            </div>
            <div className="flex flex-col space-y-1">
              <h2 className="text-xl font-semibold underline">
                Buyer Details:
              </h2>
              {/* <h3 className="text-sm font-normal ">
              Buyer Id: <span className="ml-4 font-semibold">{orderDetails?.buyerId}</span>
            </h3> */}
              <h3 className="text-sm font-normal ">
                Name:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerName}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Email:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerEmail}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Phone:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerPhoneNumber}
                </span>
              </h3>

              <h3 className="text-sm font-normal ">
                Country:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerCountry}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                State/Province :
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerProvince}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                City:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerCity}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                Street Address:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerStreetAddress}
                </span>
              </h3>
              <h3 className="text-sm font-normal ">
                ZIP/Postal Code:
                <span className="ml-4 font-semibold">
                  {orderDetails?.buyerZipCode}
                </span>
              </h3>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button
            variant="default"
            onClick={() => orderDetails && onCopy(orderDetails)}
          >
            Copy details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
