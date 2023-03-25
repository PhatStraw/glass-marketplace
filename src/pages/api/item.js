import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await createItem(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function createItem(req, res) {
  const body = req.body
  try {
    let newImages = []
    for (let index = 0; index < req.body.images.length; index++) {
      const element = array[index];
      const newImage = await prisma.Image.createMany({
        data: [...req.body.images]
      })
    }
    const newEntry = await prisma.item.create({
      data: {
        name: body.title,
        email: body.content,
        subject: body.i,
        message: body.message
      }
    })
    return res.status(200).json(newEntry, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}