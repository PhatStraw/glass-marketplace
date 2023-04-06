import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";
import EasyPostClient from "@easypost/api";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

const endpointSecret =
  "whsec_6753778743b33398158477a4d41804d66fbec24da199e028d553f9951c7ecf3d";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        console.log("---CHECKOUT SUCCEEDED OBJECT---", checkoutSucceeded);

        // const shipment = await client.Shipment.create({
        //   from_address: {
        //     street1: "417 MONTGOMERY ST",
        //     street2: "FLOOR 5",
        //     city: "SAN FRANCISCO",
        //     state: "CA",
        //     zip: "94104",
        //     country: "US",
        //     company: "EasyPost",
        //     phone: "415-123-4567",
        //   },
        //   to_address: {
        //     name: checkoutSucceeded.customer_details.name,
        //     street1: checkoutSucceeded.customer_details.addess.line1,
        //     city: checkoutSucceeded.customer_details.addess.city,
        //     state: checkoutSucceeded.customer_details.addess.state,
        //     zip: checkoutSucceeded.customer_details.addess.postal_code,
        //     country: checkoutSucceeded.customer_details.addess.country,
        //     phone: checkoutSucceeded.customer_details.phone ? checkoutSucceeded.customer_details.phone : checkoutSucceeded.customer_details.email,
        //   },
        //   parcel: {
        //     length: 8,
        //     width: 5,
        //     height: 5,
        //     weight: 5,
        //   },
        // });
        // const boughtShipment = await client.Shipment.buy(
        //   shipment.id,
        //   shipment.lowestRate()
        // );

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default cors(handler);
