"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import {  Category, Image, Product, Group } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

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
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { MultiFileUpload } from "@/components/multi-file-upload";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please give name to the product" })
    .max(35, { message: "Product name too long" }),
  description: z.string().max(400),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  moq: z.coerce.number().min(1),
  weight: z.string().optional(),
  categoryId: z.string().min(1),
  groupId: z.string().min(1),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  groups: Group[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  groups,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        groupId: initialData.groupId || "",
        price: parseFloat(String(initialData?.price)),
        weight: initialData.weight || undefined,
      }
    : {
        name: "",
        description: "",
        images: [],
        price: 10.00,
        groupId: "",
        weight: "",
        moq: 100,
        categoryId: "",
        isArchived: false,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        if (!params) {
          throw new Error("No route parameters found");
        }
        await axios.patch(`/api/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/products`, data);
      }
      router.refresh();
      router.push(`/dashboard/activity/products`);
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
      if (!params) {
        throw new Error("No route parameters found");
      }
      await axios.delete(`/api/products/${params.productId}`);
      router.refresh();
      router.push(`/dashboard/activity/products`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <MultiFileUpload
                    endpoint="productImages"
                    value={field.value.map((image) => image.url)}
                    onChange={(urls) =>
                      field.onChange(urls?.map((url) => ({ url })))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid:cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          field.onChange(value.toFixed(2));
                        }
                      }}
                      className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" dark:bg-zinc-700/75 dark:text-zinc-100">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a group for this product"
                          className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" dark:bg-zinc-700 dark:text-zinc-100">
                      {groups?.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className=" dark:bg-zinc-700/75 dark:text-zinc-100">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                          className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" dark:bg-zinc-700 dark:text-zinc-100">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-2">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight(kg)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Weight: 1kg, 0.04kg"
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
                name="moq"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moq</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="100"
                        {...field}
                        className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Add some details"
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
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      Archived product will not appear anywhere on the store.
                    </FormDescription>
                  </div>
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
