"use client";
import { useState, useEffect, useMemo } from "react";
import getCategories from "@/actions/get-categories";
import IconButton from "@/components/ui/icon-button";
import { Category } from "@/types";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

const Categories = () => {
  const origin = useOrigin();

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCategories = await getCategories(origin);
        setCategoryList(fetchCategories);
        // console.log("Yhe Categories",fetchCategories)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [origin]);
  const categories = useMemo(() => {
    return categoryList
      ? categoryList.slice(0, expanded ? categoryList.length : 5)
      : [];
  }, [categoryList, expanded]); // Add useMemo


  // const categories = categoryList
  //   ? categoryList.slice(0, expanded ? categoryList.length : 5)
  //   : [];

  // Toggle the expand/collapse state
  const handleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div className=" px-4 ">
      <ul
        className={`flex flex-wrap items-start justify-center px-6  ${
          expanded
            ? " py-5 translate-y-4 transform duration-500 transition-transform"
            : " overflow-hidden -translate-y-8 transform duration-500 transition-transform relative py-5"
        }`}
      >
        {categories.map((category) => (
          <li
            key={category.name}
            className="bg-[#feffff] dark:bg-gray-900 border dark:border-black/40 dark:shadow-black dark:text-white font-medium px-3 py-2 m-1 text-sm text-gray-700 rounded-md shadow-lg ring ring-transparent group hover:ring cursor-pointer focus:ring-opacity-50 hover:ring-slate-300 duration-50 transition-all"
          >
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <div className=" rounded-full w-10  ml-16 mt-2">
        {expanded ? (
          <IconButton
            onClick={handleExpand}
            icon={
              <Minus size={20} className="text-gray-500 dark:text-slate-300" />
            }
          />
        ) : (
          <IconButton
            onClick={handleExpand}
            icon={
              <Plus size={20} className="text-gray-500 dark:text-slate-300" />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
