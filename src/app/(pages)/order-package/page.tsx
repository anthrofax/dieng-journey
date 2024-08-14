"use client";

import { z } from "zod";
import { Button as ShadButton } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLodgingHooks } from "@/hooks/lodging-hooks";
import { Rupiah } from "@/utils/format-currency";
import Skeleton from "react-loading-skeleton";
import { useExperienceHooks } from "@/hooks/experience-hook";
import { Checkbox } from "@/components/ui/checkbox";
import { useDestinationHook } from "@/hooks/destination-hooks";
import { Destination } from "@prisma/client";
import Link from "next/link";
import TravellingForm from "./travelling-form";
import HealingForm from "./healing-form";

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

function OrderPackage() {
  const { allLodgings, isLoadingQuery: isLoadingLodgingQuery } =
    useLodgingHooks();
  const { allExperiences, isLoadingQuery: isLoadingExperienceQuery } =
    useExperienceHooks();
  const { allDestinations, isLoading: isLoadingDestinationQuery } =
    useDestinationHook();

  let selectedPackage = "healing";

  return (
    <div className="py-16 px-3 relative">
      <div className="py-2 w-full text-center">
        <h1 className="text-xl font-semibold">
          Pemesanan Paket{" "}
          {selectedPackage === "healing" ? "Healing" : "Travelling"}
        </h1>
        <p className="text-sm mt-1">
          Lengkapi data perjalananmu disini, sebelum melakukan pemesanan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {selectedPackage === "healing" && (
          <HealingForm
            allDestinations={allDestinations}
            isLoadingDestinationQuery={isLoadingDestinationQuery}
            lokasiPenjemputan={lokasiPenjemputan}
          />
        )}

        {selectedPackage === "travelling" && (
          <TravellingForm
            allDestinations={allDestinations}
            allExperiences={allExperiences}
            allLodgings={allLodgings}
            isLoadingDestinationQuery={isLoadingDestinationQuery}
            isLoadingExperienceQuery={isLoadingExperienceQuery}
            isLoadingLodgingQuery={isLoadingDestinationQuery}
            lokasiPenjemputan={lokasiPenjemputan}
          />
        )}

        {selectedPackage !== "healing" && selectedPackage !== "travelling" && (
          <p>Paket tidak tersedia</p>
        )}
      </div>
    </div>
  );
}

export default OrderPackage;
