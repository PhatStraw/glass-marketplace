import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

const user1 = {
  name: "John Doe",
  username: "johndoe123",
  avatarUrl: "https://picsum.photos/300",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = await fetch("/api/billing", {
    method: "POST",
  });
  const session = await data.json();
  window.location.href = session.url;
};

export default function Account() {
    const {isSignedin, user} = useUser()
    const { signOut } = useClerk();
    console.log('account',user)
  return (
    <Box pt={10} container spacing={3}>
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
          <AvatarStyled alt={user.username ? user.username : user.fullName} src={user.profileImageUrl} />
        </Box>
        <Box>
          <Typography variant="subtitle1">{user.username ? user.username : user.fullName}</Typography>
          <Typography variant="body1">{user1.bio}</Typography>
        </Box>
        <Box m="auto">
          <ArrowRightIcon />
        </Box>
      </Box>
      <Box item xs={12} md={8}>
        <Box my={2}>
          <Box>
            <Link
              href="/profile"
              style={{
                display: "flex",
                margin: "1rem 1rem 0 1rem",
                textDecoration: "none",
                color: "black",
              }}
            >
              <ListItemText primary="Settings" />
              <ArrowRightIcon />
            </Link>
            <ListItemButton onClick={handleSubmit}>
              <ListItemText primary="Payments" />
              <ArrowRightIcon />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Purchases" />
              <ArrowRightIcon />
            </ListItemButton>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", margin: "1rem 0 0 1rem" }}>
              Help
            </Typography>
            <Link
              href="mailto:kevindsims1@gmail.com"
              style={{
                display: "flex",
                margin: "1rem 1rem 0 1rem",
                textDecoration: "none",
                color: "black",
              }}
            >
              <ListItemText primary="Contact Us" />
              <ArrowRightIcon />
            </Link>
            <ListItemButton>
              <ListItemText primary="About" />
              <ArrowRightIcon />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Authenticity and Protection" />
              <ArrowRightIcon />
            </ListItemButton>
          </Box>
          <Box>
            <ListItemButton onClick={() => signOut()}>
              <ListItemText primary="Sign Out" sx={{ color: "red" }} />
            </ListItemButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
