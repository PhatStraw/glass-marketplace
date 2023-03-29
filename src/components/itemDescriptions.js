import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";

export default function ItemDescription() {
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
            Cookie
          </Typography>
          <Box
            sx={{
              margin: "16px 0 0 0",
              fontSize: "16px",
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
          <Typography style={{ fontWeight: "300", marginTop: "1rem" }}>
            Size: 4in
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
          />
          <Typography fontWeight="bold" fontSize={14}>
            1
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
          ${Math.floor(Math.random() * 1000) + 1}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "300", mt: 1, pb: 2, fontSize: "12px" }}
        >
          + $30 shipping - United States
        </Typography>
      </Box>
    </Box>
  );
}
