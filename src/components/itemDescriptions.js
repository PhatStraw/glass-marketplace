import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useUser } from "@clerk/nextjs";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";

export default function ItemDescription({ item }) {
  const { user } = useUser();
  const [fav, setFav] = React.useState(
    item.favbyuser.map((i) => {
      if (i.email === user.primaryEmailAddress.emailAddress) {
        return true;
      }
    })
  );
  const [total, setTotal] = React.useState(item.likes);
  
  const handleFav = () => {
    const changeFav = async () => {
      const response = await fetch("/api/update-item", {
        method: "POST",
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress,
          itemId: item.id,
        }),
      });
      const data = await response.json();
      if (data.like) {
        setTotal(total + 1);
      } else {
        setTotal(total - 1);
      }
    };
    changeFav();
    setFav(!fav);
  };
  return (
    <Box pt={1}>
      <Box
        sx={{
          padding: "10px 10px 0 10px",
          m: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          lineHeight: "5px",
        }}
      >
        <Box>
          <Typography
            sx={{
              p: 0,
              m: 0,
              mt: 2,
              fontWeight: "bold",
              fontSize: "16px",
            }}
            gutterBottom
          >
            {item.artist}
          </Typography>
          <Box
            sx={{
              margin: "16px 0 0 0",
              fontSize: "16px",
            }}
          >
            {item.title}
          </Box>
          <Typography style={{ fontWeight: "300", marginTop: "1rem" }}>
            Size: {item.size ? item.size : "4in"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 0,
            m: 0,
          }}
        >
          <Checkbox
            size="medium"
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            fontWeight="bold"
            checked={fav}
            onChange={(event) => handleFav()}
          />
          <Typography fontWeight="bold" fontSize={14}>
            {total}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "0px 10px",
          m: 0,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mt: 2, fontSize: "22px" }}
        >
          ${item.price}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "300", mt: 1, pb: 2, fontSize: "12px" }}
        >
          + ${item.shipping} shipping - United States
        </Typography>
      </Box>
    </Box>
  );
}
