import { optionLocations, optionTypes } from "@/data/data";
import { string, z } from "zod";

const schema = z.object({
    name: z.string().min(1, {message: "Kolom nama harus diisi!"}),
    desc: z.string().min(1, {message: "Kolom deskripsi harus diisi!"}),
    beds: z.number().min(1, {message: "Kasur setidaknya berjumlah 1"}),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(optionTypes.map(({value}) => value) as [string, ...string[]]),
    location: z.enum(optionLocations.map(({value}) => value) as [string, ...string[]]),
    pricePerNight: z.number().min(15, {message: "Price must be above $15"}).max(50000, {message: "Price can't be above $50k"})
})

export {schema}