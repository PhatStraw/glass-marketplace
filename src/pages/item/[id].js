import { useRouter } from "next/router";
import React from "react";
import {
  Box,
} from "@mui/material";
import ItemDescription from "../../components/itemDescriptions"
import ItemSwipe from "../../components/itemSwipes";
import ItemDetails from "../../components/itemDetail"
import ItemSimilarListings from "../../components/itemSimilarListing"

const itemData = [
    {
        id: "1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPbYwxrqkmR88ucL7hd8-L6BPlnfRRxGslb0ksvOLlQ&usqp=CAU&ec=48665701",
      artist: "Darby Holmes",
      author: "@bkristastucchio",
    },
    {
        id: "12",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7LszS253vG32i6xGbxuhXTDbAEE8YUBzAdgXbI5R_Q&usqp=CAU&ec=48665701",
      artist: "Eushene",
      author: "@rollelflex_graphy726",
    },
    {
        id: "13",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfnjVd3VZKSUHvsHWKPFwQ9XAVabFOxcT8xIH2LyCxw&usqp=CAU&ec=48665701",
      artist: "Camera",
      author: "@helloimnik",
    },
    {
        id: "14",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBxmmnKRsLp1ed9Hfwu3-6Pi82f8LnHMTMDeJpESEqQ&usqp=CAU&ec=48665701",
      artist: "Coffee",
      author: "@nolanissac",
    },
    {
        id: "15",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqp5boV7FerSQMNZOIc9SKhHWB8dRWVNYIieCpYLy3U7lBfkepEgDFAQIV1n1z4n02utv1SaY2bcs&usqp=CAU&ec=48665701",
      artist: "Hats",
      author: "@hjrc33",
    },
    {
        id: "16",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3460XQ0ZrqLiM1_rCFtK05YbNe_67ZqCske595Tm80Hip2GTZAS0JhtMVk3LHQKcFGJMYftmf9n4&usqp=CAU&ec=48665701",
      artist: "Honey",
      author: "@arwinneil",
    },
    {
        id: "17",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPbYwxrqkmR88ucL7hd8-L6BPlnfRRxGslb0ksvOLlQ&usqp=CAU&ec=48665701",
      artist: "Darby Holmes",
      author: "@bkristastucchio",
    },
    {
        id: "18",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7LszS253vG32i6xGbxuhXTDbAEE8YUBzAdgXbI5R_Q&usqp=CAU&ec=48665701",
      artist: "Eushene",
      author: "@rollelflex_graphy726",
    },
    {
        id: "19",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfnjVd3VZKSUHvsHWKPFwQ9XAVabFOxcT8xIH2LyCxw&usqp=CAU&ec=48665701",
      artist: "Camera",
      author: "@helloimnik",
    },
    {
        id: "20",
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
        id: "21",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3460XQ0ZrqLiM1_rCFtK05YbNe_67ZqCske595Tm80Hip2GTZAS0JhtMVk3LHQKcFGJMYftmf9n4&usqp=CAU&ec=48665701",
      artist: "Honey",
      author: "@arwinneil",
    },
    {
        id: "31",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPbYwxrqkmR88ucL7hd8-L6BPlnfRRxGslb0ksvOLlQ&usqp=CAU&ec=48665701",
      artist: "Darby Holmes",
      author: "@bkristastucchio",
    },
    {
        id: "41",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7LszS253vG32i6xGbxuhXTDbAEE8YUBzAdgXbI5R_Q&usqp=CAU&ec=48665701",
      artist: "Eushene",
      author: "@rollelflex_graphy726",
    },
    {
        id: "51",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfnjVd3VZKSUHvsHWKPFwQ9XAVabFOxcT8xIH2LyCxw&usqp=CAU&ec=48665701",
      artist: "Camera",
      author: "@helloimnik",
    },
    {
        id: "61",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBxmmnKRsLp1ed9Hfwu3-6Pi82f8LnHMTMDeJpESEqQ&usqp=CAU&ec=48665701",
      artist: "Coffee",
      author: "@nolanissac",
    },
    {
        id: "616",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqp5boV7FerSQMNZOIc9SKhHWB8dRWVNYIieCpYLy3U7lBfkepEgDFAQIV1n1z4n02utv1SaY2bcs&usqp=CAU&ec=48665701",
      artist: "Hats",
      author: "@hjrc33",
    },
    {
        id: "661",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3460XQ0ZrqLiM1_rCFtK05YbNe_67ZqCske595Tm80Hip2GTZAS0JhtMVk3LHQKcFGJMYftmf9n4&usqp=CAU&ec=48665701",
      artist: "Honey",
      author: "@arwinneil",
    },
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
