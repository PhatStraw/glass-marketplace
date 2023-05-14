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
import {
  ClockIcon,
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowUpLeftIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { usePagination, useSearchBox } from "react-instantsearch-hooks";
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import {
  AutocompleteItem,
  AutocompleteItemAction,
} from './AutoCompleteItem';
import '@algolia/autocomplete-theme-classic';
import { Autocomplete } from "./Autocomplete";
const searchClient = algoliasearch(
  'latency',
  '1fcf68140f3db8a1352370a137f5e8d6'
);

import { useRef } from 'react';

export function useLazyRef(initialValue) {
  const ref = useRef(null);

  return function getRef() {
    if (ref.current === null) {
      ref.current = initialValue();
    }

    return ref.current;
  };
}
function ResponsiveAppBar() {
  const [liveUser, setLiveUser] = React.useState()
  const [live, setLive] = React.useState(false)
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
      console.log("DATA-", data)
      setLiveUser(data)
    }
    console.log("USER-", user.primaryEmailAddress.emailAddress)
    if(user){
      getUser()
      console.log("liveUser-", liveUser)
    }
  }, [user])
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

  const getRecentSearchesPlugin = useLazyRef(() =>
    createLocalStorageRecentSearchesPlugin({
      key: 'RECENT_SEARCH',
      limit: 5,
      transformSource({ source, onTapAhead, onRemove }) {
        return {
          ...source,
          templates: {
            item({ item, components }) {
              return (
                <AutocompleteItem
                  router={router}
                  href={`/shop/?query=${item.label}`}
                  icon={ClockIcon}
                  actions={
                    <>
                      <AutocompleteItemAction
                        icon={TrashIcon}
                        title="Remove this search"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();

                          onRemove(item.label);
                        }}
                      />
                    </>
                  }
                >
                  <components.ReverseHighlight hit={item} attribute="label" />
                </AutocompleteItem>
              );
            },
          },
        };
      },
    })
  );
  const getQuerySuggestionsPlugin = useLazyRef(() =>
    createQuerySuggestionsPlugin({
      searchClient,
      indexName: "devcon22_bm_products_query_suggestions",
      transformSource({ source, onTapAhead }) {
        return {
          ...source,
          getItemUrl({ item }) {
            return `/shop/?query=${item.query}`;
          },
          templates: {
            ...source.templates,
            item({ item, components }) {
              return (
                <AutocompleteItem
                  router={router}
                  href={`/shop/?query=${item.query}`}
                  icon={MagnifyingGlassIcon}
                  actions={
                    <Box></Box>
                  }
                >
                  <components.ReverseHighlight hit={item} attribute="query" />
                </AutocompleteItem>
              );
            },
          },
        };
      },
    })
  );
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

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Autocomplete
                    initialState={{
                      query: (router.query.query) || '',
                    }}
                    openOnFocus={true}
                    placeholder="Search"
                    detachedMediaQuery="(width: 100% max-width: 100%)"
                    navigator={{
                      navigate({ itemUrl }) {
                        router.push(itemUrl);
                      },
                    }}
                    onSubmit={({ state }) => {
                      router.push(`/shop/?query=${state.query}`);
                    }}
                    plugins={[
                      getRecentSearchesPlugin(),
                      getQuerySuggestionsPlugin(),
                    ]}
                  />
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
