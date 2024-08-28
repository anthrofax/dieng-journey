import AXIOS_API from "@/utils/axios-api";
import { Experience, Penginapan } from "@prisma/client";
import toast from "react-hot-toast";
import { TokenizerRequestBodyType } from "./type";
import { Dispatch, SetStateAction } from "react";
import { on } from "stream";

export const redirectToCheckout = async (
  checkoutData: TokenizerRequestBodyType,
  setIsLoadingPayment: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const response = await AXIOS_API.post("/order-tokenizer", checkoutData);

    const requestData = response.data;

    // @ts-ignore
    await window!.snap.pay(requestData.token, {
      onSuccess: function (result: any) {
        // Pembayaran berhasil, arahkan ke halaman /orders
        window.location.href = "/orders";
      },
      onPending: function (result: any) {
        // Pembayaran dalam status pending
        setIsLoadingPayment(false);
        toast.error("Pembayaran dibatalkan");
      },
      onError: function (result: any) {
        // Tangani kesalahan pembayaran
        setIsLoadingPayment(false);
        toast.error("Pembayaran tidak valid");
      },
      onClose: function () {
        // Pengguna menutup popup pembayaran
        setIsLoadingPayment(false);
        toast.error("Pembayaran dibatalkan");
      },
    });
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
