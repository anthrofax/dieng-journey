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
// import { experience, fasilitas, penginapan } from "@/data/data";
import { FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useExperienceHooks } from "@/hooks/experience-hook";
import { useLodgingHooks } from "@/hooks/lodging-hooks";
import OrderFormCTA from "./components/order-form-cta";
import { schema } from "./schema";
import { OrderFormFieldType } from "./type";
import { MdEmojiTransportation } from "react-icons/md";
import { RiGuideLine, RiSteering2Line } from "react-icons/ri";
import { IoFastFood, IoTicketOutline } from "react-icons/io5";
import { GiPirateCoat } from "react-icons/gi";
import { redirectToCheckout } from "./service";

export const fasilitas = [
  {
    icon: MdEmojiTransportation,
    label: "Transportasi",
  },
  {
    icon: RiSteering2Line,
    label: "Driver",
  },
  {
    icon: FaSquareParking,
    label: "Parkir",
  },
  {
    icon: IoTicketOutline,
    label: "Ticketing",
  },
  {
    icon: RiGuideLine,
    label: "Tour Guide",
  },
  {
    icon: IoFastFood,
    label: "Welcome Snack",
  },
  {
    icon: GiPirateCoat,
    label: "Jas Hujan 1x Pakai",
  },
];

function DestinationDetails() {
  let { destinationId } = useParams();
  if (Array.isArray(destinationId)) destinationId = destinationId[0];

  // Fetch Data Destinasi
  const { data: dataDestinasi, isLoading } = useQuery<
    Destination & {
      experiences: Experience[];
    }
  >({
    queryKey: ["destinasi"],
    queryFn: () => getSelectedDestination({ id: destinationId }),
  });

  // Fetch Data Experience
  const { allExperiences, isLoadingQuery: isLoadingExperienceQuery } =
    useExperienceHooks();

  // Fetch Data Penginapan
  const { allLodgings, isLoadingQuery: isLoadingLodgingQuery } =
    useLodgingHooks();

    // Default Input Value
  const today = new Date();
  const defaultDate = new Date();
  defaultDate.setDate(today.getDate() + 3);

  const form = useForm<OrderFormFieldType>({
    defaultValues: {
      experience: [],
      lokasiPenjemputan: "",
      masaPerjalanan: 1,
      nama: "",
      nomorHp: "",
      penginapanId: "",
      qty: 0,
      tanggalPerjalanan: defaultDate,
    },
    resolver: zodResolver(schema),
  });

  const masaPerjalanan = useWatch({
    control: form.control,
    name: "masaPerjalanan",
    defaultValue: 1,
  });

  async function handlePayment(data: FieldValues & OrderFormFieldType) {
    try {
      if (!dataDestinasi) return toast.error("Data destinasi tidak ditemukan");

      if (Number(data.qty) > 2 && data.penginapan === "sikembang")
        return toast.error(
          "Penginapan di Sikembang Glamping hanya dapat menampung maksimum 2 orang"
        );

      toast.success("Data berhasil terkirim");
      console.log(data);
      let totalBiaya = 0;

      const biayaExperience = allExperiences.reduce((acc, experienceItem) => {
        data.experience.forEach((selectedExperienceId) => {
          if (selectedExperienceId === experienceItem.id)
            return acc + experienceItem.biaya;
        });

        return 0;
      }, 0);

      const biayaPenginapan =
        allLodgings.find((penginapan) => penginapan.id === data.penginapanId)
          ?.biaya || 0;

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
        penginapanId: data.penginapanId,
        qty: data.qty,
        tanggalPerjalanan: data.tanggalPerjalanan,
        totalBiaya,
      });
    } catch (err) {
      toast.error("Pembayaran gagal");
    }
  }

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
  }, [form.formState.errors, form]);

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
    if (masaPerjalanan == 1) {
      form.setValue("penginapanId", "");
    }
  }, [masaPerjalanan, form]);

  if (!dataDestinasi) return null;

  return (
    <div className="grid grid-cols-12 relative py-20">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="col-span-12 lg:col-span-8 px-3 grid gap-3 ">
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

                <h3 className="font-semibold text-2xl hidden lg:block mt-6">
                  {Rupiah.format(dataDestinasi.price)}
                </h3>
              </div>

              <h3 className="font-semibold text-2xl lg:hidden">
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
              <h3 className="text-xl font-semibold mb-2">
                Deskripsi Destinasi
              </h3>
              <p>{dataDestinasi.description}</p>
            </div>

            <OrderFormCTA
              form={form}
              handlePayment={handlePayment}
              masaPerjalanan={masaPerjalanan}
              namaDestinasi={dataDestinasi.destinationName}
              allExperiences={allExperiences}
              allLodgings={allLodgings}
              isLoadingExperienceQuery={isLoadingExperienceQuery}
              isLoadingLodgingQuery={isLoadingLodgingQuery}
              className="lg:hidden"
            />
          </div>
          <OrderFormCTA
            form={form}
            handlePayment={handlePayment}
            masaPerjalanan={masaPerjalanan}
            namaDestinasi={dataDestinasi.destinationName}
            allExperiences={allExperiences}
            allLodgings={allLodgings}
            isLoadingExperienceQuery={isLoadingExperienceQuery}
            isLoadingLodgingQuery={isLoadingLodgingQuery}
            className="hidden lg:block lg:col-span-4 sticky top-20"
          />
        </>
      )}
    </div>
  );
}

export default DestinationDetails;
