import nc from "next-connect";
import algoliasearch from "algoliasearch";
// import { getToken } from 'next-auth/jwt';
import multer from "multer";
import path from "path";
import DatauriParser from "datauri/parser";
import cloudinary from "../../utils/cloudinary";
import { prisma } from "../../utils/prisma-helper"

const handler = nc({
  onError: (res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  // uploading two files
  .use(multer().any())
  .post(async (req, res) => {
    try {
      const data = req.body;
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const imagesMap = data.images.map((i) => ({ url: i }));
      console.log("REQBODY____", data);
      const newEntry = await prisma.item.create({
        data: {
          title: data.name,
          artist: data.designer,
          content: data.description,
          color: data.color,
          condition: data.condition,
          price: parseInt(data.price),
          shipping: parseInt(data.shipping),
          images: {
            create: imagesMap,
          },
          userId: user.id,
        },
      });
      console.log(newEntry);

      const client = algoliasearch(
        "F0MWT13LOM",
        "f8a99064a8a838f1a60693944f84f000"
      );

      const index = client.initIndex("demo_ecommerce");

      fetch("https://alg.li/doc-ecommerce.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (products) {
          return index.saveObjects(products, {
            autoGenerateObjectIDIfNotExist: true,
          });
        });
      res.status(200).json({ error: null, data: { newEntry, success: true } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message, data: null });
    }
  });

export default handler;
