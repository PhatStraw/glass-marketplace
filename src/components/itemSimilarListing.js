import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import {
  Box,
  Typography,
  ListItemButton,
  Divider,
  ListItemText,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function ItemSimilarListings(props){
  const [relatedItems, setRelatedItems] = useState()
  useEffect(()=> {
    const getSimilar = async () => {
      const data = await fetch("/api/filter", {
        method: "POST",
        body: JSON.stringify({type: props.item.type})
    })
    const newItems = await data.json()
    setRelatedItems(newItems)
    }
    getSimilar()
  }, [props.item.type])
    return(
        <Box>
        <ListItemButton>
          <ListItemText
            sx={{ fontWeight: 700 }}
            primary="Deals On Similar Listings"
          />
          <Box sx={{ display: "flex", alignItems: "center", color: "blue" }}>
            SEE MORE
            <ArrowForwardIosIcon fontSize="small"/>
          </Box>
        </ListItemButton>
        <Box sx={{ padding: "1rem 1rem 1.5rem 1rem" }}>
          <ImageList cols={2} gap={10} rowHeight={365}>
            {relatedItems ? (relatedItems.map((item) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                key={item.id}
                href={`/item/${item.id}`}
              >
                <ImageListItem key={item.id}>
                  <img
                    src={`${item.images[0].url}`}
                    srcSet={`${item.images[0].url}`}
                    alt={item.artist}
                    loading="lazy"
                  />
                  <Box pt={1}>
                    <Divider />
                    <Box
                      sx={{
                        padding: "15px 10px 0 10px",
                        m: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          p: 0,
                          m: 0,
                          fontWeight: "bold",
                          lineHeight: "10px",
                        }}
                        gutterBottom
                      >
                        {item.artist}
                      </Typography>
                      <Box m={0} p={0} fontWeight="bold">
                        {"4in"}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        padding: "0px 10px",
                        m: 0,
                      }}
                    >
                      <Box
                        sx={{
                          padding: "4px 0",
                          fontSize: "14px",
                        }}
                      >
                        {
                          [
                            "Glowing Dragon",
                            "The Rasta Swirl",
                            "The Crystal Skull",
                            "The Rainbow Sherbet",
                          ][Math.floor(Math.random() * 4)]
                        }
                      </Box>
                      <Box sx={{ fontWeight: "bold", pb: 2, fontSize: "14px" }}>
                        ${Math.floor(Math.random() * 1000) + 1}
                      </Box>
                    </Box>
                  </Box>
                </ImageListItem>
              </Link>
            ))) : <></>}
          </ImageList>
        </Box>
      </Box>
    )
}