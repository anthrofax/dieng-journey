"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Message, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useRouter } from "next/navigation";
import AXIOS_API from "@/utils/axios-api";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { GoInfo } from "react-icons/go";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
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
    setIsLoading(true);

    const { username, email, password } = data;
    try {
      await AXIOS_API.post("/register", {
        username,
        email,
        password,
      });

      toast.success(
        "Akun anda berhasil dibuat! Mengarahkan anda ke halaman login"
      );

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error) {
      console.log(error);
      toast.error("Terdapat kesalahan saat mendaftarkan akun anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" bg-[url('/img/brand_image_8.jpg')] bg-no-repeat bg-cover bg-blend-darken relative">
      <div className="absolute w-full h-full bg-black/50 mix-blend-multiply"></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 relative z-10">
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
              Buat Akunmu Disini
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              onSubmit={handleSubmit((data) => {
                confirmAlert({
                  customUI: ({ onClose }: { onClose: () => void }) => {
                    return (
                      <ConfirmationBox
                        icon={<GoInfo />}
                        judul="Konfirmasi Data"
                        pesan="Apakah anda sudah yakin data yang anda masukkan sudah benar?"
                        onClose={onClose}
                        onClickIya={() => onSubmit(data)}
                        labelIya="Sudah"
                        labelTidak="Sebentar, saya cek lagi"
                      />
                    );
                  },
                });
              })}
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
                Kamu sudah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login disini
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
