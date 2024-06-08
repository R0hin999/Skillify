"use client";
import { usePathname } from "next/navigation";
import { UserButton } from "./user-button";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data } = useSession();
// @ts-ignore
  const userId = data?.user?.id;
  const [isTeacher, setIsTeacher] = useState("");
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  useEffect(() => {
    async function GetData() {
      try {
        const resp = await axios.post("/api/isTeacher", {
          userId: userId,
        });
        setIsTeacher(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetData();
  }, [userId]);

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto text-end items-center">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button variant={"outline"}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="outline">
              Teacher mode
            </Button>
          </Link>
        ) : (
          <Link href="/instructor">
            <Button size="sm" variant="link">
              Become an Instructor
            </Button>
          </Link>
        )}
        <UserButton />
      </div>
    </>
  );
};
