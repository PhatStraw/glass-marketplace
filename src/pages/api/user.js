import { PrismaClient } from '@prisma/client'
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dcmncwymq",
  api_key: "127627484927622",
  api_secret: "m80QvcDBAkbvzKLUOpNkz_gkwR8"
});


// Upload


const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createUser(req, res)
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

async function createUser(req, res) {
    const body = req.body
  try {
    const res = await cloudinary.uploader.upload(req.body, {public_id: "olympic_boo"})
      // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
    // const newEntry = await prisma.user.create({
    //   data: {
    //     email: body.email,
    //     password: body.password,
    //     name: body.name
    //   }
    // })
    return res.status(200).json(true, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}