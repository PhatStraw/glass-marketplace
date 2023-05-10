import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { SearchBox, Hits } from 'react-instantsearch-hooks-web';
import { Autocomplete } from "./Autocomplete";

function ResponsiveAppBar() {
  const [clicked, setClicked] = React.useState()
  const [liveUser, setLiveUser] = React.useState()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { isSignedIn, user } = useUser();
  React.useEffect(()=> {
    const getUser = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress}),
      });
      const data = await response.json();
      setLiveUser(data)
    }
    if(user){
      getUser()
    }
  }, [user, liveUser])
  const router = useRouter();
  const { signOut } = useClerk();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function Hit({ hit }) {
    return (
      <article>
        <p>{hit.categories[0]}</p>
        <h6>{hit.name}</h6>
        <p>${hit.price}</p>
      </article>
    );
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {liveUser ? (
          <ListItem disablePadding sx={{ fontWeight: "700" }}>
            <Link
              href={"/account"}
              style={{
                textDecoration: "none",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              <ListItemButton sx={{ fontWeight: "700" }}>
                <ListItemText primary={"ACCOUNT"} />
              </ListItemButton>
            </Link>
          </ListItem>
        ) : (
          <></>
        )}
        {["sell", "shop"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ fontWeight: "700" }}>
            <Link
              href={`/${text}`}
              style={{
                textDecoration: "none",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              <ListItemButton sx={{ fontWeight: "700" }}>
                <ListItemText primary={text.toUpperCase()} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
                <ListItem disablePadding sx={{ fontWeight: "700" }}>
          {liveUser ? (
            <Link
              href={`/purchases/${liveUser.id}`}
              style={{
                textDecoration: "none",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              <ListItemButton sx={{ fontWeight: "700" }}>
                <ListItemText primary={"purchases".toUpperCase()} />
              </ListItemButton>
            </Link>
          ) : (
            <></>
          )}
        </ListItem>
        <ListItem disablePadding sx={{ fontWeight: "700" }}>
          {liveUser ? (
            <Link
              href={`/listings/${liveUser.id}`}
              style={{
                textDecoration: "none",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              <ListItemButton sx={{ fontWeight: "700" }}>
                <ListItemText primary={"Your Listings".toUpperCase()} />
              </ListItemButton>
            </Link>
          ) : (
            <></>
          )}
        </ListItem>
        <ListItem disablePadding sx={{ fontWeight: "700" }}>
          {liveUser ? (
            <ListItemButton
              sx={{
                fontWeight: "700",
                textDecoration: "none",
                padding: ".5rem 0 0 1rem",
                margin: 0,
                color: "black",
              }}
              onClick={() => {
                router.push("/");
                return signOut();
              }}
            >
              <ListItemText primary={"logout".toUpperCase()} />
            </ListItemButton>
          ) : (
            <Link
              href={`/sign-in`}
              style={{
                textDecoration: "none",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              <ListItemButton sx={{ fontWeight: "700" }}>
                <ListItemText primary={"Sign-in".toUpperCase()} />
              </ListItemButton>
            </Link>
          )}
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    border: "solid black",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    width: "100%",
    minWidth: "30%",
    margin: "0",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <AppBar
      position="static"
      style={{
        background: "white",
        color: "black",
        position: "fixed",
        top: 0,
        zIndex: 9999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyItems: "space-between" }}
          disableGutters
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              pr: 6,
              display: { xs: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              maxWidth: "10rem",
            }}
          >
            Headies
          </Typography>

          <Box sx={{
                      padding: 0,
                      margin: 0
                    }}>
                      <Autocomplete
                          placeholder="Search products"
                          detachedMediaQuery="none"
                           openOnFocus
                      />
                      {/* <Hits hitComponent={Hit} /> */}
                      <div id="autocomplete"></div>
                    </Box>
          

          <Box
            sx={{
              display: "flex",
              minWidth: "25%",
              p: 0,
              m: 0,
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {liveUser ? (
              <Link
                href={`/myfavs/${liveUser.id}`}
                sx={{ border: "none" }}
              >
                <Button
                  key="favorites"
                  sx={{
                    border: "none",
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <FavoriteIcon />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button
                  key="login"
                  sx={{
                    border: "none",
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  SIGN IN
                </Button>
              </Link>
            )}

            <Tooltip title="Open settings">
              <IconButton
                onClick={toggleDrawer("left", true)}
                sx={{ p: 0, color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              sx={{ zIndex: 10000 }}
            >
              {list("left")}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
