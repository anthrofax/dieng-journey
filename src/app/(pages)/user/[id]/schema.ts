import { z } from "zod";

// Define the schema for the object
export const schema = z
  .object({
    displayName: z
      .string({ message: "Nama yang anda masukkan tidak valid" })
      .optional(),
    phone: z
      .string({ message: "Nomor yang anda inputkan tidak valid" })
      .max(15, { message: "Nomor yang anda inputkan tidak valid" })
      .optional(),
    password: z.string({ message: "Kata sandi yang anda inputkan tidak valid" }).optional(),
    confirmPassword: z.string({ message: "Kata sandi yang anda inputkan tidak valid" }).optional(),
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
