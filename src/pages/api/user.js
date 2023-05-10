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
        return await getUser(req, res)
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false })
    }
}

async function getUser(req, res) {
    const body = JSON.parse(req.body)
  try {
    const user = await prisma.user.findUnique({
      where: body
    })
    return res.status(200).json(user)
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'User not found', success: false })
  }
}