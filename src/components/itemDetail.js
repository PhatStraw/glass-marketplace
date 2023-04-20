import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  ImageList,
  ImageListItem,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
export default function ItemDetails(props){
    return(
        <List>
        <ListItemButton onClick={props.handleClick}>
          <ListItemText sx={{ fontWeight: 700 }} primary="Listing Details" />
          {props.open ? (
            <Box sx={{ display: "flex", alignItems: "center", color: "blue" }}>
              Less
              <ExpandLess />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", color: "blue" }}>
              More
              <ExpandMore />
            </Box>
          )}
        </ListItemButton>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <Box p="0 1rem" mt={1}>
            Color: {props.color}
          </Box>
          <Box p="0 1rem" mt={1}>
            Condition: {props.condition}
          </Box>
          <Box p="0 1rem" mt={1} mb={1}>
            Function: {props.type}
          </Box>
          <Box p="0 1rem" mt={1} mb={1}>
            Description: {props.description}
          </Box>
        </Collapse>
        <Divider pb={3}/>
      </List>
    )
}