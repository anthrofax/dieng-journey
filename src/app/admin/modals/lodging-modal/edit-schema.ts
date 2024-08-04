import { z } from "zod";

export const editSchema = z.object({
  namaPenginapan: z
    .string({ message: "Kolom nama penginapan harus diisi!" })
    .min(1, { message: "Kolom nama penginapan harus diisi!" }),
  deskripsi: z
    .string({ message: "Kolom deskripsi harus diisi!" })
    .min(1, { message: "Kolom deskripsi harus diisi!" }),
  biaya: z
    .number({ message: "Kolom harga harus diisi!" })
    .min(1, { message: "Kolom harga harus diisi!" }),
});
