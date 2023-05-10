import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";
import EasyPostClient from "@easypost/api";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
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
        console.log("---CHECKOUT SUCCEEDED OBJECT---", checkoutSucceeded.customer_details);
        const buyer = await prisma.user.findUnique({
          where: {
            email: checkoutSucceeded.customer_details.email
          }
        })
        if(!buyer)return res.status(404).json({ error: 'User not found' });
        const newPurchase = await prisma.purchase.create({
          data: {
            quantity: 1,
            item: {
              connect: {
                id: checkoutSucceeded.metadata.itemID
              }
            },
            user: {
              connect: {
                id: buyer.id
              }
            }
          }
        });
        console.log("new Purchase",newPurchase)

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
