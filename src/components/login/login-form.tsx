"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginSchema from "@/schema/login-schema";
import { useAuthContext } from "@/contexts/auth-context";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    errors: authErrorMessages,
    normalMessages,
    setErrors,
    setNormalMessages,
  } = useAuthContext();
  let defaultEmail = "";
  let defaultPassword = "";

  useEffect(() => {
    if (authErrorMessages.length > 0)
      authErrorMessages.forEach((message) => {
        toast.error(message, {
          duration: 5000,
        });
        setNormalMessages((messages) =>
          messages.filter((msg) => msg !== message)
        );
      });

    if (normalMessages.length > 0) {
      normalMessages.forEach((message) => {
        toast.success(message, {
          duration: 3000,
        });
        setErrors((messages) => messages.filter((msg) => msg !== message));
      });
    }
  }, [setErrors, setNormalMessages]);

  const [showPassword, setShowPassword] = useState(false);

  if (typeof window !== "undefined") {
    const account = JSON.parse(
      localStorage.getItem("remember-account") || "{}"
    );

    defaultEmail = account.email || "";
    defaultPassword = account.password || "";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: defaultEmail,
      password: defaultPassword,
      rememberMe: !!defaultEmail,
    },
    resolver: zodResolver(loginSchema),
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
    else {
      localStorage.removeItem("remember-account");
    }
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (
          res.error ===
          "Akun anda belum terverifikasi, silahkan cek email anda."
        )
          throw new Error(res.error);

        throw new Error(
          "Email atau kata sandi yang anda masukkan tidak valid."
        );
      } else window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) return toast.error(`${error.message}`);

      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              Ingat saya
            </label>
          </div>
        </div>
        <a
          href="/reset-password"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Lupa kata sandi?
        </a>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="w-full text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400/70"
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Anda belum memiliki akun?{" "}
        <a
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline"
        >
          daftar
        </a>{" "}
        Disini
      </p>
    </form>
  );
}

export default LoginForm;
