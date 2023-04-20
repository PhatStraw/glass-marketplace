import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const event = req.body;
  let newData
  if (event.type === "user.created") {
    newData = await prisma.user.create({
      data: {
        email: event.data.email_addresses[0]["email_address"],
        name: event.data.first_name,
        password: "NewNew123!"
      },
    });
}
// Handle the event
console.log("New Data:", newData);

res.status(200).send("ok");
}
