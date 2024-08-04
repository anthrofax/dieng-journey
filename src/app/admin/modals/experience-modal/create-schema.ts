import { z } from "zod";

export const createSchema = z.object({
  namaExperience: z
    .string({ message: "Kolom nama experience harus diisi!" })
    .min(1, { message: "Kolom nama experience harus diisi!" }),
  deskripsi: z
    .string({ message: "Kolom deskripsi harus diisi!" })
    .min(1, { message: "Kolom deskripsi harus diisi!" }),
  biaya: z
    .number({ message: "Kolom harga harus diisi!" })
    .min(1, { message: "Kolom harga harus diisi!" }),
});
