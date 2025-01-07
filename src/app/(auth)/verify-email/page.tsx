"use client";
import Spinner from "@/components/spinner/spinner";
import { useAuthContext } from "@/contexts/auth-context";
import AXIOS_API from "@/utils/axios-api";
import { deleteCookie } from "@/utils/cookie";
import axios from "axios";
// import { verifyEmail } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Page() {
  const { setNormalMessages, setErrors } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    async function test() {
      try {
        const res = await AXIOS_API.post("/verify-email");
        console.log(res);

        setNormalMessages((messages) => [
          ...messages,
          res.data.message as string,
        ]);

      } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
          // Jika `err` adalah error dari Axios
          console.log(err);
          if (err.response?.data?.error) {
            setErrors((messages) => [
              ...messages,
              `${err?.response?.data.error}` as string,
            ]);
          } else {
            setErrors((messages) => [
              ...messages,
              "Terjadi kesalahan internal.",
            ]);
          }
        } else {
          setErrors((messages) => [...messages, "A non-Axios error occurred."]);
        }
      } finally {
        router.replace("/login");
      }
    }

    test();
  }, [router, setNormalMessages, setErrors]);

  return <Spinner />;
}

export default Page;
