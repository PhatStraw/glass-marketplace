import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { email } = JSON.parse(req.body);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user) return res.status(404).json({ error: 'User not found' });
        const favoritedItems = await prisma.item.findMany({
            where: {
              owner: {
                id: user.id
              }
            },
            include: {
              images: true,
            },
          });
        if(!user) return res.status(200).json({ message: "No Favorites Found" });
        return res.status(200).json(favoritedItems, { success: true })
    } catch (error) {
        console.error('Request error', error)
        res.status(500).json({ error: 'Error creating question', success: false })
    }
}