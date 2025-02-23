"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Profile, Country } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/dashboard-button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  countryId: z.string().min(1),
  streetAddress: z.string().min(4),
  city: z.string().min(1),
  stateProvince: z.string().min(2),
  zipCode: z.string().min(2),
  phoneNumber: z.string().min(5),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialData: Profile | null;
  countries: Country[];
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  countries,
}) => {
    
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = "Profile";
  const description = "Update  profile";
  const toastMessage = "Profile updated.";
  const action = "Save changes";

  const defaultValues = initialData
    ? {
        countryId: initialData.countryId || "",
        streetAddress: initialData.streetAddress || "",
        city: initialData.city || "",
        stateProvince: initialData.stateProvince || "",
        zipCode: initialData.zipCode || "",
        phoneNumber: initialData.phoneNumber || "",
      }
    : {
        countryId: "",
        streetAddress: "",
        city: "",
        stateProvince: "",
        zipCode: "",
        phoneNumber: "",
      };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        if (!params) {
          throw new Error("No route parameters found");
        }
        await axios.patch(`/api/profile/${params.profileId}`, data);
      } else {
        await axios.post(`/api/profile`, data);
      }
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      
      <Form {...form}>
        <div className="w-fit border-2 border-gray-900 dark:border-gray-400 p-2 rounded-md cursor-default">
          <h1 className="font-medium text-base">Email: {initialData?.email}</h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">        
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="(+234) 21 00 28 24"
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
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
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
                          placeholder="Select your country"
                          className=" dark:bg-zinc-700/75 dark:text-zinc-100"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" dark:bg-zinc-700 dark:text-zinc-100">
                      {countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
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
              name="stateProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder=" "
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Accra"
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
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Add detailed location"
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
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="9100"
                      {...field}
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
