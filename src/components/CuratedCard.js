import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Image } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const itemData = [
  {
    id: "617",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_6935_580x@2x.jpg?v=1670198543",
    artist: "Darby Holms Glass",
    author: "@bkristastucchio",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7447_66f4c446-cb3b-44a2-9311-1e8c97084970_580x@2x.jpg?v=1672014458",
    artist: "Elbo Glass",
    author: "@rollelflex_graphy726",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7463_7e6179f1-cecb-4420-a93c-1039149efe17_580x@2x.jpg?v=1672014745",
    artist: "Earl Jr Glass",
    author: "@helloimnik",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3766_580x@2x.jpg?v=1662672077",
    artist: "Immaculate",
    author: "@nolanissac",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3744_580x@2x.jpg?v=1662670866",
    artist: "Nitro",
    author: "@hjrc33",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3753_580x@2x.jpg?v=1662670678",
    artist: "Elbo",
    author: "@arwinneil",
  },
];

export default function HomeCard({ onSubmit, filter, setFilter }) {
  const router = useRouter();
  return (
    <Box sx={{ padding: "1rem 1rem 1.5rem 1rem" }}>
      <Typography
        sx={{ fontSize: "18px", p: 1, fontWeight: "bold" }}
        gutterBottom
      >
        Featured Artist
      </Typography>
      <ImageList cols={3} gap={16} rowHeight={200}>
        {itemData.map((item) => (
          <Link
            key={item.id}
            passHref={router.basePath === "/" ? true : false}
            href={{
              pathname: "/shop",
              query: {
                data: JSON.stringify({ ...filter, artist: item.artist }),
              },
            }}
            style={{
              textDecoration: "none",
              color: "black",
              border: "none",
            }}
          >
            <Box
              onClick={() => {
                setFilter({ ...filter, artist: item.artist });
                onSubmit();
              }}
              key={item.id}
            >
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.artist}
                  position="below"
                  sx={{ textAlign: "center" }}
                />
              </ImageListItem>
            </Box>
          </Link>
        ))}
      </ImageList>
    </Box>
  );
}
