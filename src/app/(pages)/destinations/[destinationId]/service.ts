import AXIOS_API from "@/utils/axios-api";
import toast from "react-hot-toast";

export const redirectToCheckout = async (checkoutData: {
  namaDestinasi: string;
  hargaDestinasi: number;
  destinationId: string;
  experience: string[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string;
  nomorHp: string;
  penginapanId: string ;
  qty: number;
  tanggalPerjalanan: Date;
  totalBiaya: number;
}) => {
  console.log(checkoutData)
  try {
    const response = await AXIOS_API.post("/tokenizer", checkoutData);

    const requestData = response.data;

    // @ts-ignore
    await window!.snap.pay(requestData.token);
    return toast.success("Pembayaran berhasil");
  } catch (error) {
    toast.error("Pembayaran tidak valid");
  }
};
