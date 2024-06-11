"use client";

import { Category } from "@prisma/client";
import {
  FcBusiness,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcPicture,
  FcSalesPerformance,
  FcSportsMode,
  FcDoughnutChart,
} from "react-icons/fc";

interface CategoriesProps {
  items: Category[];
}
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";
const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Culinary: FcDoughnutChart,
  "Film & Photography": FcFilmReel,
  "Health & Fitness": FcSportsMode,
  Accounting: FcSalesPerformance,
  "IT & Software": FcMultipleDevices,
  Business: FcBusiness,
  "Art & Design": FcPicture,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
