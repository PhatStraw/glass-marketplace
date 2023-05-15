import { prisma } from "../../../utils/prisma-helper"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const event = req.body;
  console.log("EVENT",event)
  let newData
  if (event.type === "user.created") {
    const account = await stripe.accounts.create({
        type: 'express',
        email: event.data.email_addresses[0].email_address,
        country: "US",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: 'individual',
        individual: {
          first_name: event.data.first_name,
          last_name: event.data.last_name,
        },
      });
    newData = await prisma.user.create({
      data: {
        email: event.data.email_addresses[0]["email_address"],
        name: event.data.first_name || event.data.username,
        password: "NewNew123!",
        stripeid: account.id
      },
    });
}
  // Handle the event
  res.status(200).send("ok");
}
