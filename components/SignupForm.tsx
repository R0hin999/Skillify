import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TriangleAlert } from "lucide-react";
import GoogleButton from "react-google-button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import validate from "@/Validate";
import axios from "axios";
import { signIn } from "next-auth/react";
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  async function RegisterUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await axios.post("/api/register", data);
      return response.data;
    } catch (error) {
      throw Error(error?.response?.data);
    }
  }
  async function AuthenticateUser(data: { email: string; password: string }) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
      });

      if (res?.error) {
        toast.error("Internal Server Error");
        return;
      }
      toast.success("Sign up successful!");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      console.log(error, "AuthenticateUser");
    }
  }
  const formik = useFormik({
    initialValues: {
      username: username,
      email: email,
      password: password,
    },
    validate,
    onSubmit: (values) => {
      RegisterUser(values)
        .then((result) => {
       
          setEmail(formik.values.email);
          setPassword(formik.values.password);
          setUsername(formik.values.username);
          AuthenticateUser({
            email: formik.values.email,
            password: formik.values.password,
          }).catch((err) => toast.error(err?.response?.data));
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });

  return (
    <>
      <Toaster />
      <form
        onSubmit={formik.handleSubmit}
        className={" w-96 rounded-2xl shadow-xl p-5"}
      >
        <h1 className="text-center text-xl mt-2 font-semibold">Sign Up</h1>
        <hr className="mt-2 "></hr>
        <div className="mt-4">
          {formik?.errors?.username && formik?.touched?.username && (
            <p className="p-2 bg-red-100 text-red-600 rounded-md mb-2 mt-2 flex items-center animate-pulse">
              {" "}
              <TriangleAlert style={{ marginRight: "6px" }} />{" "}
              {formik?.errors?.username}
            </p>
          )}
          <Input
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            className={
              formik?.errors?.username && formik?.touched?.username
                ? "border-2  border-red-600 "
                : ""
            }
            placeholder="Username"
            onChange={formik.handleChange}
          />
          {formik?.errors?.email && formik?.touched?.email && (
            <p className="p-2 bg-red-100 text-red-600 rounded-md mt-2 flex items-center animate-pulse">
              {" "}
              <TriangleAlert style={{ marginRight: "6px" }} />{" "}
              {formik?.errors?.email}
            </p>
          )}
          <Input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder="Email"
            className={
              formik?.errors?.email && formik?.touched?.email
                ? "mt-4 border-2  border-red-600 "
                : "mt-4"
            }
            onChange={formik.handleChange}
          />
          {formik?.errors?.password && formik?.touched?.password && (
            <p className="p-2 bg-red-100 text-red-600 rounded-md mt-2 flex  animate-pulse">
              <TriangleAlert style={{ marginRight: "6px" }} />
              {formik?.errors?.password}
            </p>
          )}
          <Input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder="Password"
            className={
              formik?.errors?.password && formik?.touched?.password
                ? "mt-4 border-2  border-red-600 "
                : "mt-4"
            }
            onChange={formik.handleChange}
          />
        </div>
        <div className="mt-4">
          <Button className="w-full h-12 font-medium" type="submit">
            Sign Up
          </Button>
        </div>
        <p className="mt-2 text-center text-black/50">or</p>
        <div className="mt-2 w-full">
          <GoogleButton
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
            label="Continue with Google"
            style={{ width: "100%" }}
          />
          <div className=" w-full mt-4 text-center">
            <p className="text-sm font-medium text-black/50">
              Already have an account? &nbsp;
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => {
                  router.replace("/login");
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
