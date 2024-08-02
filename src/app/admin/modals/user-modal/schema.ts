import { z } from "zod";

const schema = z.object({
  username: z.string({ message: "Terdapat kesalahan pada username anda" }),
  displayName: z.string({
    message: "Terdapat kesalahan pada nama tampilan anda",
  }),
  email: z
    .string()
    .email("Alamat email tidak valid")
    .min(1, { message: "Kolom email tidak boleh kosong!" }),
  phone: z.string({ message: "Terdapat kesalahan pada nomor telepon anda" }),
  isAdmin: z.any({message: "Terdapat kesalahan pada switch 'Apakah Admin?'"})
});

export { schema };
