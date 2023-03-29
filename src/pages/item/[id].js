import { useRouter } from "next/router";
import React from "react";
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
import ItemDescription from "components/components/itemDescription";
import ItemSwipe from "components/components/itemSwipe";
import ItemDetails from "components/components/itemDetails"
import ItemSimilarListings from "components/components/itemSimilarListings"
const itemData = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    id: "12",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    id: "13",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    artist: "Camera",
    author: "@helloimnik",
  },
  {
    id: "14",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    artist: "Coffee",
    author: "@nolanissac",
  },
  {
    id: "15",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    artist: "Hats",
    author: "@hjrc33",
  },
  {
    id: "16",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    artist: "Honey",
    author: "@arwinneil",
  },
  {
    id: "17",
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    artist: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    id: "18",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    artist: "Burger",
    author: "@rollelflex_graphy726",
  },
];

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  console.log("id", id);
  return (
    <Box sx={{ padding: "4rem 1rem 0 1rem", minHeight: "100vh" }}>
        <ItemSwipe />
        <ItemDescription />
        <ItemDetails handleClick={handleClick} open={open}/>
        <ItemSimilarListings itemData={itemData}/>
    </Box>
  );
};

export default ItemPage;
