import { z } from "zod";

export const schema = z
  .object({
    nama: z
      .string({
        message: "Anda perlu mengisi kolom nama minimal 3 karakter",
      })
      .min(3, {
        message: "Anda perlu mengisi kolom nama minimal 3 karakter",
      }),
    nomorHp: z
      .string({
        message: "Anda perlu mengisi kolom nomor telepon",
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
    masaPerjalanan: z
      .number({
        message: "Anda harus mengisi jumlah pemesanan tiket minimal 1",
      })
      .min(1, { message: "Anda harus mengisi masa perjalanan minimal 1 hari" }),
    penginapanId: z
      .string({
        message: "Isian penginapan tidak valid",
      })
      .optional(),
    tanggalPerjalanan: z.date({
      message: "Anda belum mengisi tanggal perjalanan",
    }),
    qty: z
      .number({
        message: "Anda harus mengisi jumlah pemesanan tiket minimal 1",
      })
      .min(1, {
        message: "Anda harus mengisi jumlah pemesanan tiket minimal 1",
      }),
    experience: z.array(z.string()).optional(),
  })
  .superRefine(({ masaPerjalanan, penginapanId }, ctx) => {
    console.log(penginapanId);
    if (masaPerjalanan === 3 && penginapanId === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Kamu harus memilih opsi penginapan jika masa perjalanan mu 3 hari",
        path: ["penginapanId"],
      });
    }
  });
