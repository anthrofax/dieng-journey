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
import { experience, lokasiPenjemputan, penginapan } from "@/data/data";
import { FieldValues } from "react-hook-form";
import { format } from "date-fns";

type Props = {
  form: any;
  handlePayment: (data: FieldValues) => Promise<string | undefined>;
  masaPerjalanan: string;
  namaDestinasi: string;
  className?: string
};

function OrderFormCTA({
  form,
  handlePayment,
  masaPerjalanan,
  className = "",
  namaDestinasi,
}: Props) {
  return (
    <div className={`shadow-3xl bg-primary mt-3 p-5 text-black rounded-lg overflow-scroll max-h-[500px] ${className}`}>
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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Tentukan masa perjalanan anda"
                        defaultValue="1"
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

          {masaPerjalanan == "3" && (
            <FormField
              control={form.control}
              name="penginapan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white" htmlFor="penginapan">
                    Opsi Penginapan
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                      {penginapan.map((itemPenginapan, i) => (
                        <SelectItem value={itemPenginapan.value} key={i}>
                          {itemPenginapan.nama}
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
                        const maxDate = new Date();
                        maxDate.setDate(today.getDate() + 30);
                        return date > maxDate || date < new Date();
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
                {experience.map((experience, i) => (
                  <FormField
                    key={experience.value}
                    control={form.control}
                    name="experience"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={experience.value}
                          className="flex flex-row items-start space-x-3 space-y-0 text-white"
                        >
                          <FormControl>
                            <Checkbox
                              className="border-white"
                              checked={
                                Array.isArray(field.value) &&
                                field.value.includes(experience.value)
                              }
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), experience.value]
                                  : (field.value || []).filter(
                                      (value: string) =>
                                        value !== experience.value
                                    );
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {experience.label}
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

          <Button type="submit" className="w-full">
            Pesan
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OrderFormCTA;
