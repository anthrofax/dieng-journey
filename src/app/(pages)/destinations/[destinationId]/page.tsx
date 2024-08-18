"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
import OrderFormCTA, { lokasiPenjemputan } from "./components/order-form-cta";
import { schema } from "./schema";
import { OrderFormFieldType, RegularOrderContextType } from "./type";
import { MdEmojiTransportation } from "react-icons/md";
import { RiGuideLine, RiSteering2Line } from "react-icons/ri";
import { IoFastFood, IoTicketOutline } from "react-icons/io5";
import { GiPirateCoat } from "react-icons/gi";
import { redirectToCheckout } from "./service";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { GoInfo } from "react-icons/go";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

const RegularOrderContext = createContext<RegularOrderContextType>(
  {} as RegularOrderContextType
);

function DestinationDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStep, setOrderStep] = useState<"data-details" | "price-details">(
    "data-details"
  );
  const [totalBiaya, setTotalBiaya] = useState(0);
  const [biayaExperience, setBiayaExperience] = useState(0);
  const [biayaPenginapan, setBiayaPenginapan] = useState(0);
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

  const watchedOrderFields = useWatch({
    control: form.control,
    defaultValue: {
      experience: [],
      lokasiPenjemputan: "",
      masaPerjalanan: 1,
      nama: "",
      nomorHp: "",
      penginapanId: "",
      qty: 0,
      tanggalPerjalanan: defaultDate,
    },
  });

  async function handlePayment(data: OrderFormFieldType) {
    console.log(data);
    try {
      if (!dataDestinasi) return toast.error("Data destinasi tidak ditemukan");

      toast.success("Mohon tunggu sebentar...");

      await redirectToCheckout({
        destinationId: dataDestinasi.destinationId,
        experience: data.experience,
        hargaDestinasi: dataDestinasi.price,
        lokasiPenjemputan: data.lokasiPenjemputan,
        masaPerjalanan: watchedOrderFields.masaPerjalanan as number,
        nama: data.nama,
        namaDestinasi: dataDestinasi.destinationName,
        nomorHp: data.nomorHp,
        penginapanId: data.penginapanId,
        qty: data.qty,
        tanggalPerjalanan: data.tanggalPerjalanan,
        allExperiences,
        allLodgings,
        totalBiaya,
      });
    } catch (err) {
      toast.error("Pembayaran gagal");
    }
  }

  useEffect(
    function () {
      setTotalBiaya(
        (dataDestinasi?.price as number) * (watchedOrderFields.qty as number) +
          biayaExperience +
          biayaPenginapan
      );
    },
    [
      dataDestinasi?.price,
      watchedOrderFields.qty,
      biayaExperience,
      biayaPenginapan,
    ]
  );

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
    if (watchedOrderFields.masaPerjalanan == 1) {
      form.setValue("penginapanId", "");
    }
  }, [form, watchedOrderFields.masaPerjalanan]);

  if (!dataDestinasi) return null;

  return (
    <RegularOrderContext.Provider
      value={{
        allExperiences,
        allLodgings,
        form,
        handlePayment,
        isLoadingExperienceQuery,
        isLoadingLodgingQuery,
        masaPerjalanan: watchedOrderFields.masaPerjalanan || 1,
        namaDestinasi: dataDestinasi.destinationName,
        setIsModalOpen,
      }}
    >
      <div className="grid grid-cols-12 relative pt-28 pb-16">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="col-span-12 lg:col-span-8 px-3 grid gap-3 relative">
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

              <OrderFormCTA className="lg:hidden" />
            </div>
            <OrderFormCTA className="hidden lg:block lg:col-span-4 sticky top-28" />

            {isModalOpen && (
              <>
                <div className="bg-black/35 z-[52] fixed left-0 right-0 top-0 bottom-0" />
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-5 px-7 w-[80%] max-w-[500px] z-[53] rounded-xl">
                  <Button
                    variant="ghost"
                    className="absolute right-3 top-3 p-1 hover:bg-secondary/50 group"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBiayaExperience(0);
                      setBiayaPenginapan(0);
                      setOrderStep("data-details");
                    }}
                  >
                    <IoIosClose className="text-5xl group-hover:text-white" />
                  </Button>
                  {orderStep === "price-details" && (
                    <Button
                      variant="ghost"
                      className="absolute left-2 top-3 p-1 hover:bg-secondary/50 group"
                      onClick={() => {
                        setBiayaExperience(0);
                        setBiayaPenginapan(0);
                        setOrderStep("data-details");
                      }}
                    >
                      <IoIosArrowBack className="text-3xl group-hover:text-white" />
                    </Button>
                  )}
                  <div className="text-center mb-3 w-full">
                    <h3 className="font-semibold text-lg">
                      Rincian Data Pemesanan
                    </h3>
                    <p className="text-sm text-slate-500">
                      {orderStep === "data-details"
                        ? "Pastikan data yang telah kamu masukkan sudah sesuai."
                        : "Berikut rincian biaya yang perlu dibayar, pastikan sudah sesuai dengan kebutuhanmu"}
                    </p>
                  </div>

                  {orderStep === "data-details" ? (
                    <div className="space-y-2 text-sm md:text-base w-full h-fit max-h-[512px] overflow-y-auto">
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Nama</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">{`${watchedOrderFields.nama}`}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Nomor HP</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">{`${watchedOrderFields.nomorHp}`}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Lokasi Penjemputan</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">{`${
                          lokasiPenjemputan.find(
                            (lokasi) =>
                              lokasi.value ===
                              watchedOrderFields.lokasiPenjemputan
                          )?.label
                        }`}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Masa Perjalanan</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">
                          {`${watchedOrderFields.masaPerjalanan}`} Hari
                        </p>
                      </div>
                      {watchedOrderFields.masaPerjalanan === 3 && (
                        <div className="grid grid-cols-4 gap-x-2 items-start">
                          <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                            <label>Opsi Penginapan</label>
                            <span>:</span>
                          </div>
                          <p className="col-span-2">{`${
                            allLodgings.find(
                              (penginapan) =>
                                penginapan.id ===
                                watchedOrderFields.penginapanId
                            )?.namaPenginapan
                          }`}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Tanggal Perjalanan</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">{`${
                          watchedOrderFields?.tanggalPerjalanan
                            ? format(
                                watchedOrderFields.tanggalPerjalanan,
                                "d MMMM yyyy",
                                {
                                  locale: id,
                                }
                              )
                            : "Anda belum mengisi tanggal perjalanan"
                        }`}</p>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                          <label>Jumlah Pembelian Tiket</label>
                          <span>:</span>
                        </div>
                        <p className="col-span-2">
                          Untuk {`${watchedOrderFields.qty}`} Orang
                        </p>
                      </div>

                      {watchedOrderFields.experience &&
                        watchedOrderFields.experience.length > 0 && (
                          <div className="grid grid-cols-4 gap-x-2 items-start">
                            <div className="col-span-2 font-semibold text-right flex items-start justify-end gap-2">
                              <label>Experience</label>
                              <span>:</span>
                            </div>
                            <ul className="col-span-2 list-disc pl-5">
                              {watchedOrderFields.experience?.map(
                                (experienceId) => (
                                  <li key={experienceId}>
                                    {
                                      allExperiences.find(
                                        (experienceItem) =>
                                          experienceItem.id === experienceId
                                      )?.namaExperience
                                    }
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm md:text-base w-full h-fit max-h-[512px] overflow-y-auto">
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold flex items-start gap-2">
                          <label className="w-[98%] ml-5">
                            Harga Destinasi
                          </label>
                          <span>:</span>
                        </div>

                        <div className="flex flex-col gap-2 col-span-2">
                          <>
                            <p>{dataDestinasi.destinationName}</p>
                            <p className="font-medium">{`${
                              watchedOrderFields.qty
                            } x ${Rupiah.format(dataDestinasi.price)}`}</p>
                            <p className="font-semibold">{`Sub Total: ${Rupiah.format(
                              dataDestinasi.price *
                                (watchedOrderFields.qty as number)
                            )}`}</p>
                          </>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold flex items-start gap-2">
                          <label className="w-[98%] ml-5">
                            Biaya Penginapan
                          </label>
                          <span>:</span>
                        </div>

                        <div className="flex flex-col gap-2 col-span-2">
                          {watchedOrderFields.penginapanId !== "" ? (
                            <>
                              <p>
                                {
                                  allLodgings.find(
                                    (penginapan) =>
                                      penginapan.id ===
                                      watchedOrderFields.penginapanId
                                  )?.namaPenginapan
                                }
                              </p>
                              <p className="font-medium">{`${
                                watchedOrderFields.masaPerjalanan
                              } malam x ${Rupiah.format(
                                allLodgings.find(
                                  (penginapan) =>
                                    penginapan.id ===
                                    watchedOrderFields.penginapanId
                                )?.biaya as number
                              )}`}</p>
                              <p className="font-semibold">{`Sub Total: ${Rupiah.format(
                                (allLodgings.find(
                                  (penginapan) =>
                                    penginapan.id ===
                                    watchedOrderFields.penginapanId
                                )?.biaya as number) *
                                  (watchedOrderFields.masaPerjalanan as number)
                              )}`}</p>
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-x-2 items-start">
                        <div className="col-span-2 font-semibold flex items-start gap-2">
                          <label className="w-[98%] ml-5">
                            Experience yang dipilih
                          </label>
                          <span>:</span>
                        </div>
                        {watchedOrderFields.experience &&
                        watchedOrderFields.experience.length > 0 ? (
                          <div className="col-span-2">
                            <ul className="list-disc pl-5">
                              {watchedOrderFields.experience?.map(
                                (experienceId) => (
                                  <li key={experienceId}>
                                    <div className="flex flex-col gap-2">
                                      <p>
                                        {
                                          allExperiences.find(
                                            (experienceItem) =>
                                              experienceItem.id === experienceId
                                          )?.namaExperience
                                        }
                                      </p>
                                      <p className="font-medium">
                                        {Rupiah.format(
                                          allExperiences.find(
                                            (experienceItem) =>
                                              experienceItem.id === experienceId
                                          )?.biaya as number
                                        )}
                                      </p>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                            <p className="font-semibold">{`Sub Total: ${Rupiah.format(
                              biayaExperience
                            )}`}</p>
                          </div>
                        ) : (
                          <p className="col-span-2">-</p>
                        )}
                      </div>
                    </div>
                  )}

                  {orderStep === "data-details" ? (
                    <Button
                      className="w-full bg-black hover:bg-primary text-white mt-5"
                      onClick={() => {
                        if (
                          watchedOrderFields.experience &&
                          watchedOrderFields.experience.length > 0
                        ) {
                          watchedOrderFields.experience.forEach(
                            (idExperienceYgDipilih: string) => {
                              const experienceYgDipilih = allExperiences.find(
                                (experienceItem) =>
                                  experienceItem.id === idExperienceYgDipilih
                              );

                              if (experienceYgDipilih)
                                setBiayaExperience(
                                  (biayaExperience) =>
                                    biayaExperience + experienceYgDipilih.biaya
                                );
                            }
                          );
                        }

                        if (
                          watchedOrderFields.penginapanId &&
                          watchedOrderFields.penginapanId !== ""
                        ) {
                          setBiayaPenginapan(
                            (allLodgings.find(
                              (penginapan) =>
                                penginapan.id ===
                                watchedOrderFields.penginapanId
                            )?.biaya as number) *
                              (watchedOrderFields.masaPerjalanan as number)
                          );
                        }

                        setOrderStep("price-details");
                      }}
                    >
                      Lanjut
                    </Button>
                  ) : (
                    <div className="flex flex-col items-center gap-2 mt-7">
                      <p className="text-lg">
                        <span className="font-bold">Biaya Total: </span>{" "}
                        {Rupiah.format(totalBiaya)}
                      </p>
                      <Button
                        className="w-full bg-black hover:bg-primary text-white"
                        onClick={() =>
                          handlePayment(
                            watchedOrderFields as OrderFormFieldType
                          )
                        }
                      >
                        Bayar
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </RegularOrderContext.Provider>
  );
}

export function useRegularOrderContext() {
  const context = useContext(RegularOrderContext);

  if (!context)
    alert("Anda menggunakan Regular Order Context di luar jangkauan");

  return context;
}

export default DestinationDetails;
