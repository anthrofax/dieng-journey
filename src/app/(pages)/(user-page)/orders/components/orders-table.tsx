"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageOrderType, RegularOrderType } from "../type";
import { Rupiah } from "@/utils/format-currency";
import { IoEye } from "react-icons/io5";
import Modal from "./modal";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { lokasiPenjemputan } from "@/app/(pages)/order-package/page";

export default function OrdersTable({
  regularOrders,
  packageOrders,
}: {
  regularOrders: RegularOrderType[];
  packageOrders: PackageOrderType[];
}) {
  const [selectedRegularOrder, setSelectedRegularOrder] =
    useState<RegularOrderType | null>(null);
  const [selectedPackageOrder, setSelectedPackageOrder] =
    useState<PackageOrderType | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleViewRegularOrderDetails = (order: RegularOrderType) => {
    setSelectedRegularOrder(order);
    setSelectedPackageOrder(null); // Clear package order selection
    setModalOpen(true);
  };

  const handleViewPackageOrderDetails = (order: PackageOrderType) => {
    setSelectedPackageOrder(order);
    setSelectedRegularOrder(null); // Clear regular order selection
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      {/* Tabel untuk Regular Orders */}
      <h2 className="text-xl font-medium text-center lg:text-left mb-4">
        Transaksi Pemesanan Reguler
      </h2>
      <table className="min-w-full bg-white border border-gray-200 mb-8">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Gambar Destinasi
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Destinasi
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Pelanggan
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Jumlah Pembelian Tiket
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Total Biaya
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Experience Tambahan
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {regularOrders.map((order: RegularOrderType) => (
            <tr key={order.id}>
              <td className="px-6 py-4 flex justify-center">
                <Image
                  src={order.destination.imageUrls[0]}
                  alt={order.destination.destinationName}
                  className="object-cover rounded"
                  width={60}
                  height={60}
                />
              </td>
              <td className="text-center">
                {order.destination.destinationName}
              </td>
              <td className="text-center">{order.nama}</td>
              <td className="text-center">{order.qty}</td>
              <td className="text-center">{Rupiah.format(order.totalBiaya)}</td>
              <td className="text-center">
                {order.experiences.length > 0
                  ? order.experiences.length + " Tempat"
                  : "Tidak ada"}
              </td>
              <td className="text-center">
                <button onClick={() => handleViewRegularOrderDetails(order)}>
                  <IoEye color="rgb(37 99 235)" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabel untuk Package Orders */}
      <h2 className="text-xl font-medium text-center lg:text-left mb-4">
        Transaksi Pemesanan Paket
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Gambar Destinasi
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Destinasi
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Pelanggan
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Jumlah Pembelian Tiket
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Total Biaya
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Experience Tambahan
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {packageOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 flex justify-center">
                <Image
                  src={order.destinations[0].destinations.imageUrls[0]}
                  alt={order.destinations[0].destinations.destinationName}
                  className="object-cover rounded"
                  width={60}
                  height={60}
                />
              </td>
              <td className="text-center">
                {order.destinations
                  .map((d) => d.destinations.destinationName)
                  .join(", ")}
              </td>
              <td className="text-center">{order.nama.join(", ")}</td>
              <td className="text-center">{order.nama.length}</td>
              <td className="text-center">{Rupiah.format(order.totalBiaya)}</td>
              <td className="text-center">
                {order.experiences.length > 0
                  ? order.experiences.length + " Tempat"
                  : "Tidak ada"}
              </td>
              <td className="text-center">
                <button onClick={() => handleViewPackageOrderDetails(order)}>
                  <IoEye color="rgb(37 99 235)" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRegularOrder && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="space-y-5 text-sm md:text-base w-full h-fit max-h-[512px] overflow-y-auto">
            <div className="space-y-2">
              {/* Judul Modal */}
              <h2 className="text-lg font-semibold text-center">
                Detail Data Pemesanan Reguler
              </h2>

              {/* Caption Modal */}
              <p className="text-center text-gray-600">
                Kamu dapat hubungi kami{" "}
                <Link href="/#contact-section" className="font-semibold">
                  disini
                </Link>{" "}
                jika ada kesalahan atau ada yang ingin kamu tanyakan
              </p>
            </div>

            {/* Detail Regular Order */}
            <div className="h-fit max-h-[512px] space-y-4 overflow-y-auto">
              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Nama</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">{selectedRegularOrder.nama}</p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Nomor HP</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">{selectedRegularOrder.nomorHp}</p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Lokasi Penjemputan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {
                    lokasiPenjemputan.find(
                      (lokasi) =>
                        lokasi.value === selectedRegularOrder.lokasiPenjemputan
                    )?.label
                  }
                </p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Masa Perjalanan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {selectedRegularOrder.masaPerjalanan} Hari
                </p>
              </div>

              {selectedRegularOrder.masaPerjalanan === 3 && (
                <div className="grid grid-cols-5 gap-x-2 items-start">
                  <div className="col-span-2 font-semibold flex items-start gap-2">
                    <label className="w-[98%]">Opsi Penginapan</label>
                    <span>:</span>
                  </div>
                  <p className="col-span-3">
                    {selectedRegularOrder.penginapan?.namaPenginapan ||
                      "Tidak Memesan Penginapan"}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Tanggal Perjalanan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {selectedRegularOrder.tanggalPerjalanan
                    ? format(
                        selectedRegularOrder.tanggalPerjalanan,
                        "d MMMM yyyy",
                        {
                          locale: id,
                        }
                      )
                    : "Tanggal tidak tersedia"}
                </p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Jumlah Pembelian Tiket</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  Untuk {selectedRegularOrder.qty} Orang
                </p>
              </div>

              {selectedRegularOrder.experiences.length > 0 && (
                <div className="grid grid-cols-5 gap-x-2 items-start">
                  <div className="col-span-2 font-semibold flex items-start gap-2">
                    <label className="w-[98%]">Experience</label>
                    <span>:</span>
                  </div>
                  <ul className="col-span-3 list-disc pl-5">
                    {selectedRegularOrder.experiences.map(({ experiences }) => (
                      <li key={experiences.id}>{experiences.namaExperience}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal untuk Package Orders */}
      {isModalOpen && selectedPackageOrder && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="space-y-5 text-sm md:text-base w-full h-fit max-h-[512px] overflow-y-auto">
            <div className="space-y-2">
              {/* Judul Modal */}
              <h2 className="text-lg font-semibold text-center">
                Detail Data Pemesanan Paket
              </h2>

              {/* Caption Modal */}
              <p className="text-center text-gray-600">
                Kamu dapat hubungi kami{" "}
                <Link href="/#contact-section" className="font-semibold">
                  disini
                </Link>{" "}
                jika ada kesalahan atau ada yang ingin kamu tanyakan
              </p>
            </div>

            {/* Detail Package Order */}
            <div className="h-fit max-h-[512px] space-y-4 overflow-y-auto">
              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Nama</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {selectedPackageOrder.nama.join(", ")}
                </p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Nomor HP</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">{selectedPackageOrder.nomorHp}</p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Lokasi Penjemputan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {
                    lokasiPenjemputan.find(
                      (lokasi) =>
                        lokasi.value === selectedPackageOrder.lokasiPenjemputan
                    )?.label
                  }
                </p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Masa Perjalanan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {selectedPackageOrder.masaPerjalanan} Hari
                </p>
              </div>

              {selectedPackageOrder.masaPerjalanan === 3 && (
                <div className="grid grid-cols-5 gap-x-2 items-start">
                  <div className="col-span-2 font-semibold flex items-start gap-2">
                    <label className="w-[98%]">Opsi Penginapan</label>
                    <span>:</span>
                  </div>
                  <p className="col-span-3">
                    {selectedPackageOrder.penginapan?.namaPenginapan ||
                      "Tidak Memesan Penginapan"}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Tanggal Perjalanan</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  {selectedPackageOrder.tanggalPerjalanan
                    ? format(
                        selectedPackageOrder.tanggalPerjalanan,
                        "d MMMM yyyy",
                        {
                          locale: id,
                        }
                      )
                    : "Tanggal tidak tersedia"}
                </p>
              </div>

              <div className="grid grid-cols-5 gap-x-2 items-start">
                <div className="col-span-2 font-semibold flex items-start gap-2">
                  <label className="w-[98%]">Jumlah Pembelian Tiket</label>
                  <span>:</span>
                </div>
                <p className="col-span-3">
                  Untuk {selectedPackageOrder.nama.length} Orang
                </p>
              </div>

              {selectedPackageOrder.experiences.length > 0 && (
                <div className="grid grid-cols-5 gap-x-2 items-start">
                  <div className="col-span-2 font-semibold flex items-start gap-2">
                    <label className="w-[98%]">Experience</label>
                    <span>:</span>
                  </div>
                  <ul className="col-span-3 list-disc pl-5">
                    {selectedPackageOrder.experiences.map(({ experiences }) => (
                      <li key={experiences.id}>{experiences.namaExperience}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPackageOrder.destinations.length > 0 && (
                <div className="grid grid-cols-5 gap-x-2 items-start">
                  <div className="col-span-2 font-semibold flex items-start gap-2">
                    <label className="w-[98%]">Destinasi</label>
                    <span>:</span>
                  </div>
                  <ul className="col-span-3 list-disc pl-5">
                    {selectedPackageOrder.destinations.map(
                      ({ destinations }) => (
                        <li key={destinations.destinationId}>
                          {destinations.destinationName}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
