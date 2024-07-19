import { getDatesInRange } from "@/lib/date-to-milliseconds";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;


  try {
    if (!sig || !stripeSecret) {
      throw new Error("sig & stripeSecret undefined");
    }
    event = stripe.webhooks.constructEvent(reqBody, sig, stripeSecret);

    console.log("event-type" + event.type);
  } catch (error) {
    return NextResponse.json({ error });
  }

  switch (event.type) {
    case "checkout.session.completed":
      try {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent as string;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );
        const chargeId = paymentIntent.latest_charge;

        if (!session.metadata) throw new Error("Invalid Metadata");

        const {
          metadata: {
            startDate,
            endDate,
            listingId,
            pricePerNight,
            daysDifference,
            userId,
          },
        } = session;

        const reservedDates = getDatesInRange(startDate, endDate);

        const reservationData = {
          userId,
          listingId,
          startDate,
          endDate,
          chargeId: chargeId as string,
          reservedDates,
          daysDifference: Number(daysDifference),
        };

        const newReservation = await db.reservation.create({
          data: reservationData,
        });

        return NextResponse.json(newReservation);
      } catch (error) {
        NextResponse.json({ error });
      }
    // Send email functionality
    default:
      NextResponse.json({ error: "Event Type is not exist" });
  }
}
