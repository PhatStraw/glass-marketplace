import * as React from "react";
import { useEffect, useCallback } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import Link from 'next/link';
import ItemFilter from "./filter";

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
              <Link style={{ textDecoration: 'none', color: 'black' }} key={item.id} href={`/item/${item.id}`}>
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
                        sx={{ p: 0, m: 0, fontSize: '12px', fontWeight: "bold", lineHeight: "10px" }}
                        gutterBottom
                    >
                        {item.artist.toUpperCase()}
                    </Typography>
                    <Box m={0} p={0} fontSize={12} fontWeight="bold">
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
                        fontSize: "12px",
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
                    <Typography sx={{ fontWeight: 'bold', pb: 2, fontSize: "13px" }}>
                        ${Math.floor(Math.random() * 1000) + 1}
                    </Typography>
                    </Box>
                </Box>
                </ImageListItem>
              </Link>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
