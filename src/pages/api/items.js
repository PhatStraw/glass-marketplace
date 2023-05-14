import { prisma } from "../../utils/prisma-helper"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await getItem(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function getItem(req, res) {
  try {
    const items = await prisma.item.findMany()
    
    return res.status(200).json(items, { success: true })
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error creating question', success: false })
  }
}