import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextRequest, NextResponse } from "next/server";
import { getDatesInRange } from "@/lib/date-to-milliseconds";
import { error } from "console";
import { Reservation } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new Error("Anda beum login, silahkan login terlebih dahulu.");

    if (currentUser.isAdmin) {
      const allReservations = await db.reservation.findMany({
        include: {
          listing: true,
        },
      });

      return NextResponse.json(allReservations);
    } else {
      const userReservations = await db.reservation.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          listing: true,
        },
      });

      return NextResponse.json(userReservations);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      throw new Error("Anda belum login, silahkan login terlebih dahulu.");

    const body = await req.json();

    const { startDate, endDate, listingId, daysDifference } = body;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: true,
      },
    });

    if (!listing) throw new Error("Listing is not found");

    const allBookedDates = listing.reservations.flatMap((reservation) => {
      const reservedDates = reservation.reservedDates;

      return reservedDates;
    });

    const getDates = getDatesInRange(startDate, endDate);
    const isUnavailable = allBookedDates.some((date) =>
      getDates.includes(date)
    );

    if (isUnavailable) {
      return NextResponse.json({
        error: "You are trying to reserve a booked date!",
      });
    }

    const newReservation = await db.reservation.create({
      data: {
        startDate,
        endDate,
        listingId,
        daysDifference,
        reservedDates: getDates,
        userId: currentUser.id,
      } as Reservation,
    });

    return NextResponse.json(newReservation);
  } catch (error) {
    return NextResponse.json(error);
  }
}
