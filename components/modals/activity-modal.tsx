"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

import axios from "axios";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { StoreModal } from "@/components/ui/store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/activity-button";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  storeName: z.string().min(1),
});

export const ActivityModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
 
    try {
      setLoading(true);

      const response = await axios.post("/api/store", values);

    
       toast.success("Store created");
      window.location.assign(`/dashboard/activity/store-settings/${response.data.id}`);
    } catch (error) {
    
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <StoreModal
      title="Create store"
      description="Add a store to customize storefront, manage products and orders"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </StoreModal>
  );
};
