import {
  Box,
  Divider,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { prisma } from "../../utils/prisma-helper"

export default function FavsPage({ favs }) {
  return (
    <Box pt={4}>
      <Box pt={4} display="flex" flexDirection="column">
        <Typography
          variant="h6"
          pt={2}
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Favorites
        </Typography>
        <Typography
          variant="div"
          pt={2}
          pb={4}
          sx={{ fontWeight: "bold", textAlign: "center", color: "grey" }}
        >
          Below are the items you have favorited.
        </Typography>
        <Divider />
        <ImageList cols={2} gap={10} sx={{ padding: "1rem" }} rowHeight={365}>
          {favs ? (
            favs.map((item) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                key={item.id}
                href={`/item/${item.id}`}
              >
                <ImageListItem key={item.images[0].url}>
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
                          fontSize: "12px",
                          fontWeight: "bold",
                          lineHeight: "10px",
                        }}
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
                        {item.title}
                      </Box>
                      <Typography
                        sx={{ fontWeight: "bold", pb: 2, fontSize: "13px" }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                  </Box>
                </ImageListItem>
              </Link>
            ))
          ) : (
            <>No Favs Found</>
          )}
        </ImageList>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  // Fetch the list of item IDs from your API or database
  const users = await prisma.user.findMany();
  // Map the item IDs to an array of objects with the `params` key
  const paths = users.map((user) => ({ params: { id: user.id.toString() } }));

  return {
    paths,
    fallback: false, // or 'blocking' or 'true'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  const favoritedItems = await prisma.item.findMany({
    where: {
      favbyuser: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      images: true,
    },
  });
  const favItems = JSON.parse(JSON.stringify(favoritedItems));
  return {
    props: {
      favs: favItems,
    },
  };
}
