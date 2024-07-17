import AXIOS_API from "@/utils/axios-api";
import { Listing } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";

export const redirectToCheckout = async (
  listing: Listing,
  startDate: Date,
  endDate: Date,
  daysDifference: number
) => {
  try {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );

    if (!stripe) throw new Error("Stripe failed to initialize");

    const {
      data: { sessionId },
    } = await AXIOS_API.post("/stripe", {
      listing,
      startDate,
      endDate,
      daysDifference,
    });

    const stripeError = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (stripeError) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
