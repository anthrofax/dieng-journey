import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Anda belum mengisi email" })
    .email("Email yang anda masukkan tidak valid"),
  password: z
    .string()
    .min(6, {
      message: "Kata sandi yang anda masukkan harus minimal 6 karakter",
    }),
  rememberMe: z.boolean(),
});

export { schema };
