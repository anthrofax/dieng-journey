"use client";

import { useState, useEffect } from "react";
import { Message, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "@/schema/signup-schema";
import { useRouter } from "next/navigation";
import AXIOS_API from "@/utils/axios-api";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { GoInfo } from "react-icons/go";
import { verifyEmail } from "@/actions/auth-actions";
import { useAuthContext } from "@/contexts/auth-context";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { setNormalMessages, setErrors } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      console.log(errors);
      Object.keys(errors)?.map((key) => {
        toast.error(`${errors[key]?.message as Message}`);
      });
    }
  }, [errors]);

  const router = useRouter();
  const onSubmit = async (data: any) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmationBox
            icon={<GoInfo />}
            judul="Konfirmasi Data"
            pesan="Apakah anda sudah yakin data yang anda masukkan sudah benar?"
            onClose={onClose}
            onClickIya={async () => {
              const res = await verifyEmail(data);

              if ("error" in res) {
                setErrors((messages) => [...messages, res.error as string]);
                toast.error(res.error as string);
              }

              if ("normalMessage" in res) {
                setNormalMessages((messages) => [
                  ...messages,
                  res.normalMessage as string,
                ]);
                router.replace("/login");
              }
            }}
            labelIya="Sudah"
            labelTidak="Sebentar, saya cek lagi"
          />
        );
      },
    });
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="username"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="diengexplorer"
          {...register("username")}
        />
      </div>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="johndoe@email.com"
          {...register("email")}
        />
      </div>
      <div className="relative ">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kata sandi
        </label>
        <input
          type={showPassword1 ? "text" : "password"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          {...register("password")}
        />
        <button
          type="button"
          className="absolute top-2/3 -translate-y-1 right-3 flex items-center text-sm"
          onClick={() => setShowPassword1(!showPassword1)}
        >
          {showPassword1 ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="relative ">
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type={showPassword2 ? "text" : "password"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          className="absolute top-2/3 -translate-y-1 right-3 flex items-center text-sm"
          onClick={() => setShowPassword2(!showPassword2)}
        >
          {showPassword2 ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="termCondition"
            aria-describedby="termCondition"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            {...register("termCondition")}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className="font-light text-gray-500 dark:text-gray-300"
          >
            Saya menyepakati{" "}
            <a
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              ketentuan dan kondisi yang berlaku
            </a>
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Daftar
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Sudah memiliki akun?{" "}
        <a
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline"
        >
          Login disini
        </a>
      </p>
    </form>
  );
}
