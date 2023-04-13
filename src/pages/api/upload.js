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
        const newEntry = await prisma.item.create({
          data: {
            title: req.body.name,
            artist: req.body.designer,
            content: req.body.description,
            images: {
              create: [
                  {
                url: req.body.images[0],
              }
            ],
            },
            owner: {
                connectOrCreate: {
                  where: {
                    email: 'kevin@gmail.com',
                  },
                  create: {
                    email: 'viola@prisma.io',
                    name: 'Viola',
                    password: 'hola'
                  },
                },
            }
          },
        });
        res.json({ error: null, data: { newEntry } });
      } catch (error) {
        res.status(500).json({ error: error.message, data: null });
      }
  });

export default handler;
