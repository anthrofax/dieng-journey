"use client";

import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLodgingHooks } from "@/hooks/lodging-hooks";
import { useExperienceHooks } from "@/hooks/experience-hook";
import { useDestinationHook } from "@/hooks/destination-hooks";
import { Destination, Experience, Penginapan } from "@prisma/client";
import TravellingForm from "./travelling-form";
import HealingForm from "./healing-form";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { HealingFormFieldType, TravellingFormFieldType } from "./type";
import id from "date-fns/locale/id";
import { healingSchema, travellingSchema } from "./schema";
import { Button } from "flowbite-react";
import { format } from "date-fns";
import { getSelectedLodging } from "@/services/lodging-services";
import { confirmAlert } from "react-confirm-alert";
import ConfirmationBox from "@/components/confirmation-box/confirmation-box";
import { GoInfo } from "react-icons/go";
import toast from "react-hot-toast";
import { redirectToCheckout } from "./service";
import { Rupiah } from "@/utils/format-currency";

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

type PackageOrderContextType = {
  allLodgings: Penginapan[];
  allExperiences: Experience[];
  allDestinations: Destination[];
  isLoadingDestinationQuery: boolean;
  isLoadingExperienceQuery: boolean;
  isLoadingLodgingQuery: boolean;
  names: string[];
  setNames: Dispatch<SetStateAction<string[]>>;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  healingForm: UseFormReturn<HealingFormFieldType, any, undefined>;
  travellingForm: UseFormReturn<TravellingFormFieldType, any, undefined>;
  isAddButtonDisabled: boolean;
  handleHealingFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleTravellingFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  lokasiPenjemputan: {
    label: string;
    value: string;
  }[];
  addNameField: () => void;
  handleHealingFormNameInputChange: ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => void;
  handleTravellingFormNameInputChange: ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => void;
  removeHealingFormNameInputField: ({ index }: { index: number }) => void;
  removeTravellingFormNameInputField: ({ index }: { index: number }) => void;
  healingFormRef: RefObject<HTMLFormElement>;
  travellingFormRef: RefObject<HTMLFormElement>;
};

const today = new Date();
const defaultDate = new Date();
defaultDate.setDate(today.getDate() + 3);

const PackageOrderContext = createContext<PackageOrderContextType>({
  allLodgings: [],
  allExperiences: [],
  allDestinations: [],
  isLoadingDestinationQuery: false,
  isLoadingExperienceQuery: false,
  isLoadingLodgingQuery: false,
  names: [],
  setNames: () => {},
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  healingForm: {} as UseFormReturn<HealingFormFieldType, any, undefined>,
  travellingForm: {} as UseFormReturn<TravellingFormFieldType, any, undefined>,
  isAddButtonDisabled: false,
  handleHealingFormSubmit: async () => {},
  handleTravellingFormSubmit: async () => {},
  lokasiPenjemputan,
  addNameField: () => {},
  handleHealingFormNameInputChange: () => {},
  removeHealingFormNameInputField: () => {},
  handleTravellingFormNameInputChange: () => {},
  removeTravellingFormNameInputField: () => {},
  healingFormRef: {} as RefObject<HTMLFormElement>,
  travellingFormRef: {} as RefObject<HTMLFormElement>,
});

