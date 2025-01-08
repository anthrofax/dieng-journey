"use client";

import { sendResetPasswordLinkVerification } from "@/app/actions";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

function EmailInputForm() {
  const [isPending, startTransition] = useTransition();
  const { setNormalMessages } = useAuthContext();
  const router = useRouter();

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        const res = await sendResetPasswordLinkVerification(data);

        if (!res) throw new Error("Terjadi kesalahan internal.");

        if ("message" in res) {
          setNormalMessages((messages) => [...messages, res.message as string]);
          router.replace("/login");
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Terjadi kesalahan internal.");
        }
      }
    });
  }

  return (
    <form className="space-y-4 md:space-y-6" action={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-primaryBlack dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="johndoe@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400/70"
      >
        Kirim Link Verifikasi Email
      </button>
    </form>
  );
}

export default EmailInputForm;
