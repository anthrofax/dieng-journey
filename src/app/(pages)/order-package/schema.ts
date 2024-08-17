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
  destinasi: z.array(z.string()).max(3, {
    message: "Destinasi yang dapat dipilih pada paket Healing maksimal 3.",
  }),
  lokasiPenjemputan: z
    .string({
      message: "Anda belum memilih lokasi penjemputan anda",
    })
    .min(1, {
      message: "Anda belum memilih lokasi penjemputan anda",
    }),
  tanggalPerjalanan: z.date({
    message: "Anda belum mengisi tanggal perjalanan",
  }),
});

export const travellingSchema = z.object({
  nama: z
    .array(
      z.string({
        message: "Anda perlu mengisi kolom nama",
      })
    )
    .min(4, {
      message:
        "Anda perlu melengkapi anggota kelompok perjalananmu, minimal 4 orang.",
    })
    .refine(
      (arr) => {
        const hasShortNames = arr.some((name) => name.length < 3);
        return !hasShortNames || arr.length >= 4;
      },
      {
        message:
          "Jika ada nama yang kurang dari 3 karakter, total anggota minimal harus 4 orang.",
      }
    ),
  nomorHp: z
    .string({
      message: "Anda harus mengisi nomor telepon",
    })
    .min(1, {
      message: "Anda harus mengisi nomor telepon",
    }),
  destinasi: z.array(z.string()).max(5, {
    message: "Destinasi yang dapat dipilih pada paket Travelling maksimal 5.",
  }),
  lokasiPenjemputan: z
    .string({
      message: "Anda belum memilih lokasi penjemputan anda",
    })
    .min(1, {
      message: "Anda belum memilih lokasi penjemputan anda",
    }),
  penginapanId: z
    .string({
      message: "Anda belum memilih opsi penginapan",
    })
    .min(1, {
      message: "Anda belum memilih opsi penginapan",
    }),
  tanggalPerjalanan: z.date({
    message: "Anda belum mengisi tanggal perjalanan",
  }),
  experience: z.array(z.string()).optional(),
});
