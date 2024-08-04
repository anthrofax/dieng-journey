// pages/orders.js
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";
import Image from "next/image";
import { getCurrentUser } from "@/lib/currentUser";
import { Rupiah } from "@/utils/format-currency";

// This is a server component that fetches data on the server
export default async function OrdersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return (
      <div className="orders-container">
        <h1>My Orders</h1>
        <p>No current user found. Please log in to view your orders.</p>
      </div>
    );
  }

  // Fetch orders for the current user
  const orders = await db.order.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      destination: true,
    },
  });

  console.log(orders);

  if (!orders) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <p className="text-gray-600">
          No current user found. Please log in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found for your account.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order.id}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p>Nama: {order.nama}</p>
                <p>Nomor HP: {order.nomorHp}</p>
                <p>Lokasi Penjemputan: {order.lokasiPenjemputan}</p>
                <p>Masa Perjalanan: {order.masaPerjalanan} hari</p>
                <p>
                  Tanggal Perjalanan:{" "}
                  {new Date(order.tanggalPerjalanan).toLocaleDateString()}
                </p>
                <p>Qty: {order.qty}</p>
                <p>Penginapan: {order.penginapanId || "N/A"}</p>
                <p>Total Biaya: {Rupiah.format(order.totalBiaya)}</p>
                <p>Experience: {order.experience.join(", ") || "None"}</p>
              </div>
              {order.destination && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Destination</h3>
                  <p>Name: {order.destination.destinationName}</p>
                  <p>City: {order.destination.city}</p>
                  <img
                    src={order.destination.imageUrls[0]}
                    alt={order.destination.destinationName}
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
