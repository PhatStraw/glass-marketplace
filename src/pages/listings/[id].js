import {
    Box,
    Divider,
    Typography,
    ImageList,
    ImageListItem,
    Rating,
    Button,
  } from "@mui/material";
  import Link from "next/link";
  import {
    Avatar
  } from "@mui/material";
  import React, { useEffect } from "react";
  import ArrowRightIcon from "@mui/icons-material/ArrowRight";
  import { styled } from "@mui/material/styles";
  import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));
  
  export default function ListingsPage({listings, user1}) {
    const { user } = useUser();
    return (
      <Box pt={6}>
        <Box pt={4} display="flex" flexDirection="column">
        <Box
            item
            sx={{ margin: "0 1rem 2rem 1rem" }}
            display="flex"
            justifyItems="space-between"
          >
            <Box
              sx={{ margin: "0 1rem 0 0" }}
              display="flex"
              justifyContent="center"
            >
              <AvatarStyled
                alt={user.username ? user.username : user.fullName}
                src={user.profileImageUrl}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1">
                {user.username ? user.username : user.fullName}
              </Typography>
              <Box sx={{display: "flex"}}>
                <Rating value={"3.5"}/>
                <Typography>5 reviews</Typography>
              </Box>
                <Typography variant="div" style={{maxWidth: '50%'}}>{user.bio}</Typography>
                <Link href={`/chat/${user1.id}`}>
                  <Button>
                    Send a message
                  </Button>
                </Link>
            </Box>
          </Box>
          <Divider />
          <ImageList cols={2} gap={10} sx={{padding: '1rem'}} rowHeight={365}>
            {listings[0]?(listings.map((item) => item.images[0] ? (
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
            ): <></>)): <>No Listings Found</>}
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
    const listingItems = await prisma.item.findMany({
      where: {
        owner: {
          id: user.id
        }
      },
      include: {
        images: true,
      },
    });
    const Items = JSON.parse(JSON.stringify(listingItems));
    const user1 = JSON.parse(JSON.stringify(user));
    return {
      props: {
        listings: Items,
        user1
      },
    };
  }