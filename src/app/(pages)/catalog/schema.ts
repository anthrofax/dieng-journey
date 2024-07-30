import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod";

const schema = z.object({
  location: z.enum(
    optionLocations.map(({ value }) => value) as [string, ...string[]]
  ),
  min_price: z
    .number()
    .min(1000, { message: "Harga tidak boleh kurang dari Rp.1000,00-" }),
  max_price: z
    .number()
    .max(10000000, {
      message: "Harga tidak boleh lebih dari Rp.10.000.000,00-",
    }),
  type: z.enum(optionTypes.map(({ value }) => value) as [string, ...string[]]),
});

export { schema };
