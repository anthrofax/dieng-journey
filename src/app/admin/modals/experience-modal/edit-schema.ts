import { z } from "zod";

export const editSchema = z.object({
  experienceName: z
    .string({ message: "Kolom nama harus diisi!" })
    .min(1, { message: "Kolom nama harus diisi!" }),
  description: z
    .string({ message: "Kolom deskripsi harus diisi!" })
    .min(1, { message: "Kolom deskripsi harus diisi!" }),
  price: z
    .string({ message: "Kolom harga harus diisi!" })
    .min(1, { message: "Kolom harga harus diisi!" }),
  destinationId: z
    .string({ message: "Pilihan destinasi harus diisi!!" })
    .min(1, { message: "Pilihan destinasi harus diisi!" }),
});
