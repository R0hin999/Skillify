"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IconType } from "react-icons";
import qs from "query-string";

import { cn } from "@/lib/utils";

interface CategoryProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({ label, value, icon: Icon }: CategoryProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const OnClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={OnClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-300  rounded-full flex items-center gap-x-1 hover:border-purple-700 transition",
        isSelected && "border-purple-700 bg-purple-200/50 text-purple-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
