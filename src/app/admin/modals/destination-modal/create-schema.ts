import { z } from "zod";

export const createSchema = z.object({
  destinationName: z.string().min(1, { message: "Kolom nama harus diisi!" }),
  description: z.string().min(1, { message: "Kolom deskripsi harus diisi!" }),
  city: z.string().min(1, { message: "Kolom lokasi harus diisi!" }),
  price: z
    .number()
    .min(100000, { message: "Harga destinasi minimal Rp.100.000,00-" }),
});
