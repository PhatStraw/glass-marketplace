import { Box, Typography, Divider } from "@mui/material";
import HomeCard from "../components/CuratedCard";
import Feed from "../components/feed";
import SalesCard from "../components/SalesCard";
import { PrismaClient } from '@prisma/client';

export default function Shop({items}){
    return(
        <Box pt={0}>
            <Typography sx={{fontSize: '20px', paddingTop: 10, paddingLeft: 3, pb: 2, fontWeight: 'bold'}}  gutterBottom>
                Glass For Sale
            </Typography>
            <Divider />
            <HomeCard />
            <Typography m={1} sx={{fontSize: '18px', p: 1, fontWeight: 'bold'}} gutterBottom>
                Sales & Featured Collections
            </Typography>
            <SalesCard />
            <SalesCard />
            <SalesCard />
            <Feed items={items} />
        </Box>
    )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
    const prisma = new PrismaClient()
    const data = await prisma.item.findMany({
        include: {
            images: true,
          },
    })
    const items = JSON.stringify(data);
    console.log("POST",items)
    return {
      props: {
        items,
      },
    }
  }