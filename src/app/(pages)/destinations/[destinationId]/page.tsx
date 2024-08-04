"use client";

import { format } from "date-fns";
import React, { useEffect } from "react";
import Spinner from "@/components/spinner/spinner";
import { getSelectedDestination } from "@/services/destination-services";
import { Destination, Experience } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { Rupiah } from "@/utils/format-currency";
import ImageGallery from "@/components/image-gallery/image-gallery";
import {
  experience,
  fasilitas,
  lokasiPenjemputan,
  penginapan,
} from "@/data/data";
import { FaLocationDot } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Message, useForm, useWatch } from "react-hook-form";
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
import { schema } from "./schema";
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
import toast from "react-hot-toast";
import { redirectToCheckout } from "./service";

function DestinationDetails() {
  let { destinationId } = useParams();
  if (Array.isArray(destinationId)) destinationId = destinationId[0];

  const { data: dataDestinasi, isLoading } = useQuery<
    Destination & {
      experiences: Experience[];
    }
  >({
    queryKey: ["destinasi"],
    queryFn: () => getSelectedDestination({ id: destinationId }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const masaPerjalanan = useWatch({
    control: form.control,
    name: "masaPerjalanan",
    defaultValue: "1",
  });

  async function handlePayment(data: FieldValues) {
    if (!dataDestinasi) return toast.error("Data destinasi tidak ditemukan");

    if (Number(data.qty) > 2 && data.penginapan === "sikembang")
      return toast.error(
        "Penginapan di Sikembang Glamping hanya dapat menampung maksimum 2 orang"
      );

    toast.success("Data berhasil terkirim");
    console.log(data);
    let totalBiaya = 0;

    const biayaExperience = experience.reduce((acc, experienceItem) => {
      if (data.experience.includes(experienceItem.value))
        return acc + experienceItem.harga;

      return 0;
    }, 0);

    const biayaPenginapan =
      penginapan.find(
        (penginapanItem) => penginapanItem.value === data.penginapan
      )?.harga || 0;

    totalBiaya =
      dataDestinasi.price * Number(data.qty) +
      biayaExperience +
      biayaPenginapan * Number(data.masaPerjalanan);

    await redirectToCheckout({
      destinationId: dataDestinasi.destinationId,
      experience: data.experience,
      hargaDestinasi: dataDestinasi.price,
      lokasiPenjemputan: data.lokasiPenjemputan,
      masaPerjalanan: data.masaPerjalanan,
      nama: data.nama,
      namaDestinasi: dataDestinasi.destinationName,
      nomorHp: data.nomorHp,
      penginapan: data.penginapan,
      qty: data.qty,
      tanggalPerjalanan: data.tanggalPerjalanan,
      totalBiaya,
    });
  }

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT as string;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(form.formState.errors)?.length > 0) {
      console.log(form.formState.errors);
      Object.keys(form.formState.errors)?.map((key) => {
        toast.error(`${form.formState.errors[key]?.message as Message}`);
      });
    }
  }, [form.formState.errors]);

  if (!dataDestinasi) return null;

  return (
    <div className="grid grid-cols-12">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="col-span-12 py-20 px-3 grid gap-3">
          <ImageGallery photos={dataDestinasi.imageUrls} />

          <div className="mt-3 flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold">
                {dataDestinasi.destinationName}
              </h1>

              <div className="flex gap-2 items-center mt-1">
                <FaLocationDot />
                <span className="capitalize">{dataDestinasi.city}</span>
              </div>
            </div>

            <h3 className="font-semibold text-2xl">
              {Rupiah.format(dataDestinasi.price)}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {fasilitas.map((fasilitasItem, i) => (
              <Badge icon={fasilitasItem.icon} size={20} key={i}>
                {fasilitasItem.label}
              </Badge>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Deskripsi Destinasi</h3>
            <p>{dataDestinasi.description}</p>
          </div>

          <div className="shadow-3xl bg-primary mt-3 p-5 text-black rounded-lg overflow-scroll max-h-[500px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePayment)}
                className="space-y-4"
              >
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
                      <FormLabel
                        className="text-white"
                        htmlFor="lokasiPenjemputan"
                      >
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
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
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
                          Jika kamu memilih waktu 3 hari, kamu perlu memilih
                          opsi penginapan yang kami sediakan
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
                      <FormLabel className="text-white">
                        Tanggal Perjalanan
                      </FormLabel>
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
                  name="orderExperience"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base text-white">
                          Pilih Experience
                        </FormLabel>
                        <FormDescription className="text-slate-300">
                          {`Di destinasi "${dataDestinasi.destinationName}" ada experience tambahan yang dapat kamu peroleh.`}
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
                                        ? [
                                            ...(field.value || []),
                                            experience.value,
                                          ]
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
        </div>
      )}
    </div>
  );
}

export default DestinationDetails;
