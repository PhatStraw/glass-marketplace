import nc from "next-connect";
// import { getToken } from 'next-auth/jwt';
import multer from "multer";
import path from "path";
import DatauriParser from "datauri/parser";
import cloudinary from "../../utils/cloudinary";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
        const imagesMap = req.body.images.map(i => ({url: i}))
        console.log(req.body)
        const newEntry = await prisma.item.create({
          data: {
            title: req.body.name,
            artist: req.body.designer,
            content: req.body.description,
            color: req.body.color,
            condition: req.body.condition,
            price: parseInt(req.body.price),
            shipping: parseInt(req.body.shipping),
            images: {
              create: imagesMap
            },
            owner: {
                connectOrCreate: {
                  where: {
                    email: req.body.email,
                  },
                  create: {
                    email: req.body.email,
                    name: 'kota',
                    password: 'holakota'
                  },
                },
            }
          },
        });
        console.log(newEntry)
        res.status(200).json({ error: null, data: { newEntry, success: true } });
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, data: null });
      }
  });

export default handler;
