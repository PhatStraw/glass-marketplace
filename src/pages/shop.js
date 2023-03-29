import { Box, Typography, Divider } from "@mui/material";
import HomeCard from "./components/CuratedCard";
import Feed from "./components/feed";
import SalesCard from "./components/SalesCard";

export default function Shop(){
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
            <Feed />
        </Box>
    )
}