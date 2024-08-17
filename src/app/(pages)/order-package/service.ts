import AXIOS_API from "@/utils/axios-api";
import toast from "react-hot-toast";
import { TokenizerRequestBodyType } from "./type";

export const redirectToCheckout = async (checkoutData: TokenizerRequestBodyType) => {
  console.log(checkoutData);
  try {
    const response = await AXIOS_API.post("/package-order-tokenizer", checkoutData);

    const requestData = response.data;

    // @ts-ignore
    await window!.snap.pay(requestData.token);
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
