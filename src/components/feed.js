import * as React from "react";
import { useEffect, useCallback } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ItemFilter from "./filter";


const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    artist: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    artist: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    artist: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    artist: "Honey",
    author: "@arwinneil",
  },
];

export default function Feed() {
  const onScroll = useCallback((event) => {
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset >= 1380) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [onScroll]);
  return (
    <Box pt={2}>
      <ItemFilter itemData={itemData} le={itemData.length}/>
      <Divider />
      <Box sx={{ padding: "1rem 1rem 1.5rem 1rem" }}>
        <ImageList cols={2} gap={10} rowHeight={365}>
          {itemData.map((item) => (
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
                    sx={{ p: 0, m: 0, fontWeight: "bold", lineHeight: "10px" }}
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
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
