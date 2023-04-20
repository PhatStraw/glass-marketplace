import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await getItem(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function getItem(req, res) {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.query.id,
      },
      include: {
        images: true,
        favbyuser: true
      }
    })
    
    return res.status(200).json(item, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}