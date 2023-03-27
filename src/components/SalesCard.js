import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import dodo from "../../public/dab.jpg";
import { styled, alpha } from "@mui/material/styles";

export default function SalesCard() {
  const ImgContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: "white",
    minHeight: "180px",
    background: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.60)), url(${dodo.src}) center`,
  }));
  const SalesCardButton = styled(Button)(({ theme }) => ({
    color: "blue",
    border: "solid blue",
  }));
  return (
    <Card sx={{ maxHeight: 245, maxWidth: 360, m: "auto auto 2rem auto" }}>
      <ImgContainer>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", m: "auto", p: "auto" }}
          gutterBottom
        >
          Glass Sale: 3/23
        </Typography>
      </ImgContainer>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="div"
          sx={{ fontSize: "14px", fontWeight: "bold" }}
          component="div"
        >
          UP TO 25% OFF
        </Typography>
        <SalesCardButton sx={{ maxHeight: 30, fontSize: '10px', fontWeight: 'bold' }} variant="outlined" size="small">
          SHOP NOW
        </SalesCardButton>
      </CardContent>
    </Card>
  );
}
