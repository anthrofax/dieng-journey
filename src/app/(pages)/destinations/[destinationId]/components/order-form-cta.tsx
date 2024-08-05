import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { Rupiah } from "@/utils/format-currency";
import Skeleton from "react-loading-skeleton";
import { OrderFormFieldType } from "../type";
import { Experience, Penginapan } from "@prisma/client";

export const lokasiPenjemputan = [
  {
    label: "Yogyakarta",
    value: "yogyakarta",
  },
  {
    label: "Wonosobo",
    value: "wonosobo",
  },
  {
    label: "Magelang",
    value: "magelang",
  },
];

type Props = {
  form: UseFormReturn<OrderFormFieldType, any, undefined>;
  handlePayment: (
    data: FieldValues & OrderFormFieldType
  ) => Promise<string | undefined>;
  masaPerjalanan: number;
  namaDestinasi: string;
  className?: string;
  allExperiences: Experience[];
  allLodgings: Penginapan[];
  isLoadingExperienceQuery: boolean;
  isLoadingLodgingQuery: boolean;
};

function OrderFormCTA({
  form,
  handlePayment,
  masaPerjalanan,
  className = "",
  namaDestinasi,
  allExperiences,
  allLodgings,
  isLoadingExperienceQuery,
  isLoadingLodgingQuery,
}: Props) {
  return (
    <div
      className={`shadow-3xl bg-primary mt-3 p-5 text-black rounded-lg overflow-scroll max-h-[500px] ${className}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white" htmlFor="nama">
                  Nama
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription className="text-slate-300">
                  Isi nama anda untuk data pemesanan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomorHp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white" htmlFor="nomorHp">
                  Nomor Telepon
                </FormLabel>
                <FormControl>
                  <Input placeholder="0857....." {...field} />
                </FormControl>
                <FormDescription className="text-slate-300">
                  Isi nomor telepon anda untuk data pemesanan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lokasiPenjemputan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white" htmlFor="lokasiPenjemputan">
                  Lokasi Penjemputan
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Pilih Lokasi Penjemputan anda"
                        defaultValue="wonosobo"
                        className="placeholder:text-slate-300 text-slate-300"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lokasiPenjemputan.map((lokasi, i) => (
                      <SelectItem value={lokasi.value} key={i}>
                        {lokasi.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-slate-300">
                  Pilih lokasi penjemputan anda diantara{" "}
                  {lokasiPenjemputan.length} lokasi tersebut
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="masaPerjalanan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white" htmlFor="penginapan">
                  Masa Perjalanan
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(+value);
                  }}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Tentukan masa perjalanan anda"
                        className="placeholder:text-slate-300 text-slate-300"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Hari</SelectItem>
                    <SelectItem value="3">3 Hari</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-slate-300">
                  Jika kamu memilih waktu 3 hari, kamu perlu memilih opsi
                  penginapan yang kami sediakan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {masaPerjalanan == 3 && (
            <FormField
              control={form.control}
              name="penginapanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="penginapanId">
                    Opsi Penginapan
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingLodgingQuery}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Pilih Opsi Penginapan"
                          className="placeholder:text-slate-300 text-slate-300"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-2/3">
                      {allLodgings.map((penginapan, i) => (
                        <SelectItem value={penginapan.id} key={i}>
                          {`${penginapan.namaPenginapan} ${
                            penginapan.deskripsi !== ""
                              ? `| ${penginapan.deskripsi}`
                              : ""
                          } ${`| ${Rupiah.format(penginapan.biaya)}`}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-slate-300">
                    Jika kamu memilih waktu 3 hari, kamu perlu memilih opsi
                    penginapan yang kami sediakan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="tanggalPerjalanan"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Tanggal Perjalanan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pilih Tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        const minDate = new Date();
                        const maxDate = new Date();

                        minDate.setDate(today.getDate() + 3);
                        maxDate.setDate(today.getDate() + 30);
                        return date > maxDate || date < minDate;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-slate-300">
                  Pilih tanggal kamu akan melakukan perjalanan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white" htmlFor="qty">
                  Jumlah Tiket
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="2"
                    {...field}
                    type="number"
                    min={0}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </FormControl>
                <FormDescription className="text-slate-300">
                  Berapa orang yang ikut serta dalam perjalanan?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoadingExperienceQuery ? (
            <Skeleton className="w-full h-5" />
          ) : (
            <FormField
              control={form.control}
              name="experience"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base text-white">
                      Pilih Experience
                    </FormLabel>
                    <FormDescription className="text-slate-300">
                      {`Di destinasi "${namaDestinasi}" ada experience tambahan yang dapat kamu peroleh.`}
                    </FormDescription>
                  </div>
                  {allExperiences?.map((experience, i) => (
                    <FormField
                      key={experience.id}
                      control={form.control}
                      name="experience"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={experience.id}
                            className="flex flex-row items-start space-x-3 space-y-0 text-white"
                          >
                            <FormControl>
                              <Checkbox
                                className="border-white"
                                checked={
                                  Array.isArray(field.value) &&
                                  field.value.includes(experience.id)
                                }
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), experience.id]
                                    : (field.value || []).filter(
                                        (value: string) =>
                                          value !== experience.id
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {`${experience.namaExperience} ${
                                experience.deskripsi !== ""
                                  ? `| ${experience.deskripsi}`
                                  : ""
                              } ${`| ${Rupiah.format(experience.biaya)}`}`}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            Pesan
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OrderFormCTA;
