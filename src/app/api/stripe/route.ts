import { getCurrentUser } from "@/lib/currentUser";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") as string;

  try {
    const {
      listing: { name, pricePerNight, id: listingId },
      startDate,
      endDate,
      daysDifference,
    } = await req.json();

    const stripe_obj = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name,
          },
          unit_amount: pricePerNight * 100,
        },
        quantity: daysDifference,
      },
    ];

    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("Kamu belum login.");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripe_obj,
      mode: "payment",
      success_url: `${origin}/success-page`,
      cancel_url: origin,
      metadata: {
        startDate,
        endDate,
        listingId,
        pricePerNight,
        daysDifference,
        userId: currentUser.id,
        email: currentUser.email,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chargeId = searchParams.get("charge_id") ?? "";
    const reservationId = searchParams.get("reservation_id") ?? "";

    if (reservationId === "") throw new Error("Reservation ID tidak valid.");

    const refundedPayment = await stripe.refunds.create({
      charge: chargeId,
    });

    console.log(refundedPayment);
    if (refundedPayment.status !== "succeeded") {
      return NextResponse.json({
        error: "Can't cancel the reservation with an id of " + reservationId,
      });
    }

    return NextResponse.json({
      message: "Successfully cancelled the reservation",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
