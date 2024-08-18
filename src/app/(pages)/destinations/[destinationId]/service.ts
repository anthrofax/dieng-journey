import AXIOS_API from "@/utils/axios-api";
import { Experience, Penginapan } from "@prisma/client";
import toast from "react-hot-toast";
import { TokenizerRequestBodyType } from "./type";

export const redirectToCheckout = async (checkoutData: TokenizerRequestBodyType) => {
  try {
    const response = await AXIOS_API.post("/order-tokenizer", checkoutData);

    const requestData = response.data;

    // @ts-ignore
    await window!.snap.pay(requestData.token);
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
