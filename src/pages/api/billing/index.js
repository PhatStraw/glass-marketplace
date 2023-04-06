import { NextApiRequest, NextApiResponse } from "next";

import { formatAmountForStripe } from "../../../utils/stripe-helpers";
const EasyPostClient = require("@easypost/api");

const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

const stripe = require("stripe")(
  "sk_test_51MsDgLAlSphatrSrZF0FCPNsjzXoee2NBiIdTsbtCj99etvWARd4ydiFBmM1gbRHniOYPaApw4n3NYzWqYXrAevI00eMiD4jaO"
);

export default async function handler(req, res) {
  try {
      // const customer = await stripe.customers.retrieve(session.user.stripeCustomerId);
      const session = await stripe.billingPortal.sessions.create({
        customer: "cus_NeFMcvORCmiQoP",
        return_url: "http://localhost:3000/account",
      });

    res.json(session);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
