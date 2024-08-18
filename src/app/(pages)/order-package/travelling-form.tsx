"use client";

import { z } from "zod";
import { Button, Button as ShadButton } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Rupiah } from "@/utils/format-currency";
import Skeleton from "react-loading-skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Destination } from "@prisma/client";
import Link from "next/link";
import { useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useOrderPackageContext } from "./page";

function TravellingForm() {
  const {
    travellingForm,
    names,
    handleTravellingFormNameInputChange,
    removeTravellingFormNameInputField,
    addNameField,
    isAddButtonDisabled,
    isLoadingDestinationQuery,
    allDestinations,
    lokasiPenjemputan,
    allLodgings,
    allExperiences,
    isLoadingExperienceQuery,
    isLoadingLodgingQuery,
    travellingFormRef,
  } = useOrderPackageContext();

  // useEffect(() => {
  //   if (Object.keys(travellingForm.formState.errors).length > 0) {
  //     console.log(travellingForm.formState.errors);

  //     (
  //       Object.keys(
  //         travellingForm.formState.errors
  //       ) as (keyof typeof travellingForm.formState.errors)[]
  //     ).forEach((key) => {
  //       toast.error(
  //         `${travellingForm.formState.errors[key]?.message as string}`
  //       );
  //     });
  //   }
  // }, [travellingForm, travellingForm.formState.errors]);

  return (
    <Form {...travellingForm}>
      <form
        ref={travellingFormRef}
        className="flex flex-col gap-5 col-span-4 xl:col-span-3 shadow p-5"
      >
        <FormField
          control={travellingForm.control}
          name="nama"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Nama</FormLabel>

              <div className="space-y-2">
                {names.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder={`Nama anggota ke-${index + 1}`}
                        value={name}
                        onChange={(e) =>
                          handleTravellingFormNameInputChange({
                            index,
                            value: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                    {names.length > 1 && (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                          removeTravellingFormNameInputField({
                            index,
                          })
                        }
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addNameField}
                  className="bg-primary text-white w-full space-x-2 text-xs mt-3"
                  type="button"
                  disabled={isAddButtonDisabled}
                >
                  <p>Tambah Nama Lain</p>
                  <FaPlus />
                </Button>
                <FormDescription>
                  Inputkan nama-nama orang yang akan ikut dalam perjalanan anda.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="nomorHp"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel htmlFor="name">Nomor HP</FormLabel>

              <div className="space-y-2">
                <FormControl>
                  <Input placeholder="0857....." {...field} />
                </FormControl>
                <FormDescription>
                  Isi nomor telepon perwakilan dari kelompok anda, kami akan
                  menghubungi nomor ini, jika diperlukan konfirmasi, kendala, &
                  informasi penting lainnya.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="destinasi"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Pilih Destinasi</FormLabel>

              <div className="h-fit max-h-56 overflow-y-scroll">
                {isLoadingDestinationQuery ? (
                  <div className="w-full h-full flex flex-col gap-1">
                    {Array.from({ length: 3 }).map(
                      (_, idx) => (
                        <Skeleton key={idx} className="w-full h-8 shadow-md" />
                      )
                    )}
                  </div>
                ) : (
                  allDestinations?.map(
                    (destination: Destination, i: number) => (
                      <FormField
                        key={destination.destinationId}
                        control={travellingForm.control}
                        name="destinasi"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={destination.destinationId}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={
                                    Array.isArray(field.value) &&
                                    field.value.includes(
                                      destination.destinationId
                                    )
                                  }
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [
                                          ...(field.value || []),
                                          destination.destinationId,
                                        ]
                                      : (field.value || []).filter(
                                          (value: string) =>
                                            value !== destination.destinationId
                                        );
                                    field.onChange(newValue);
                                  }}
                                />
                              </FormControl>
                              <div className="flex justify-between flex-grow">
                                <FormLabel className="">
                                  {destination.destinationName}
                                </FormLabel>

                                <Link
                                  className="text-primary underline text-sm"
                                  href={`/destinations/${destination.destinationId}`}
                                >
                                  Detail
                                </Link>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    )
                  )
                )}
              </div>
              <FormDescription>
                Dengan paket healing, destinasi yang dapat kamu pilih adalah
                sebanyak 3.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="lokasiPenjemputan"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel htmlFor="lokasiPenjemputan">
                Lokasi Penjemputan
              </FormLabel>

              <div className="space-y-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-9">
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
                <FormDescription className="col-start-4 col-end-13">
                  Pilih lokasi penjemputan anda diantara{" "}
                  {lokasiPenjemputan.length} lokasi tersebut
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="tanggalPerjalanan"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Tanggal Perjalanan</FormLabel>
              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <ShadButton
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pilih Tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </ShadButton>
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
                <FormDescription className="col-start-2 col-end-5">
                  Pilih tanggal kamu akan melakukan perjalanan
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="penginapanId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel htmlFor="penginapanId">Opsi Penginapan</FormLabel>

              <div className="space-y-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingLodgingQuery}
                >
                  <FormControl className="col-span-3">
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Pilih Opsi Penginapan"
                        className="placeholder:text-slate-300 text-slate-300"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[300px] overflow-x-auto">
                    {allLodgings &&
                      allLodgings.length > 0 &&
                      allLodgings.map((penginapan, i) => (
                        <SelectItem value={penginapan.id} key={i}>
                          {`${penginapan.namaPenginapan} ${
                            penginapan.deskripsi !== ""
                              ? `| ${penginapan.deskripsi}`
                              : ""
                          } ${`| ${Rupiah.format(penginapan.biaya)}/malam`}`}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription className="col-start-2 col-end-5">
                  Silahkan pilih penginapan, sesuai dengan kebutuhanmu.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={travellingForm.control}
          name="experience"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Pilih Experience</FormLabel>

              {isLoadingExperienceQuery ? (
                <>
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                </>
              ) : (
                allExperiences?.map((experience, i) => (
                  <FormField
                    key={experience.id}
                    control={travellingForm.control}
                    name="experience"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={experience.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                Array.isArray(field.value) &&
                                field.value.includes(experience.id)
                              }
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...(field.value || []), experience.id]
                                  : (field.value || []).filter(
                                      (value: string) => value !== experience.id
                                    );
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <div className="flex flex-col">
                            <FormLabel className="">
                              {experience.namaExperience}
                            </FormLabel>
                            <FormDescription>
                              {experience.deskripsi}
                            </FormDescription>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))
              )}
              <FormDescription>
                Dengan memilih paket ini, kamu dapat memilih experince tambahan
                yang dapat menjadi pengalaman unik dalam perjalanan mu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default TravellingForm;
