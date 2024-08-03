"use client";

import React, { useState, useEffect, useRef } from "react";
import Spinner from "@/components/spinner/spinner";
import { getSelectedDestination } from "@/services/destination-services";
import { Destination } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Badge } from "flowbite-react";
import { Rupiah } from "@/utils/format-currency";
import ImageGallery from "@/components/image-gallery/image-gallery";
import { fasilitas } from "@/data/data";
import { FaLocationDot } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function DestinationDetails() {
  let { destinationId } = useParams();
  if (Array.isArray(destinationId)) destinationId = destinationId[0];

  const { data: dataDestinasi, isLoading } = useQuery<Destination>({
    queryKey: ["destinasi"],
    queryFn: () => getSelectedDestination({ id: destinationId }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

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

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationDetails;
