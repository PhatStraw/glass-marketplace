import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import Checkbox from "@mui/material/Checkbox";
import WaterIcon from "@mui/icons-material/Water";
import PaletteIcon from "@mui/icons-material/Palette";

export default function ItemFilter(props) {
  console.log(props.staticFilter)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [filters, setFilters] = React.useState();
  const doThis = async (newFilter) => {
    setFilters(...filters, newFilter);
  };
  const uniqueArtists = Array.from(
    new Set(props.itemData.map((item) => item.artist))
  );
  const handleToggle = (value) => {
    props.setFilter({...props.filters, ...value })
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    console.log("FILTERSSSS",props.filter);

    setChecked(!checked);
  };
  const handleClick = (e) => {
    setOpen(!open);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
        mb: 2,
        padding: "0 20px",
      }}
      id="navbar"
    >
      <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} gutterBottom>
        {props.le} Listings
      </Typography>
      <Button
        sx={{ background: "black", color: "white" }}
        onClick={toggleDrawer("left", true)}
      >
        FILTER
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        sx={{ zIndex: 10000 }}
      >
        <List sx={{ zIndex: 10000, width: "80vw" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FireplaceIcon />
            </ListItemIcon>
            <ListItemText primary="Artist" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {props.staticFilter.map((i) => (
            <Collapse in={open} key={i.artist} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleToggle({artist: i.artist})}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={i.artist} />
                </ListItemButton>
              </List>
            </Collapse>
          ))}
        </List>
        <List sx={{ zIndex: 10000, width: "80vw" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <WaterIcon />
            </ListItemIcon>
            <ListItemText primary="Function" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleToggle}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary="Recycler" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <List sx={{ zIndex: 10000, width: "80vw" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Color" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleToggle}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary="Red" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={handleToggle}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary="Blue" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={handleToggle}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary="Green" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Button
          sx={{
            width: "80%",
            bottom: 0,
            top: "auto",
            background: "blue",
            color: "white",
            position: "fixed",
          }}
          onClick={() => props.onSubmit()}
        >
          Search
        </Button>
      </Drawer>
    </Box>
  );
}
