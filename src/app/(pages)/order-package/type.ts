export type HealingFormFieldType = {
  nama: string[];
  nomorHp: string;
  destinasi: string[];
  lokasiPenjemputan: string;
  tanggalPerjalanan: Date;
};

export type TravellingFormFieldType = {
  nama: string[];
  nomorHp: string;
  destinasi: string[];
  lokasiPenjemputan: string;
  penginapanId: string;
  tanggalPerjalanan: Date;
  experience: string[];
};

export type TokenizerRequestBodyType = {
  nama: string[];
  nomorHp: string;
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  tanggalPerjalanan: Date;
  daftarDestinasi: string[];
  totalBiaya: number;
  experience: string[];
  penginapanId: string | null;
  selectedPackage: string;
};

export type PackageOrderMidtransNotificationMetadataType = {
  experience: string[];
  lokasiPenjemputan: string;
  masaPerjalanan: number;
  nama: string[];
  nomorHp: string;
  tanggalPerjalanan: string;
  userId: string;
  totalBiaya: number;
  penginapanId: string | null;
  daftarDestinasi: string[];
  tokenizerType: string;
};
