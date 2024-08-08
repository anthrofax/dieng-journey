"use client";

import React, { useEffect, useState } from "react";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useDestinationHook } from "@/hooks/destination-hooks";
import { Destination } from "@prisma/client";
import Card from "@/components/destination-card/card";
import Skeleton from "react-loading-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { DestinationFilterType } from "./type";
import { Pagination } from "@/components/ui/pagination";
import ImageSlider from "@/components/slider/slider";

const Destinations = () => {
  const { allDestinations, isLoading } = useDestinationHook();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lokasi = searchParams.get("lokasi");
  const destinasi = searchParams.get("destinasi");
  const minHarga = searchParams.get("minHarga");
  const maxHarga = searchParams.get("maxHarga");

  const form = useForm<DestinationFilterType>({
    defaultValues: {
      destinasi: destinasi || "",
      lokasi: lokasi || "",
      minHarga: Number(minHarga) || 0,
      maxHarga: Number(maxHarga) || 5000000,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log(form.formState.errors);

      (
        Object.keys(
          form.formState.errors
        ) as (keyof typeof form.formState.errors)[]
      ).forEach((key) => {
        toast.error(`${form.formState.errors[key]?.message as string}`);
      });
    }
  }, [form, form.formState.errors]);

  function filterDestinations(
    destinations: Destination[],
    filters: DestinationFilterType
  ) {
    return destinations?.filter((destination) => {
      // 1. Filter berdasarkan lokasi
      if (
        filters.lokasi &&
        filters.lokasi !== "" &&
        !destination.city
          .toLowerCase()
          .startsWith(filters.lokasi.toLowerCase())
      )
        return false;

      // 2. Filter berdasarkan nama
      if (
        filters.destinasi &&
        filters.destinasi !== "" &&
        !destination.destinationName
          .toLowerCase()
          .startsWith(filters.destinasi.toLowerCase())
      )
        return false;

      // 2. Filter berdasarkan harga
      if (
        destination.price < filters.minHarga ||
        destination.price > filters.maxHarga
      )
        return false;

      return true;
    });
  }

  async function onSubmit(data: DestinationFilterType) {
    const query = new URLSearchParams({
      destinasi: data.destinasi,
      lokasi: data.lokasi,
      minHarga: data.minHarga.toString(),
      maxHarga: data.maxHarga.toString(),
    }).toString();

    router.push(`?${query}`, { scroll: false });
    setCurrentPage(1);
  }

  const filteredDestinations = filterDestinations(
    allDestinations || [],
    form.getValues()
  );

  // Pagination Logic
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Image URLs for the slider
  const sliderImages = [
    "/img/brand_image_4.jpg",
    "/img/brand_image_5.jpg",
    "/img/brand_image_1.jpg",
  ];

  return (
    <div className="w-full">
      <ImageSlider images={sliderImages} />

      <div className="relative z-20 -mt-12 h-full w-full flex flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border w-full md:w-2/3 p-4 md:px-4 py-6 rounded-xl bg-blue-600 text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
          >
            <FormField
              control={form.control}
              name="lokasi"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Cari berdasarkan lokasi"
                      className="text-blue-800 p-2 rounded-xl outline-none w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-1">
              <h3 className="ml-1 text-[#efefef] font-semibold">Harga</h3>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <FormField
                  control={form.control}
                  name="minHarga"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Harga min"
                          className="text-blue-800 p-2 rounded-xl outline-none w-full"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxHarga"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Harga maks"
                          className="text-blue-800 p-2 rounded-xl outline-none w-full"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <h3 className="ml-1 text-[#efefef] font-semibold">Destinasi</h3>
              <FormField
                control={form.control}
                name="destinasi"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Cari berdasarkan nama"
                        className="text-blue-800 p-2 rounded-xl outline-none w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              // disabled={isLoading}
              label="Cari"
              type="submit"
              className="px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
            />
          </form>
        </Form>
        <div className="w-full flex flex-wrap justify-center items-center gap-14 flex-grow-1 py-20">
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="rounded-xl shadow-md "
                  height={500}
                  width={350}
                />
              ))
            : paginatedDestinations.map(
                (destination: Destination, idx: number) => (
                  <Card key={idx} destination={destination} />
                )
              )}
        </div>
        {filteredDestinations.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Destinations;
