import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, TriangleAlert } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        const res = await signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
        });
        if (res?.error) {
          toast.error("Invalid Credentials");
          return;
        }
        toast.success("Login Successful");
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      } else {
        toast.error("Please fill the form");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  }
  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="h-[24rem] w-96 rounded-2xl shadow-xl p-5"
      >
        <h1 className="text-center text-lg mt-2 font-semibold">
          Login to your Skillify account
        </h1>
        <hr className="mt-2 "></hr>

        <div className="mt-4">
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e?.target?.value);
            }}
          />

          <Input
            type="password"
            value={password}
            placeholder="Password"
            className="mt-4"
            onChange={(e) => {
              setPassword(e?.target?.value);
            }}
          />
        </div>
        <div className="mt-4">
          <Button className="w-full h-12" type="submit">
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
        </div>
        <p className="mt-2 text-center text-black/50">or</p>
        <div className="mt-2 w-full">
          <GoogleButton
            label="Continue with Google"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
            style={{ width: "100%" }}
          />
          <div className=" w-full mt-4 text-center">
            <p className="text-sm font-medium text-black/50">
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => {
                  router.replace("/register");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
