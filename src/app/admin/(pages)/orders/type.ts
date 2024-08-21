import {
  Destination,
  Experience,
  Order,
  PackageOrder,
  Penginapan,
  User,
} from "@prisma/client";
import React from "react";

export type AdminRegularOrderType = Order & {
  user: User;
  penginapan?: Penginapan | null;
  destination: Destination;
  experiences: {
    experiences: Experience;
  }[];
};

export type AdminPackageOrderType = PackageOrder & {
  user: User;
  penginapan?: Penginapan | null;
  destinations: {
    destinations: Destination;
  }[];
  experiences: {
    experiences: Experience;
  }[];
};

export type CombinedOrdersType = {
  userProfile: string;
  nama: string | string[];
  nomorHp: string;
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  opsiPenginapan: Penginapan | undefined;
  tanggalPerjalanan: Date;
  destinasi:
    | Destination
    | {
        destinations: Destination;
      }[];
  jumlahPembelianTiket: number;
  totalPendapatan: number;
  experience: {
    experiences: Experience;
  }[];
  jenisPesanan: "Reguler";
  action: React.ReactNode;
};
