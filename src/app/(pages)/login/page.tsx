"use client";

import { Message, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { MdOutlineTravelExplore } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import Paris from "../../../../public/img/paris.jpg";
import { schema } from "./schema";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberedAccount, setRememberedAccount] = useState<{
    email?: string | undefined;
    password?: string | undefined;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const account = JSON.parse(
        localStorage.getItem("remember-account") || "{}"
      );
      setRememberedAccount(account);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: rememberedAccount?.email ? rememberedAccount.email : "",
      password: rememberedAccount?.password ? rememberedAccount.password : "",
      rememberMe: false,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      console.log(errors);
      (Object.keys(errors) as Array<keyof typeof errors>)?.map((key) => {
        toast.error(`${errors[key]?.message}`);
      });
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    const { rememberMe, email, password } = data;
    if (rememberMe)
      localStorage.setItem(
        "remember-account",
        JSON.stringify({ email, password })
      );
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("Email or password is invalid");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <section className=" bg-[url('/img/brand_image_1.jpg')] bg-no-repeat bg-cover bg-blend-darken relative">
      <div className="absolute w-full h-full bg-black/50 mix-blend-multiply" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 relative">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <MdOutlineTravelExplore size={25} />
          Dieng Journey
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Masuk dengan Akun Anda
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe@email.com"
                  defaultValue={
                    rememberedAccount?.email ? rememberedAccount.email : ""
                  }
                  {...register("email")}
                />
              </div>
              <div className="relative ">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kata Sandi
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  defaultValue={
                    rememberedAccount.password ? rememberedAccount.password : ""
                  }
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute top-2/3 -translate-y-1 right-3 flex items-center text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      {...register("rememberMe")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="reset-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
