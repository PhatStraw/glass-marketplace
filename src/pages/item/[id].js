import { useRouter } from "next/router";
import React from "react";
import { Box, Button } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import ItemDescription from "../../components/itemDescriptions";
import ItemSwipe from "../../components/itemSwipes";
import ItemDetails from "../../components/itemDetail";
import ItemSimilarListings from "../../components/itemSimilarListing";
import getStripe from '../../utils/get-stripe'
import { fetchPostJSON } from '../../utils/api-helpers'
import BottomNav from "components/components/BottomNav";

const itemData = [
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_6935_580x@2x.jpg?v=1670198543",
    artist: "Darby Holmes",
    author: "@bkristastucchio",
  },
  {
    id: "12",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7447_66f4c446-cb3b-44a2-9311-1e8c97084970_580x@2x.jpg?v=1672014458",
    artist: "Eushene",
    author: "@rollelflex_graphy726",
  },
  {
    id: "13",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7463_7e6179f1-cecb-4420-a93c-1039149efe17_580x@2x.jpg?v=1672014745",
    artist: "Earl Jr",
    author: "@helloimnik",
  },
  {
    id: "14",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3766_580x@2x.jpg?v=1662672077",
    artist: "Immaculate",
    author: "@nolanissac",
  },
  {
    id: "15",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3744_580x@2x.jpg?v=1662670866",
    artist: "Nitro",
    author: "@hjrc33",
  },
  {
    id: "16",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3753_580x@2x.jpg?v=1662670678",
    artist: "Elbo",
    author: "@arwinneil",
  },
  {
    id: "17",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_6935_580x@2x.jpg?v=1670198543",
    artist: "Darby Holmes",
    author: "@bkristastucchio",
  },
  {
    id: "18",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7447_66f4c446-cb3b-44a2-9311-1e8c97084970_580x@2x.jpg?v=1672014458",
    artist: "Eushene",
    author: "@rollelflex_graphy726",
  },
  {
    id: "19",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7463_7e6179f1-cecb-4420-a93c-1039149efe17_580x@2x.jpg?v=1672014745",
    artist: "Earl Jr",
    author: "@helloimnik",
  },
  {
    id: "20",
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
    id: "21",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3753_580x@2x.jpg?v=1662670678",
    artist: "Elbo",
    author: "@arwinneil",
  },
  {
    id: "31",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_6935_580x@2x.jpg?v=1670198543",
    artist: "Darby Holmes",
    author: "@bkristastucchio",
  },
  {
    id: "41",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7447_66f4c446-cb3b-44a2-9311-1e8c97084970_580x@2x.jpg?v=1672014458",
    artist: "Eushene",
    author: "@rollelflex_graphy726",
  },
  {
    id: "51",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7463_7e6179f1-cecb-4420-a93c-1039149efe17_580x@2x.jpg?v=1672014745",
    artist: "Earl Jr",
    author: "@helloimnik",
  },
  {
    id: "61",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3766_580x@2x.jpg?v=1662672077",
    artist: "Immaculate",
    author: "@nolanissac",
  },
  {
    id: "616",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3744_580x@2x.jpg?v=1662670866",
    artist: "Nitro",
    author: "@hjrc33",
  },
  {
    id: "661",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_3753_580x@2x.jpg?v=1662670678",
    artist: "Elbo",
    author: "@arwinneil",
  },
  {
    id: "617",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_6935_580x@2x.jpg?v=1670198543",
    artist: "Darby Holmes",
    author: "@bkristastucchio",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7447_66f4c446-cb3b-44a2-9311-1e8c97084970_580x@2x.jpg?v=1672014458",
    artist: "Eushene",
    author: "@rollelflex_graphy726",
  },
  {
    id: "1",
    img: "https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_7463_7e6179f1-cecb-4420-a93c-1039149efe17_580x@2x.jpg?v=1672014745",
    artist: "Earl Jr",
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

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: 345,
      name: 'Darby Glass'
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
  }
  return (
    <Box sx={{ padding: "4rem 1rem 0 1rem", minHeight: "100vh" }}>
      <ItemSwipe />
      <ItemDescription />
      <ItemDetails handleClick={handleClick} open={open} />
      <ItemSimilarListings itemData={itemData} />
      <BottomNav one="PURCHASE" two="OFFER" handleSubmit={handleSubmit}/>
    </Box>
  );
};

export default ItemPage;
