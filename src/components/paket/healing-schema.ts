import { z } from "zod";

export const healingSchema = z.object({
  nama: z
    .array(
      z
        .string({
          message: "Anda perlu mengisi kolom nama minimal 3 karakter",
        })
        .min(3, {
          message: "Anda perlu mengisi kolom nama minimal 3 karakter",
        })
    )
    .min(4, {
      message:
        "Anda perlu melengkapi anggota kelompok perjalananmu, minimal 4 orang.",
    }),
  nomorHp: z
    .string({
      message: "Anda harus mengisi nomor telepon",
    })
    .min(1, {
      message: "Anda harus mengisi nomor telepon",
    }),
  lokasiPenjemputan: z
    .string({
      message: "Lokasi penjemputan tidak valid",
    })
    .min(1, {
      message: "Lokasi penjemputan tidak valid",
    }),
  tanggalPerjalanan: z.date({
    message: "Anda belum mengisi tanggal perjalanan",
  }),
  experience: z.array(z.string()).optional(),
});
