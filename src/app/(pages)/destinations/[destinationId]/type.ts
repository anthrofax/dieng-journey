import { Experience, Penginapan } from "@prisma/client";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type OrderFormFieldType = {
  experience: string[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string;
  nomorHp: string;
  penginapanId: string;
  qty: number;
  tanggalPerjalanan: Date;
};

export type RegularOrderContextType = {
  form: UseFormReturn<OrderFormFieldType, any, undefined>;
  handlePayment: (
    data: FieldValues & OrderFormFieldType
  ) => Promise<string | undefined>;
  masaPerjalanan: number;
  namaDestinasi: string;
  allExperiences: Experience[];
  allLodgings: Penginapan[];
  isLoadingExperienceQuery: boolean;
  isLoadingLodgingQuery: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TokenizerRequestBodyType = {
  namaDestinasi: string;
  hargaDestinasi: number;
  destinationId: string;
  experience: string[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string;
  nomorHp: string;
  penginapanId: string;
  qty: number;
  tanggalPerjalanan: Date;
  allExperiences: Experience[];
  allLodgings: Penginapan[];
  totalBiaya: number;
};

export type RegularOrderMidtransNotificationMetadataType = {
  experience: Experience[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string;
  nomorHp: string;
  tanggalPerjalanan: Date;
  userId: string;
  qty: number;
  totalBiaya: number;
  destinationId: string;
  penginapanId: string;
};
