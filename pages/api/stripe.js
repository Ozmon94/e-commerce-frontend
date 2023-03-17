import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  if (user) {
    const stripeId = user["http://localhost:3000/stripe_customer_id"];
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          customer: stripeId,
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["PL"],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "pln" },
                display_name: "Free shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 2 },
                  maximum: { unit: "business_day", value: 7 },
                },
              },
            },
          ],
          success_url: `${req.headers.origin}/success?$session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancel`,
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "pln",
                product_data: {
                  name: item.attributes.title,
                  images: [
                    item.attributes.image.data.attributes.formats.thumbnail.url,
                  ],
                },
                unit_amount: item.attributes.price * 100,
              },
              quantity: item.quantity,
            };
          }),
        });

        res.status(200).json(session);
      } catch (e) {
        res.status(e.statusCode || 500).json(e.message);
      }
    }
  } else {
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["PL"],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "pln" },
                display_name: "Free shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 2 },
                  maximum: { unit: "business_day", value: 7 },
                },
              },
            },
          ],
          success_url: `${req.headers.origin}/success?$session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancel`,
          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "pln",
                product_data: {
                  name: item.attributes.title,
                  images: [
                    item.attributes.image.data.attributes.formats.thumbnail.url,
                  ],
                },
                unit_amount: item.attributes.price * 100,
              },
              quantity: item.quantity,
            };
          }),
        });

        res.status(200).json(session);
      } catch (e) {
        res.status(e.statusCode || 500).json(e.message);
      }
    }
  }
}