function OrderPackage() {
  const [names, setNames] = useState<string[]>([""]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { allLodgings, isLoadingQuery: isLoadingLodgingQuery } =
    useLodgingHooks();
  const { allExperiences, isLoadingQuery: isLoadingExperienceQuery } =
    useExperienceHooks();
  const { allDestinations, isLoading: isLoadingDestinationQuery } =
    useDestinationHook();
  const selectedPackage =
    useSearchParams().get("selected-package") || "healing";

  const healingFormRef = useRef<HTMLFormElement>(null);
  const travellingFormRef = useRef<HTMLFormElement>(null);

  const healingForm = useForm<HealingFormFieldType>({
    resolver: zodResolver(healingSchema),
  });

  const watchedHealingFields = useWatch({
    control: healingForm.control,
  });

  const travellingForm = useForm<TravellingFormFieldType>({
    resolver: zodResolver(travellingSchema),
  });

  const watchedTravellingFields = useWatch({
    control: travellingForm.control,
  });

  useEffect(
    function () {
      console.log(watchedTravellingFields);
    },
    [watchedTravellingFields]
  );

  const addNameField = () => {
    setNames([...names, ""]);
  };

  const handleHealingFormNameInputChange = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    const updatedNames = names.map((name, i) => (i === index ? value : name));
    setNames(updatedNames);
    healingForm.setValue(
      "nama",
      updatedNames.filter((name) => name.trim() !== "")
    );
  };

  const handleTravellingFormNameInputChange = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    const updatedNames = names.map((name, i) => (i === index ? value : name));
    setNames(updatedNames);
    travellingForm.setValue(
      "nama",
      updatedNames.filter((name) => name.trim() !== "")
    );
  };

  const removeHealingFormNameInputField = ({ index }: { index: number }) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
    healingForm.setValue(
      "nama",
      updatedNames.filter((name) => name.trim() !== "")
    );
  };
  const removeTravellingFormNameInputField = ({ index }: { index: number }) => {
    const updatedNames = names.filter((_, i) => i !== index);
    setNames(updatedNames);
    travellingForm.setValue(
      "nama",
      updatedNames.filter((name) => name.trim() !== "")
    );
  };

  const isAddButtonDisabled = names[names.length - 1].length < 3;

  const handleHealingFormSubmit = healingForm.handleSubmit(
    async (data) => {
      toast.loading("Mohon tunggu sebentar...", { duration: 1000 });

      await redirectToCheckout({
        daftarDestinasi: data.destinasi,
        lokasiPenjemputan: data.lokasiPenjemputan,
        masaPerjalanan: 1,
        nama: data.nama,
        nomorHp: data.nomorHp,
        tanggalPerjalanan: data.tanggalPerjalanan,
        experience: [],
        totalBiaya: 499000,
        selectedPackage
      });
    },
    (errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Data yang anda masukkan masih ada yang tidak sesuai");
      }
    }
  );

  const handleTravellingFormSubmit = travellingForm.handleSubmit(
    async (data) => {
      toast.loading("Mohon tunggu sebentar...", { duration: 1000 });

      await redirectToCheckout({
        daftarDestinasi: data.destinasi,
        lokasiPenjemputan: data.lokasiPenjemputan,
        masaPerjalanan: 1,
        nama: data.nama,
        nomorHp: data.nomorHp,
        tanggalPerjalanan: data.tanggalPerjalanan,
        experience: data.experience,
        penginapanId: data.penginapanId,
        totalBiaya: 1200000,
        selectedPackage
      });
    },
    (errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Data yang anda masukkan masih ada yang tidak sesuai");
      }
    }
  );

  function handlePayment() {
    if (selectedPackage === "travelling") handleTravellingFormSubmit();
    else handleHealingFormSubmit();
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

  return (
    <PackageOrderContext.Provider
      value={{
        allLodgings,
        allExperiences,
        allDestinations,
        isLoadingDestinationQuery,
        isLoadingExperienceQuery,
        isLoadingLodgingQuery,
        names,
        setNames,
        isDialogOpen,
        setIsDialogOpen,
        healingForm,
        travellingForm,
        isAddButtonDisabled,
        handleHealingFormSubmit,
        handleTravellingFormSubmit,
        lokasiPenjemputan,
        addNameField,
        handleHealingFormNameInputChange,
        handleTravellingFormNameInputChange,
        removeHealingFormNameInputField,
        removeTravellingFormNameInputField,
        healingFormRef,
        travellingFormRef,
      }}
    >
      <div className="pt-28 pb-16 px-3 relative">
        <div className="py-2 w-full text-center">
          <h1 className="text-xl lg:text-3xl font-semibold">
            Pemesanan Paket{" "}
            {selectedPackage === "healing" ? "Healing" : "Travelling"}
          </h1>
          <p className="text-sm lg:text-lg mt-1">
            Lengkapi data perjalananmu disini, sebelum melakukan pemesanan
          </p>

          
        </div>

        <div className="grid grid-cols-4 gap-3">
          {selectedPackage === "healing" && <HealingForm />}

          {selectedPackage === "travelling" && <TravellingForm />}

          {selectedPackage !== "healing" &&
            selectedPackage !== "travelling" && <p>Paket tidak tersedia</p>}

          <div className="shadow col-span-1  hidden xl:block h-[46rem] p-3 sticky top-20 overflow-y-scroll">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold">Rincian Pemesanan</h3>
              <p>
                Berikut rincian pesananmu, pastikan data yang anda masukkan
                sudah benar.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <div className="flex flex-col">
                <label className="font-semibold">Nama Anggota: </label>
                <ul className="list-disc">
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.nama?.map((namaItem, i) => (
                        <li className="ml-3" key={i}>
                          {namaItem}
                        </li>
                      ))
                    : watchedHealingFields?.nama?.map((namaItem, i) => (
                        <li className="ml-3" key={i}>
                          {namaItem}
                        </li>
                      ))) || (
                    <li className="list-none text-slate-500">
                      Daftar nama anggota kelompok perjalanan anda akan
                      ditampilkan disini
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Nomor HP: </label>
                <p
                  className={`${
                    watchedTravellingFields.nomorHp ||
                    watchedHealingFields.nomorHp
                      ? ""
                      : "text-slate-500"
                  }`}
                >
                  {" "}
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.nomorHp
                    : watchedHealingFields?.nomorHp) ||
                    "Data Nomor HP yang anda masukkan akan ditampilkan disini"}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Destinasi: </label>
                <ul className="list-disc">
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.destinasi?.map(
                        (idDestinasi, i) => (
                          <li className="ml-3" key={i}>
                            {
                              allDestinations.find(
                                (destinasiItem) =>
                                  destinasiItem.destinationId === idDestinasi
                              )?.destinationName
                            }
                          </li>
                        )
                      )
                    : watchedHealingFields?.destinasi?.map((idDestinasi, i) => (
                        <li className="ml-3" key={i}>
                          {
                            allDestinations.find(
                              (destinasiItem) =>
                                destinasiItem.destinationId === idDestinasi
                            )?.destinationName
                          }
                        </li>
                      ))) || (
                    <li className="list-none text-slate-500">
                      Rincian destinasi yang anda pilih akan ditampilkan disini
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Lokasi Penjemputan: </label>
                <p
                  className={`${
                    watchedTravellingFields.lokasiPenjemputan ||
                    watchedHealingFields.lokasiPenjemputan
                      ? ""
                      : "text-slate-500"
                  }`}
                >
                  {lokasiPenjemputan.find(
                    (lokasi) =>
                      lokasi.value ===
                      (selectedPackage === "travelling"
                        ? watchedTravellingFields?.lokasiPenjemputan
                        : watchedHealingFields?.lokasiPenjemputan)
                  )?.label ||
                    "Lokasi penjemputan yang ada pilih akan ditampilkan disini"}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold ">Tanggal Perjalanan: </label>
                <p
                  className={`${
                    watchedTravellingFields.tanggalPerjalanan ||
                    watchedHealingFields.tanggalPerjalanan
                      ? ""
                      : "text-slate-500"
                  }`}
                >
                  {selectedPackage === "travelling"
                    ? watchedTravellingFields?.tanggalPerjalanan
                      ? format(
                          watchedTravellingFields.tanggalPerjalanan,
                          "d MMMM yyyy",
                          {
                            locale: id,
                          }
                        )
                      : "Data mengenai tanggal perjalanan anda akan ditampilkan disini"
                    : watchedHealingFields?.tanggalPerjalanan
                    ? format(
                        watchedHealingFields.tanggalPerjalanan,
                        "d MMMM yyyy",
                        {
                          locale: id,
                        }
                      )
                    : "Data mengenai tanggal perjalanan anda akan ditampilkan disini"}
                </p>
              </div>

              {selectedPackage === "travelling" && (
                <div className="flex flex-col">
                  <label className="font-semibold ">Opsi Penginapan: </label>
                  <p
                    className={`${
                      watchedTravellingFields.penginapanId
                        ? ""
                        : "text-slate-500"
                    }`}
                  >
                    {watchedTravellingFields?.penginapanId
                      ? allLodgings.find(
                          (penginapan) =>
                            penginapan.id ===
                            watchedTravellingFields.penginapanId
                        )?.namaPenginapan
                      : "Penginapan yang anda pilih akan ditampilkan disini."}
                  </p>
                </div>
              )}

              {selectedPackage === "travelling" && (
                <div className="flex flex-col">
                  <label className="font-semibold">Experience: </label>
                  <ul className="list-disc">
                    {watchedTravellingFields?.experience?.map(
                      (experienceId, i) => (
                        <li className="ml-3" key={i}>
                          {
                            allExperiences.find(
                              (experineceItem) =>
                                experineceItem.id === experienceId
                            )?.namaExperience
                          }
                        </li>
                      )
                    ) || (
                      <li className="list-none text-slate-500">
                        Rincian experience yang anda pilih akan ditampilkan
                        disini
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex flex-col">
                <label className="font-semibold">Masa Perjalanan: </label>
                <p>{`${selectedPackage === "travelling" ? 3 : 1} Hari`}</p>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Biaya: </label>
                <p>
                  {`${Rupiah.format(
                    selectedPackage === "travelling" ? 1200000 : 499000
                  )} / Orang`}
                </p>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Biaya Total: </label>
                <p>
                  {`${Rupiah.format(
                    selectedPackage === "travelling"
                      ? (watchedTravellingFields.nama?.length || 0) * 1200000
                      : (watchedHealingFields.nama?.length || 0) * 499000
                  )} `}
                </p>
              </div>

              <Button
                className="bg-primary hover:bg-primary/80"
                onClick={() => {
                  confirmAlert({
                    customUI: ({ onClose }: { onClose: () => void }) => {
                      return (
                        <ConfirmationBox
                          icon={<GoInfo />}
                          judul="Konfirmasi Data"
                          pesan="Apakah anda yakin data yang anda masukkan sudah benar?"
                          onClose={onClose}
                          onClickIya={handlePayment}
                          labelIya="Yakin"
                          labelTidak="Sebentar, saya cek lagi"
                        />
                      );
                    },
                  });
                }}
              >
                Pesan
              </Button>
            </div>
          </div>
          <div className="shadow xl:hidden h-fit p-3 col-span-4 sm:col-span-2 sm:col-start-2">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-semibold">Rincian Pemesanan</h3>
              <p>
                Berikut rincian pesananmu, pastikan data yang anda masukkan
                sudah benar.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Nama Anggota:{" "}
                </label>
                <ul className="col-span-2 list-disc">
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.nama?.map((namaItem, i) => (
                        <li key={i} className="ml-3">
                          {namaItem}
                        </li>
                      ))
                    : watchedHealingFields?.nama?.map((namaItem, i) => (
                        <li key={i} className="ml-3">
                          {namaItem}
                        </li>
                      ))) || (
                    <li className="list-none text-slate-500">
                      Daftar nama anggota kelompok perjalanan anda akan
                      ditampilkan disini
                    </li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Nomor HP:{" "}
                </label>
                <p
                  className={`${
                    watchedTravellingFields.nomorHp ||
                    watchedHealingFields.nomorHp
                      ? ""
                      : "text-slate-500"
                  } col-span-2`}
                >
                  {" "}
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.nomorHp
                    : watchedHealingFields?.nomorHp) ||
                    "Data Nomor HP yang anda masukkan akan ditampilkan disini"}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Destinasi:{" "}
                </label>
                <ul className="col-span-2 list-disc">
                  {(selectedPackage === "travelling"
                    ? watchedTravellingFields?.destinasi?.map(
                        (idDestinasi, i) => (
                          <li key={i} className="ml-3">
                            {
                              allDestinations.find(
                                (destinasiItem) =>
                                  destinasiItem.destinationId === idDestinasi
                              )?.destinationName
                            }
                          </li>
                        )
                      )
                    : watchedHealingFields?.destinasi?.map((idDestinasi, i) => (
                        <li key={i} className="ml-3">
                          {
                            allDestinations.find(
                              (destinasiItem) =>
                                destinasiItem.destinationId === idDestinasi
                            )?.destinationName
                          }
                        </li>
                      ))) || (
                    <li className="list-none text-slate-500">
                      Rincian destinasi yang anda pilih akan ditampilkan disini
                    </li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Lokasi Penjemputan:{" "}
                </label>
                <p
                  className={`${
                    watchedTravellingFields.lokasiPenjemputan ||
                    watchedHealingFields.lokasiPenjemputan
                      ? ""
                      : "text-slate-500"
                  } col-span-2`}
                >
                  {lokasiPenjemputan.find(
                    (lokasi) =>
                      lokasi.value ===
                      (selectedPackage === "travelling"
                        ? watchedTravellingFields?.lokasiPenjemputan
                        : watchedHealingFields?.lokasiPenjemputan)
                  )?.label ||
                    "Lokasi penjemputan yang ada pilih akan ditampilkan disini"}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Tanggal Perjalanan:{" "}
                </label>
                <p
                  className={`${
                    watchedTravellingFields.tanggalPerjalanan ||
                    watchedHealingFields.tanggalPerjalanan
                      ? ""
                      : "text-slate-500"
                  } col-span-2`}
                >
                  {selectedPackage === "travelling"
                    ? watchedTravellingFields?.tanggalPerjalanan
                      ? format(
                          watchedTravellingFields.tanggalPerjalanan,
                          "d MMMM yyyy",
                          {
                            locale: id,
                          }
                        )
                      : "Data mengenai tanggal perjalanan anda akan ditampilkan disini"
                    : watchedHealingFields?.tanggalPerjalanan
                    ? format(
                        watchedHealingFields.tanggalPerjalanan,
                        "d MMMM yyyy",
                        {
                          locale: id,
                        }
                      )
                    : "Data mengenai tanggal perjalanan anda akan ditampilkan disini"}
                </p>
              </div>

              {selectedPackage === "travelling" && (
                <div className="flex flex-col gap-3 mt-3">
                  <div className="grid grid-cols-4 gap-4">
                    <label className="font-semibold col-span-2 text-right">
                      Opsi Penginapan:{" "}
                    </label>
                    <p
                      className={`${
                        watchedTravellingFields.penginapanId
                          ? ""
                          : "text-slate-500"
                      } col-span-2`}
                    >
                      {watchedTravellingFields?.penginapanId
                        ? allLodgings.find(
                            (penginapan) =>
                              penginapan.id ===
                              watchedTravellingFields.penginapanId
                          )?.namaPenginapan
                        : "Penginapan yang anda pilih akan ditampilkan disini."}
                    </p>
                  </div>
                </div>
              )}

              {selectedPackage === "travelling" && (
                <div className="grid grid-cols-4 gap-4">
                  <label className="font-semibold col-span-2 text-right">
                    Experience:{" "}
                  </label>
                  <ul className="col-span-2 list-disc">
                    {watchedTravellingFields?.experience?.map(
                      (experienceId, i) => (
                        <li className="ml-3" key={i}>
                          {
                            allExperiences.find(
                              (experineceItem) =>
                                experineceItem.id === experienceId
                            )?.namaExperience
                          }
                        </li>
                      )
                    ) || (
                      <li className="list-none text-slate-500">
                        Rincian experience yang anda pilih akan ditampilkan
                        disini
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Masa Perjalanan:
                </label>
                <p className={`col-span-2`}>
                  {`${selectedPackage === "travelling" ? 3 : 1} Hari`}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Biaya
                </label>
                <p className="col-span-2">
                  {`${Rupiah.format(
                    selectedPackage === "travelling" ? 1200000 : 499000
                  )} / Orang`}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <label className="font-semibold col-span-2 text-right">
                  Biaya Total:
                </label>
                <p className="col-span-2">
                  {`${Rupiah.format(
                    selectedPackage === "travelling"
                      ? (watchedTravellingFields.nama?.length || 0) * 1200000
                      : (watchedHealingFields.nama?.length || 0) * 499000
                  )} `}
                </p>
              </div>

              <Button
                className="bg-primary hover:bg-primary/80"
                onClick={() => {
                  confirmAlert({
                    customUI: ({ onClose }: { onClose: () => void }) => {
                      return (
                        <ConfirmationBox
                          icon={<GoInfo />}
                          judul="Konfirmasi Data"
                          pesan="Apakah anda yakin data yang anda masukkan sudah benar?"
                          onClose={onClose}
                          onClickIya={handlePayment}
                          labelIya="Yakin"
                          labelTidak="Sebentar, saya cek lagi"
                        />
                      );
                    },
                  });
                }}
              >
                Pesan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PackageOrderContext.Provider>
  );
}

export function useOrderPackageContext() {
  const context: PackageOrderContextType = useContext(PackageOrderContext);

  if (!context) alert("Anda menggunakan context di luar lingkup");

  return context;
}

export default OrderPackage;
