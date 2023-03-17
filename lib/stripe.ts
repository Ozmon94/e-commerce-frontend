import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripeInstance: Promise<Stripe | null>;

const getStrap = () => {
  if (!stripeInstance) {
    stripeInstance = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripeInstance;
};

export default getStrap;
