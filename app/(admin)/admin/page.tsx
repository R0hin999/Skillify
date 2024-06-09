"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useAdminData } from "@/hooks/use-admin-data";

interface User {
  id: string;
  username: string;
  userId: string;
  useremail: string;
  status: string;
}

const AdminDashboard = () => {
  const adminStore = useAdminData();
  const [admin, setadmin] = useState(adminStore.data);

  const [users, setUsers] = useState<User[] | string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!admin) {
      redirect("/login");
    }
  }, [admin]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get("/api/reqdata");
      if (res.data.length === 0) {
        setUsers("No user found");
      } else {
        setUsers(res.data as User[]);
      }
    }
    getData();
  }, []);

  const PerformAction = async (status: boolean, userId: string) => {
    try {
      setLoading(true);
      const resp = await axios.patch("/api/reqdata", {
        // @ts-ignore
        adminId: adminStore.data.id,
        userId,
        status,
      });
      toast.success("Action Completed");
      location.reload();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  console.log(users);

  return (
    <div>
      <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-end">
        <Button
          onClick={() => {
            adminStore.setData({});
            redirect("/login");
          }}
        >
          Signout
        </Button>
      </div>
      <div className="px-10 md:px-28 text-xl mt-20 flex items-center">
        {/* @ts-ignore */}
        Hey, {adminStore?.data?.username} <p className="animate-bounce ">👋</p>
      </div>
      <div className="px-10 md:px-28 mt-4 ">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-200">
              <TableHead className="w-[100px]">Sr.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeof users === "string" ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-medium text-xl text-center bg-slate-100"
                >
                  {users}
                </TableCell>
              </TableRow>
            ) : (
              users.length > 0 &&
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{user?.username}</TableCell>
                  <TableCell>{user?.useremail}</TableCell>
                  <TableCell>{user?.status}</TableCell>
                  <TableCell
                    className={
                      loading ? "text-right pointer-events-none" : "text-right "
                    }
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="gap-x-2">
                          Edit
                          <Pencil className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            PerformAction(true, user.userId);
                          }}
                          className="hover:bg-green-400"
                        >
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            PerformAction(false, user.userId);
                          }}
                          className="hover:bg-red-400"
                        >
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
