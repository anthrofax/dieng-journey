// pages/orders.js
import React from "react";
import db from "@/lib/db";
import Image from "next/image";
import { getCurrentUser } from "@/lib/currentUser";
import { Rupiah } from "@/utils/format-currency";
import { Destination, Order, Penginapan } from "@prisma/client";
import { format } from "date-fns";
import id from "date-fns/locale/id";

// This is a server component that fetches data on the server
export default async function OrdersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return (
      <div className="orders-container">
        <h1>Transaksi Saya</h1>
        <p>
          Mohon untuk login terlebih dahulu untuk melihat daftar transaksimu.
        </p>
      </div>
    );
  }

  // Fetch orders for the current user
  const orders: (Order & {
    destination: Destination;
    penginapan?: Penginapan | null;
  })[] = await db.order.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      destination: true,
      penginapan: true,
      experiences: true,
    },
  });

  console.log(orders);

  if (!orders) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-xl font-bold mb-6">Transaksi saya</h1>
        <p className="text-gray-600">
          Mohon untuk login terlebih dahulu untuk melihat daftar transaksimu.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-8 lg:col-span-7 w-full px-5">
      <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">
        Transaksi Saya
      </h1>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center lg:text-left">
          Anda belum melakukan transaksi apapun.
        </p>
      ) : (
        <div className="space-y-6 flex gap-5 relative flex-wrap justify-center lg:justify-start">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-lg relative max-w-[300px] text-sm"
            >
              <h2 className="text-lg font-semibold mb-2">
                Order ID: {order.id}
              </h2>

              <Image
                src={order.destination.imageUrls[0]}
                alt={order.destination.destinationName}
                className="my-3 object-cover rounded"
                width={300}
                height={200}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <h3 className="text-md font-semibold">Destinasi</h3>
                <p className="capitalize">
                  {order.destination.destinationName}
                </p>
                <h3 className="text-md font-semibold">Lokasi</h3>
                <p className="capitalize">{order.destination.city}</p>
                <h3 className="text-md font-semibold">Nama</h3>
                <p>{order.nama}</p>
                <h3 className="text-md font-semibold">Nomor Hp</h3>
                <p>{order.nomorHp}</p>
                <h3 className="text-md font-semibold">Lokasi Penjemputan</h3>
                <p className="capitalize">{order.lokasiPenjemputan}</p>
                <h3 className="text-md font-semibold">Masa Perjalanan</h3>
                <p>{order.masaPerjalanan} hari</p>
                <h3 className="text-md font-semibold">Tanggal Perjalanan</h3>
                <p>
                  {format(order.tanggalPerjalanan, "d MMMM yyyy", {
                    locale: id,
                  })}
                </p>
                <h3 className="text-md font-semibold">Jumlah Tiket</h3>
                <p>{order.qty}</p>
                <h3 className="text-md font-semibold">Penginapan</h3>
                <p className="capitalize">
                  {order?.penginapan?.namaPenginapan ||
                    "Tidak Memesan Penginapan"}
                </p>
                <h3 className="text-md font-semibold">Total Biaya</h3>
                <p>{Rupiah.format(order.totalBiaya)}</p>
                <h3 className="text-md font-semibold">Experience Tambahan</h3>
                <p>{order.experience.join(", ") || "Tidak ada"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
