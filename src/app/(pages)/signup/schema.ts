import { z } from "zod";

const schema = z
  .object({
    username: z.string().min(1, { message: "Anda harus menentukan username" }),
    email: z.string().min(1, { message: "Kolom email harus diisi!" }),
    password: z
      .string()
      .min(6, { message: "Kata sandi minimal memerlukan 6 karakter" }),
    confirmPassword: z.string(),
    termCondition: z.boolean().refine((val) => val === true, {
      message: "Anda belum menyetujui 'Terms & Condition'",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kata sandi yang anda masukkan tidak cocok",
        path: ["confirmPassword"],
      });
    }
  });

export { schema };
