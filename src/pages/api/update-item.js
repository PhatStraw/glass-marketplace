import { prisma } from "../../utils/prisma-helper"

export default async function handler(req, res) {
    const { userEmail, itemId } = JSON.parse(req.body);
  
    try {
      const user = await prisma.user.findUnique({
        where: { 
            email: userEmail 
        },
      });

  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: { favbyuser: true },
      });
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      const userAlreadyFavorited = item.favbyuser.some(
        (favUser) => favUser.id === user.id
      );

  
      let updatedItem;
  
      if (userAlreadyFavorited) {
        updatedItem = await prisma.item.update({
          where: { id: itemId },
          include: { favbyuser: true },
          data: {
            favbyuser: {
              disconnect: {
                id: user.id,
              },
            },
            likes: {
              decrement: 1,
            },
          },
        });
      return res.status(200).json({ item: updatedItem, like: false });
      } else {
        updatedItem = await prisma.item.update({
          where: { id: itemId },
          include: { favbyuser: true },
          data: {
            favbyuser: {
              connect: {
                id: user.id,
              },
            },
            likes: {
              increment: 1,
            },
          },
        });
      }
  
      return res.status(200).json({ item: updatedItem, like: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }