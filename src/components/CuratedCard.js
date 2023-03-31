import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Image } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const itemData = [
  {
      id: "617",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPbYwxrqkmR88ucL7hd8-L6BPlnfRRxGslb0ksvOLlQ&usqp=CAU&ec=48665701",
    artist: "Darby Holmes",
    author: "@bkristastucchio",
  },
  {
      id: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7LszS253vG32i6xGbxuhXTDbAEE8YUBzAdgXbI5R_Q&usqp=CAU&ec=48665701",
    artist: "Eushene",
    author: "@rollelflex_graphy726",
  },
  {
      id: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfnjVd3VZKSUHvsHWKPFwQ9XAVabFOxcT8xIH2LyCxw&usqp=CAU&ec=48665701",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
      id: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBxmmnKRsLp1ed9Hfwu3-6Pi82f8LnHMTMDeJpESEqQ&usqp=CAU&ec=48665701",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
      id: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqp5boV7FerSQMNZOIc9SKhHWB8dRWVNYIieCpYLy3U7lBfkepEgDFAQIV1n1z4n02utv1SaY2bcs&usqp=CAU&ec=48665701",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
      id: "1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3460XQ0ZrqLiM1_rCFtK05YbNe_67ZqCske595Tm80Hip2GTZAS0JhtMVk3LHQKcFGJMYftmf9n4&usqp=CAU&ec=48665701",
    artist: "Honey",
    author: "@arwinneil",
  },
];

export default function HomeCard() {
  return (
    <Box sx={{padding: '1rem 1rem 1.5rem 1rem'}}>
      <Typography sx={{fontSize: '18px', p: 1, fontWeight: 'bold'}} gutterBottom>
        Featured Artist
      </Typography>
      <ImageList cols={3} gap={16} rowHeight={200}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.artist}
              position="below"
              sx={{ textAlign: "center" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
