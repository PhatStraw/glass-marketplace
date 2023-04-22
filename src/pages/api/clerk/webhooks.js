import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const stripe = require('stripe')('sk_test_51MsDgLAlSphatrSrZF0FCPNsjzXoee2NBiIdTsbtCj99etvWARd4ydiFBmM1gbRHniOYPaApw4n3NYzWqYXrAevI00eMiD4jaO');

export default async function handler(req, res) {
  const event = req.body;
  console.log(event)
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
        name: event.data.first_name,
        password: "NewNew123!",
        stripeid: account.id
      },
    });
}
// Handle the event
console.log("New Data:", newData);

res.status(200).send("ok");
}
