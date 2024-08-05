import { z } from "zod";

export const createSchema = z.object({
  namaPenginapan: z
    .string({ message: "Kolom nama penginapan harus diisi!" })
    .min(1, { message: "Kolom nama penginapan harus diisi!" }),
  deskripsi: z.string({ message: "Nilai 'Deskripsi' tidak valid." }).optional(),
  biaya: z
    .number({ message: "Kolom harga harus diisi!" })
    .min(1, { message: "Kolom harga harus diisi!" }),
});
