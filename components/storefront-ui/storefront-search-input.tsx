"use client";

import { ChangeEventHandler, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

import qs from "query-string";
import { Search } from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/activity-button";

export const StoreFrontSearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams ? searchParams.get("productId") : null;
  const name = searchParams ? searchParams.get("name") : null;
  const params = useParams();

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const performSearch = () => {
    if (!debouncedValue || debouncedValue.length < 3) {
      return;
    }
    const query = {
      name: debouncedValue,
      productId: productId,
    };

    const url = qs.stringifyUrl(
      {
        url: `/${params?.username}/search`,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
    setValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  return (
    <div className="w-3/4 md:w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md  flex justify-center items-center">
      <div className="p-1 md:py-3 md:px-8 w-full flex flex-row gap-3 items-center">
        <Button
          onClick={performSearch}
          className=" h-10 w-10 bg-white dark:bg-gray-900 text-gray-500 dark:text-slate-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Search size={20} className="text-bold" />
        </Button>
        <Input
          onChange={onChange}
          onKeyPress={handleKeyPress}
          value={value}
          placeholder="Search store..."
          className=" h-full border-0 focus-visible:ring-2  outline-none dark:text-white text-black dark:bg-gray-900 placeholder:text-[#C4C4C4] placeholder:text-[14px] "
        />
        <div></div>
      </div>
    </div>
  );
};
