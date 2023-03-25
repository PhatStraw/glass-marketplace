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
    // get user's token
    // const token = await getToken({ req });

    // if no token
    // if (!token) {
    //   return res.status(401).json({ error: 'You are not signed in', data: null });
    // }
    // get parsed image and video from multer
    const image = req.files.filter((file) => file.fieldname === "image")[0];
    // create a neew Data URI parser
    const parser = new DatauriParser();
    try {
      // create image
      const createImage = async (img) => {
        const base64Image = parser.format(
          path.extname(img.originalname).toString(),
          img.buffer
        );
        const uploadedImageResponse = await cloudinary.uploader.upload(
          base64Image.content,
          "flashcards",
          { resource_type: "image" }
        );
        return uploadedImageResponse;
      };

      // saving information
      const createdImage = await createImage(image);
      const imageUrl = createdImage.url;
      const image_id = createdImage.public_id;
      const image_signature = createdImage.signature;
      const body = req.body;
      try {
        const newEntry = await prisma.item.create({
          data: {
            title: body.title,
            artist: body.artist,
            content: body.content,
            images: {
              create: [
                  {
                url: imageUrl,
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
    } catch (error) {
      res.status(500).json({ error, data: null });
    }
  });

// disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
