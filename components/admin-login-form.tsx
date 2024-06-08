import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AdminLoginForm = () => {
  const router = useRouter();
  async function SubmitHandler(event: FormEvent) {
    event.preventDefault();
    try {
      const resp = await axios.post("/api/isadmin", {
        email: (event.target as HTMLFormElement).elements[0].value,
        password: (event.target as HTMLFormElement).elements[1].value,
      });
      toast.success("Login Successful!");
      localStorage.setItem("admin", JSON.stringify(resp.data));
      setTimeout(() => {
        router.replace("/admin");
      }, 2500);
    } catch (error) {
      toast.error("You dont have access");
    }
  }
  return (
    <form
      className="px-4 py-6 shadow-lg rounded-lg h-72 w-80"
      onSubmit={SubmitHandler}
    >
      <div className="text-center">
        <h1 className="text-2xl font-medium">Admin Login</h1>
      </div>
      <hr></hr>
      <div className="mt-6">
        <Input type="email" placeholder="email" />
      </div>
      <div className="mt-2">
        <Input type="password" placeholder="password" />
      </div>

      <Button type="submit" className="w-full h-12 mt-8">
        Login
      </Button>
    </form>
  );
};
