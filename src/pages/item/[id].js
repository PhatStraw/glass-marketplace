import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
import getStripe from "../../utils/get-stripe";
import { fetchPostJSON } from "../../utils/api-helpers";
import BottomNav from "components/components/BottomNav";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const ItemPage = ({ item }) => {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  console.log("item",item)
  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a Checkout Session.
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: item.price,
      name: item.title,
      shipping: item.shipping,
      itemId: item.id,
      accountId: item.accountId || "acct_1MzP7vPGe7Lw3Ty8",
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };
  return (
    <>
      {isLoading || !item ? (
        <Box pt={7}>Loading...</Box>
      ) : (
        <Box sx={{ padding: "4rem 1rem 0 1rem", minHeight: "100vh" }}>
          <ItemSwipe images={item.images} />
          <ItemDescription item={item} />
          <ItemDetails
            handleClick={handleClick}
            open={open}
            type={item.type}
            color={item.color}
            condition={item.condition}
            description={item.content}
          />
          <ItemSimilarListings item={item} />
          <BottomNav one="PURCHASE" two="MESSAGE" owner={item.userId} handleSubmit={handleSubmit} />
        </Box>
      )}
    </>
  );
};

export default ItemPage;

export async function getStaticPaths() {
  // Fetch the list of item IDs from your API or database
  const items = await prisma.item.findMany();
  // Map the item IDs to an array of objects with the `params` key
  const paths = items.map((item) => ({ params: { id: item.id.toString() } }));

  return {
    paths,
    fallback: false, // or 'blocking' or 'true'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const data = await prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      favbyuser: true,
    },
  });
  const newItem = JSON.parse(JSON.stringify(data));

  return {
    props: {
      item: newItem,
    },
  };
}
