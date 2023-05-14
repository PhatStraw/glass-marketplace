const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
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
