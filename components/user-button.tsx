"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
export const UserButton = () => {
  const { data } = useSession();
  const src = data?.user?.image as string;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="overflow-hidden size-12 rounded-full border shadow-sm">
          <Image
            alt="Profile Picture"
            src={src}
            unoptimized={true}
            width={0}
            height={0}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
