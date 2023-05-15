const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { items, items2 } = require("./data.js");
const load = async () => {
  try {
    await prisma.image.deleteMany();
    console.log("images deleted");

    await prisma.purchase.deleteMany();
    console.log("purchases deleted");

    await prisma.item.deleteMany();
    console.log("Items deleted");

    await prisma.user.deleteMany();
    console.log("users deleted");

    items.forEach(async (i) => {
      await prisma.item.create({
        data: i,
      });
      console.log("Item created");
    });

    items2.forEach(async (i) => {
      await prisma.item.create({
        data: i,
      });
      console.log("Item2 created");
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

load();
