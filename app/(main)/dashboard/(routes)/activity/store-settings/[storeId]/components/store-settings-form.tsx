"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Trash, ArrowUpRightFromCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {  Store } from "@prisma/client";

import { useParams, useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/activity-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";


const formSchema = z.object({
  storeName: z.string().min(1),
  logoUrl: z.string().min(2, {
    message: "Logo/image required",
  }),
  username: z.string().min(4),
});

type StoreFormValues = z.infer<typeof formSchema>;

interface StoreFormProps {
  initialData: Store;
  username: string;
}

export const StoreSettingsForm: React.FC<StoreFormProps> = ({
  initialData,
  username,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastMessage = "Store updated.";
  const action = "Save changes";

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      logoUrl: initialData?.logoUrl || "",
    },
  });

  const onSubmit = async (data: StoreFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        if (!params) {
          throw new Error("No route parameters found");
        }
        await axios.patch(`/api/store/${params.storeId}`, data);
      } else {
        await axios.post(`/api/store`, data);
      }
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/store/${params?.storeId}`);
      router.refresh();
      router.push("/dashboard");
      toast.success("Store deleted");
    } catch (error) {
      toast.error(
        "Please make sure you have removed all products and categories first"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Heading title="Settings" description="Storefront Setup" />
          <h3 className="text-black dark:text-zinc-400">
            Add store information as you want to appear on your storefront
          </h3>
        </div>
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          className=""
        >
          <Trash className="h-4 w-14" />
        </Button>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col ">
              <div className="flex flex-col">
                <h1 className="mt-8 font-medium text-lg text-black dark:text-white">
                  Storefront logo
                </h1>
                <h3 className="font-normal text-sm text-zinc-500 dark:text-zinc-400">
                  Add a logo or image of your business
                </h3>
              </div>
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="groupImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <a
              href={`/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              <ArrowUpRightFromCircle />
            </a>
          </div>
          <div className="grid grid:cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digi Shop"
                      {...field}
                      className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="@digishop "
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toLowerCase())
                      }
                      className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
