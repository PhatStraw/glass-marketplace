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

export default function Feed({items, onSubmit,setFilter, filter, staticFilter}) {
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
    <Box pt={2} id="ids">
      <ItemFilter itemData={items} staticFilter={staticFilter} le={items.length} onSubmit={onSubmit} setFilter={setFilter} filter={filter}/>
      <Divider />
      <Box sx={{ padding: "1rem 1rem 1.5rem 1rem" }}>
        <ImageList cols={2} gap={10} rowHeight={365}>
          {items.map((item) => (
              <Link style={{ textDecoration: 'none', color: 'black' }} key={item.id} href={`/item/${item.id}`}>
                <ImageListItem key={item.images[0].url}>
                <img
                    src={`${item.images[0].url}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                        item.title
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
