import {
    Box,
    Divider,
    Typography,
    ImageList,
    ImageListItem,
  } from "@mui/material";
  import { useRouter } from 'next/router'
  import Link from "next/link";
  import React, { useEffect } from "react";
  
  export default function ListingsPage() {
    const [listings, setListings] = React.useState([])
    const router = useRouter()
    const { email } = router.query
    useEffect(()=>{
        const getListings = async ()=>{
            const response = await fetch("/api/get-listings", {
              method: "POST",
              body: JSON.stringify({email})
            })
            const data = await response.json()
            setListings(data)
        }
        getListings()
    }, [email])
    return (
      <Box pt={4}>
        <Box pt={4} display="flex" flexDirection="column">
          <Typography
            variant="h6"
            pt={2}
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Your Items
          </Typography>
          <Typography
            variant="div"
            pt={2}
            pb={4}
            sx={{ fontWeight: "bold", textAlign: "center", color: "grey" }}
          >
            Below are the items you have posted for sale.
          </Typography>
          <Divider />
          <ImageList cols={2} gap={10} sx={{padding: '1rem'}} rowHeight={365}>
            {listings[0]?(listings.map((item) => (
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
            ))): <>No Listings Found</>}
          </ImageList>
        </Box>
      </Box>
    );
  }
  