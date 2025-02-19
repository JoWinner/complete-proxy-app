"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CreateOrder } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";
import { formatter } from "@/lib/utils";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
  productId: z.string().min(1),
  quantity: z.coerce.number().min(1),
  totalWeight: z.coerce.number().min(1),
  totalAmount: z.coerce.number().min(1),
});

export const CreateOrderModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [selectedProduct, setSelectedProduct] = useState<CreateOrder | null>(
    null
  );

  const isModalOpen = isOpen && type === "createOrder";
  const { products } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedProduct?.name || "",
      productId: selectedProduct?.id || "",
      quantity: 1,
      totalWeight: 1,
      totalAmount: 1,
    },
  });

  const handleProductChange = (productId: string) => {
    const product =
      data.products?.find((prod) => prod.id === productId) || null;
    setSelectedProduct(product);

    if (product) {
      const quantity = form.getValues("quantity");
      form.setValue("productId", productId);
    }
  };

  const watchedQuantity = form.watch("quantity");
  const watchedTotalWeight = form.watch("totalWeight");
  const watchedTotalAmount = form.watch("totalAmount");

  useEffect(() => {
    if (selectedProduct) {
      const totalWeight = watchedQuantity * Number(selectedProduct.weight);
      const totalAmount = watchedQuantity * Number(selectedProduct.price);

      form.setValue("totalWeight", totalWeight);
      form.setValue("totalAmount", totalAmount);
    }
  }, [watchedQuantity, selectedProduct, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const orderData = {
        ...values,
        name: selectedProduct?.name,
        groupId: selectedProduct?.groupId,
        sellerId: selectedProduct?.sellerId,
      };
      await axios.post(`/api/orders`, orderData);
      toast.success("Order created successfully! We will contact you shortly");
      onClose();
    } catch (error) {
      toast.error("Cannot create order");

      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-4 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Order
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Start creating order
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-6">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Product</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleProductChange(value);
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select product"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data.products?.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex  items-center justify-center">
                  {selectedProduct && (
                    <Carousel className="w-full max-w-xs flex  items-center justify-center">
                      <CarouselContent>
                        {selectedProduct.images.map((image, index) => (
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
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center">
                  <h3 className="font-medium text-base mr-2">Price:</h3>
                  <h5 className="text-base text-white font-medium p-1 rounded-md bg-purple-500">
                    {selectedProduct?.price
                      ? formatter.format(Number(selectedProduct.price))
                      : ""}
                  </h5>
                </div>
                <div className="flex flex-row items-center">
                  <h3 className="font-medium text-base mr-2">MOQ:</h3>
                  <h5 className="text-base font-medium p-1 rounded-md bg-green-500 text-white">
                    {selectedProduct?.moq}
                  </h5>
                </div>
                <div className="flex flex-row items-center">
                  <h3 className="font-medium text-base mr-2">Weight:</h3>
                  <h5 className="text-base font-medium p-1 rounded-md bg-amber-500  text-white ">
                    {selectedProduct?.weight}kg
                  </h5>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <h5 className="text-base font-normal text-rose-500">
                  Enter quantity of
                  <span className="font-bold text-base mx-2">
                    {selectedProduct?.name}
                  </span>
                  you want to order:
                </h5>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base font-medium">
                        Order Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={Number(selectedProduct?.moq)}
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 flex flex-row sm:flex-row sm:justify-between items-center justify-between">
              <div className="text-base px-1 border-2 border-gray-500 bg-gray-900 rounded-sm text-white flex flex-col justify-center">
                <h5 className="font-normal">
                  Total Weight:
                  <span className="font-bold ml-4">{watchedTotalWeight}kg</span>
                </h5>
                <h5>
                  Total Amount:
                  <span className="font-bold ml-4">
                    {formatter.format(watchedTotalAmount)}
                  </span>
                </h5>
              </div>

              <Button variant="default" disabled={isLoading}>
                Create order
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
