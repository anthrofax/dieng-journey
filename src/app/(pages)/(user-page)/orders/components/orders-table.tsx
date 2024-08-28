"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageOrderType, RegularOrderType } from "../type";
import { Rupiah } from "@/utils/format-currency";
import { IoEye } from "react-icons/io5";
import Modal from "./modal";
import { format, getDate, isAfter, subDays, subMonths } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { lokasiPenjemputan } from "@/app/(pages)/order-package/page";

type PackageSortableFields = "totalBiaya" | "namaLength"; // Add more fields as needed

export default function OrdersTable({
  regularOrders,
  packageOrders,
}: {
  regularOrders: RegularOrderType[];
  packageOrders: PackageOrderType[];
}) {
  // State for regular orders
  const [selectedRegularOrder, setSelectedRegularOrder] =
    useState<RegularOrderType | null>(null);
  const [isRegularModalOpen, setRegularModalOpen] = useState(false);
  const [regularFilter, setRegularFilter] = useState("");
  const [regularSortField, setRegularSortField] = useState("");
  const [regularSortOrder, setRegularSortOrder] = useState("asc");
  const [regularCurrentPage, setRegularCurrentPage] = useState(1);
  const regularItemsPerPage = 5;
  const [regularTimeFilter, setRegularTimeFilter] = useState("7days");
  const [packageTimeFilter, setPackageTimeFilter] = useState("7days");

  // State for package orders
  const [selectedPackageOrder, setSelectedPackageOrder] =
    useState<PackageOrderType | null>(null);
  const [isPackageModalOpen, setPackageModalOpen] = useState(false);
  const [packageFilter, setPackageFilter] = useState("");
  const [packageSortField, setPackageSortField] = useState<
    PackageSortableFields | ""
  >("");
  const [packageSortOrder, setPackageSortOrder] = useState("asc");
  const [packageCurrentPage, setPackageCurrentPage] = useState(1);
  const packageItemsPerPage = 5;

  const handleViewRegularOrderDetails = (order: RegularOrderType) => {
    setSelectedRegularOrder(order);
    setRegularModalOpen(true);
  };

  const handleViewPackageOrderDetails = (order: PackageOrderType) => {
    setSelectedPackageOrder(order);
    setPackageModalOpen(true);
  };

  // Function to get the start date based on selected filter
  const getStartDate = (timeFilter: string) => {
    switch (timeFilter) {
      case "7days":
        return subDays(new Date(), 7);
      case "1month":
        return subMonths(new Date(), 1);
      case "3months":
        return subMonths(new Date(), 3);
      case "6months":
        return subMonths(new Date(), 6);
      case "1year":
        return subMonths(new Date(), 12);
      default:
        return null;
    }
  };

  // Filtering and sorting for regular orders with time filter
  const startDate = getStartDate(regularTimeFilter);

  // Filtering and sorting for regular orders
  const filteredRegularOrders = regularOrders.filter(
    (order) =>
      (startDate ? isAfter(new Date(order.createdAt), startDate) : true) &&
      (order.destination.destinationName
        .toLowerCase()
        .includes(regularFilter.toLowerCase()) ||
        order.nama.toLowerCase().includes(regularFilter.toLowerCase()))
  );

  const sortedRegularOrders = [...filteredRegularOrders].sort((a, b) => {
    if (regularSortField) {
      const fieldA = a[regularSortField as keyof RegularOrderType] as
        | number
        | string;
      const fieldB = b[regularSortField as keyof RegularOrderType] as
        | number
        | string;
      return regularSortOrder === "asc"
        ? fieldA > fieldB
          ? 1
          : -1
        : fieldA < fieldB
        ? 1
        : -1;
    }
    return 0;
  });

  const paginatedRegularOrders = sortedRegularOrders.slice(
    (regularCurrentPage - 1) * regularItemsPerPage,
    regularCurrentPage * regularItemsPerPage
  );

  const regularPageCount = Math.ceil(
    sortedRegularOrders.length / regularItemsPerPage
  );

  // Filtering and sorting for package orders with time filter
  const packageStartDate = getStartDate(packageTimeFilter);
  // Filtering and sorting for package orders
  const filteredPackageOrders = packageOrders.filter(
    (order) =>
      (packageStartDate
        ? isAfter(new Date(order.createdAt), packageStartDate)
        : true) &&
      (order.destinations
        .map((d) => d.destinations.destinationName)
        .join(", ")
        .toLowerCase()
        .includes(packageFilter.toLowerCase()) ||
        order.nama
          .join(", ")
          .toLowerCase()
          .includes(packageFilter.toLowerCase()))
  );

  const sortedPackageOrders = [...filteredPackageOrders].sort((a, b) => {
    let fieldA: number | string;
    let fieldB: number | string;

    if (packageSortField) {
      if (packageSortField === "namaLength") {
        fieldA = a.nama.length;
        fieldB = b.nama.length;
      } else {
        fieldA = a[packageSortField as keyof PackageOrderType] as
          | number
          | string;
        fieldB = b[packageSortField as keyof PackageOrderType] as
          | number
          | string;
      }

      return packageSortOrder === "asc"
        ? fieldA > fieldB
          ? 1
          : -1
        : fieldA < fieldB
        ? 1
        : -1;
    }
    return 0;
  });

  const paginatedPackageOrders = sortedPackageOrders.slice(
    (packageCurrentPage - 1) * packageItemsPerPage,
    packageCurrentPage * packageItemsPerPage
  );

  const packagePageCount = Math.ceil(
    sortedPackageOrders.length / packageItemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      {/* Tabel untuk Regular Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-center lg:text-left mb-4">
          Transaksi Pemesanan Reguler
        </h2>

        {!regularOrders ? (
          <p>Pemesanan reguler belum ada.</p>
        ) : (
          <>
            <div className="mb-4 flex gap-3 items-center">
              <input
                type="text"
                placeholder="Cari berdasarkan destinasi ataupun customer"
                value={regularFilter}
                onChange={(e) => setRegularFilter(e.target.value)}
                className="border p-2 rounded"
              />
              <select
                onChange={(e) => setRegularSortField(e.target.value)}
                className="border p-2 rounded ml-2"
              >
                <option value="">Urutkan berdasarkan</option>
                <option value="totalBiaya">Total Biaya</option>
                <option value="qty">Jumlah Pembelian Tiket</option>
                {/* Add more sorting options as needed */}
              </select>

              <select
                onChange={(e) => setRegularTimeFilter(e.target.value)}
                className="border p-2 rounded"
                defaultValue="7days"
              >
                <option value="all">Semua Waktu</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="1month">1 Bulan Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>

              <button
                onClick={() =>
                  setRegularSortOrder(
                    regularSortOrder === "asc" ? "desc" : "asc"
                  )
                }
                className="border p-2 rounded ml-2"
              >
                {regularSortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
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
                    Dipesan pada
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRegularOrders.map((order: RegularOrderType) => (
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
                    <td className="text-center">
                      {Rupiah.format(order.totalBiaya)}
                    </td>
                    <td className="text-center">
                      {order.experiences.length > 0
                        ? order.experiences.length + " Tempat"
                        : "Tidak ada"}
                    </td>
                    <td className="text-center">
                      {format(new Date(order.createdAt), "d MMMM yyyy", {
                        locale: id,
                      })}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleViewRegularOrderDetails(order)}
                      >
                        <IoEye color="rgb(37 99 235)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: regularPageCount }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setRegularCurrentPage(i + 1)}
                  className={`border px-3 py-1 rounded ${
                    i + 1 === regularCurrentPage ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Tabel untuk Package Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-center lg:text-left mb-4">
          Transaksi Pemesanan Paket
        </h2>

        {!packageOrders ? (
          <p>Pemesanan reguler belum ada.</p>
        ) : (
          <>
            <div className="mb-4 flex gap-3 items-center">
              <input
                type="text"
                placeholder="Cari berdasarkan destinasi atau nama customer"
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="border p-2 rounded"
              />
              <select
                onChange={(e) =>
                  setPackageSortField(e.target.value as PackageSortableFields)
                }
                className="border p-2 rounded ml-2"
              >
                <option value="">Urutkan berdasarkan</option>
                <option value="totalBiaya">Total Biaya</option>
                <option value="namaLength">Jumlah Nama</option>
                {/* Add more sorting options as needed */}
              </select>
              <select
                onChange={(e) => setPackageTimeFilter(e.target.value)}
                className="border p-2 rounded"
                defaultValue="7days"
              >
                <option value="all">Semua Waktu</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="1month">1 Bulan Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
              <button
                onClick={() =>
                  setPackageSortOrder(
                    packageSortOrder === "asc" ? "desc" : "asc"
                  )
                }
                className="border p-2 rounded ml-2"
              >
                {packageSortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
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
                    Dipesan pada
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPackageOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 flex justify-center">
                      <Image
                        src={order?.destinations[0]?.destinations?.imageUrls[0]}
                        alt={
                          order?.destinations[0]?.destinations?.destinationName
                        }
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
                    <td className="text-center">
                      {Rupiah.format(order.totalBiaya)}
                    </td>
                    <td className="text-center">
                      {order.experiences.length > 0
                        ? order.experiences.length + " Tempat"
                        : "Tidak ada"}
                    </td>
                    <td className="text-center">
                      {format(new Date(order.createdAt), "d MMMM yyyy", {
                        locale: id,
                      })}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleViewPackageOrderDetails(order)}
                      >
                        <IoEye color="rgb(37 99 235)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: packagePageCount }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPackageCurrentPage(i + 1)}
                  className={`border px-3 py-1 rounded ${
                    i + 1 === packageCurrentPage ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {isRegularModalOpen && selectedRegularOrder && (
        <Modal onClose={() => setRegularModalOpen(false)}>
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
      {isPackageModalOpen && selectedPackageOrder && (
        <Modal onClose={() => setPackageModalOpen(false)}>
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
