"use client";
import React, { useEffect } from "react";
import { optionLocations, optionTypes } from "@/data/data";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Card from "@/components/best-hotels/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Message, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredListings } from "./service";
import Image, { StaticImageData } from "next/image";
import { toast } from "react-hot-toast";
import Spinner from "@/components/spinner/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Catalog = () => {
  const searchParams = useSearchParams();

  const city = searchParams.get("city");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const type = searchParams.get("type");
  const router = useRouter();

  const selectedLocationOption = optionLocations.find(
    (location) => location.value === city
  );

  const defaultValues = {
    location: selectedLocationOption?.value,
    min_price,
    max_price,
    type,
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { data: listings, isLoading } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ["listings"],
  });

  useEffect(() => {
    if (errors) {
      (Object.keys(errors) as Array<keyof typeof errors>).map((key) => {
        toast.error(errors[key]?.message as Message);
      });
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    await getFilteredListings(data);

    queryClient.invalidateQueries({ queryKey: ["listings"] });

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`;

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="min-h-screen w-full">
      <div className="relative h-3/5 w-full">
        <Image
          alt="Catalog Image"
          src={selectedLocationOption?.image as StaticImageData}
          className="brightness-50 h-screen w-full object-cover"
        />
        <h3 className="absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white">
          {selectedLocationOption?.city}
        </h3>
      </div>
      <div className="relative z-20 -mt-12 h-full w-full flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center"
        >
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">City</h3>
            <Select>
              <SelectTrigger
                className="text-blue-800 p-2 rounded-xl outline-none w-[180px]"
                {...register("location")}
              >
                <SelectValue placeholder="Pilih Kota" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lokasi</SelectLabel>
                  {optionLocations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">Price</h3>
            <div className="flex items-center gap-2">
              <Input
                register={register("min_price", { valueAsNumber: true })}
                type="number"
                placeholder="Min. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
              <Input
                register={register("max_price", { valueAsNumber: true })}
                type="number"
                placeholder="Max. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">Type of hotel</h3>
            <Select>
              <SelectTrigger
                className="text-blue-800 p-2 rounded-xl outline-none w-[180px]"
                {...register("type")}
              >
                <SelectValue placeholder="Pilih tipe hotel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {optionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            disabled={isLoading}
            label="Search"
            className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
          />
        </form>
        <div className="w-full py-20 flex flex-wrap justify-center items-center gap-14">
          {!isLoading ? (
            listings && listings.length > 0 ? (
              listings.map((place: any, idx: number) => (
                <Card key={idx} place={place} />
              ))
            ) : (
              <h2 className="text-center font-bold text-4xl text-slate-700">
                No listing with those filters
              </h2>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
