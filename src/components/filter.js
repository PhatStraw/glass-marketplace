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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [checked, setChecked] = React.useState(false);
  const [checkboxes, setCheckboxes] = React.useState([]);
  const [open, setOpen] = React.useState([]);
  const [filters, setFilters] = React.useState();
  
  const handleChange = (event, index, value) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = event.target.checked;
    setCheckboxes(newCheckboxes);
    if(newCheckboxes[index]){
      console.log(props.filter, value)
      props.setFilter({ ...props.filter, ...value });
    }else{
      const remove = delete props.filter.value
      props.setFilter({...remove})
    }
  };

  const [expandedItem, setExpandedItem] = React.useState(null);

  const handleExpand = (item) => {
    setExpandedItem(item === expandedItem ? null : item);
  };

  const handleClick = (event,index) => {
    const newToggleFilter = [...open];
    newToggleFilter[index] = event.target.checked;
    setOpen(newToggleFilter);
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
        padding: "10px 20px",
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
          <ListItemButton onClick={(e)=> handleExpand(1)}>
            <ListItemIcon>
              <FireplaceIcon />
            </ListItemIcon>
            <ListItemText primary="Artist" />
            {expandedItem === 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {props.staticFilter.map((i, index) => (
            <Collapse in={expandedItem === 1} key={index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      key={index}
                      checked={checkboxes[index] || false}
                      onChange={(event) => handleChange(event, index, { artist: i.artist })}
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
          <ListItemButton onClick={(e)=> handleExpand(2)}>
            <ListItemIcon>
              <WaterIcon />
            </ListItemIcon>
            <ListItemText primary="Function" />
            {expandedItem === 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedItem === 2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} >
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
          <ListItemButton onClick={(e)=> handleExpand(3)}>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Color" />
            {expandedItem === 3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedItem === 3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} >
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
              <ListItemButton sx={{ pl: 4 }} >
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
              <ListItemButton sx={{ pl: 4 }} >
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
