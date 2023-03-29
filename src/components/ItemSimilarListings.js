import React from 'react'
import { useRouter } from "next/router";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  ImageList,
  ImageListItem,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ItemSimilarListings(props){
    return(
        <Box>
        <ListItemButton>
          <ListItemText
            sx={{ fontWeight: 700 }}
            primary="Deals On Similar Listings"
          />
          <Box sx={{ display: "flex", alignItems: "center", color: "blue" }}>
            SEE MORE
            <ExpandMore />
          </Box>
        </ListItemButton>
        <Box sx={{ padding: "1rem 1rem 1.5rem 1rem" }}>
          <ImageList cols={2} gap={10} rowHeight={365}>
            {props.itemData.map((item) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                key={item.id}
                href={`/item/${item.id}`}
              >
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                          padding: "8px 0",
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
            ))}
          </ImageList>
        </Box>
      </Box>
    )
}