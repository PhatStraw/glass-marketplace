import { prisma } from "../../utils/prisma-helper"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await filters(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function filters(req, res) {
  const body = req.body
  try{
      const filteredItems = await prisma.item.findMany({
        where: body,
        include: {
            images: true,
          },
    })
    return res.status(200).json(filteredItems, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}