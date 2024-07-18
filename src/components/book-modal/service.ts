import AXIOS_API from "@/utils/axios-api";
import { Listing } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

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

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      console.log(result.error);
      toast.error("Pembayaran Gagal");
    }
  } catch (error) {
    console.log(error);
  }
};
