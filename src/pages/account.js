import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
  Rating,
  Button
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

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


export default function Account() {
  const [liveUser, setLiveUser] = React.useState({})
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch("/api/billing", {
      method: "POST",
      body: JSON.stringify({id: liveUser.stripeid})
    });
    const session = await data.json()
    router.push(session.url)
  };
  React.useEffect(()=> {
    const getUser = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress}),
      });
      const data = await response.json();
      setLiveUser(data)
    }
    getUser()
  },[user])
  return (
    <>
      {user ? (
        <Box pt={10} container spacing={3}>
          <Box
            item
            sx={{ margin: "0 1rem 2rem 1rem" }}
            display="flex"
            justifyItems="space-between"
            onClick={()=> router.push(`/listings/${liveUser.id}`)}
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
                <Link
                  href={`/purchases/${liveUser.id}`}
                  style={{
                    display: "flex",
                    margin: "0.5rem 1rem 0 1rem",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemText primary="Purchases" />
                  <ArrowRightIcon />
                </Link>
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", margin: "1rem 0 0 1rem" }}
                >
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
      ) : (
        <></>
      )}
    </>
  );
}
