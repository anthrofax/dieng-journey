import { z } from "zod";

// Define the schema for the object
export const schema = z
  .object({
    username: z.string(),
    phone: z
      .string()
      .max(15, { message: "Nomor yang anda inputkan tidak valid" }),
    password: z.string(),
    confirmPassword: z.string(),
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
