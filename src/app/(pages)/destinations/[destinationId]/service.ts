import AXIOS_API from "@/utils/axios-api";
import { Listing } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

export const redirectToCheckout = async ({
  namaDestinasi,
  hargaDestinasi,
  experience,
  lokasiPenjemputan,
  masaPerjalanan,
  nama,
  nomorHp,
  penginapan,
  qty,
  tanggalPerjalanan,
  totalBiaya,
  destinationId
}: {
  namaDestinasi: string;
  hargaDestinasi:number;
  destinationId: string
  experience: string[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string;
  nomorHp: string;
  penginapan: string;
  qty: number;
  tanggalPerjalanan: Date;
  totalBiaya: number;
}) => {
  try {
    const response = await AXIOS_API.post("/tokenizer", {
      experience,
      lokasiPenjemputan,
      masaPerjalanan,
      nama,
      nomorHp,
      penginapan,
      qty,
      tanggalPerjalanan,
      totalBiaya,
      namaDestinasi,
      hargaDestinasi,
      destinationId
    });

    const requestData = response.data;

    console.log({ requestData });

    // @ts-ignore
    const result = await window!.snap.pay(requestData.token);

    console.log(result);
  } catch (error) {
    toast.error("Invalid Payment");
  }
};
