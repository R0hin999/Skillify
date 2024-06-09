"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { BenefitGrid } from "./_components/benefit_grid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const InstructorPage = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  //  @ts-ignore
  const userId = data?.user?.id;
  console.log(data);

  async function ReqHandler() {
    try {
      setLoading(true);
      await axios.post("/api/instructor", {
        userId: userId,
        username: data?.user?.name,
        useremail: data?.user?.email,
      });
      toast.success("Request sent successfully!");
      setTimeout(() => {
        toast("You will receive a response shortly!");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-end">
        <UserButton />
      </div>
      <div className="px-4 lg:px-52 mt-20 text-3xl font-medium">
        <h1>Are you Ready to Begin?</h1>
      </div>
      <div className="flex flex-col mt-10  items-center justify-center lg:px-52 px-4 ">
        <div className="outline outline-2 outline-black/50 hover:scale-[1.011] ease-linear transition-all p-10 w-full flex items-center shadow-sm justify-between rounded-md">
          <div className="flex flex-col">
            Request for Teacher mode
            <span className="text-xs tracking-wide text-slate-500/80">
              It may take some time to respond. Please be patient...
            </span>
          </div>
          <ConfirmModal desc={false} onConfirm={ReqHandler}>
            <Button
              type="button"
              disabled={loading}
              style={{ backgroundColor: "#6532db" }}
            >
              Submit Request
            </Button>
          </ConfirmModal>
        </div>
      </div>
      <div className="px-20 mt-24 text-center ">
        <h1 className="text-4xl font-semibold">Why Teach on Skillify</h1>
      </div>
      <BenefitGrid />
    </div>
  );
};

export default InstructorPage;
