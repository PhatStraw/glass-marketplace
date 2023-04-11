import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import BottomNav from "components/components/BottomNav";
import CloudinaryUploadWidget from "components/components/CloudinaryUploadWidget";

const Sell = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the uploaded image, name, description, and artist
  };

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <form onSubmit={handleSubmit} style={{ padding: "5rem 2rem 0rem 2rem" }}>
      <Typography
        variant="div"
        noWrap
        sx={{
          flexGrow: 1,
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: ".1rem",
        }}
      >
        Add a new listing
      </Typography>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          DETAILS
        </Typography>
        {/* <Divider/> */}
        <TextField
          select
          label="Category"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Designer"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography
          variant="div"
          sx={{
            flexGrow: 1,
            fontSize: "10px",
            letterSpacing: ".1rem",
          }}
        >
          Please select an artsit from the drop down. Please email us if the
          artist youre trying to add doesnt exist.
        </Typography>
        <TextField
          select
          label="Size"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          ITEM NAME
        </Typography>
        <TextField
          label="Item name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
      </Box>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          COLOR
        </Typography>
        <TextField
          label="Designer color name ex. Frosted Lemonade"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
      </Box>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          CONDITION
        </Typography>
        <TextField
          select
          label="Condition"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          DESCRIPTION
        </Typography>
        <TextField
          multiline
          rows={6}
          label="Add details about the piece"
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box pt={5}>
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          PRICE
        </Typography>
        <OutlinedInput
          value={name}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />
      </Box>
      <Box pt={5} pb={15} display="flex" flexDirection="column">
        <Typography
          variant="div"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: ".1rem",
          }}
        >
          PHOTOS
        </Typography>
        <CloudinaryUploadWidget images={images} setImages={setImages} />
      </Box>
      <BottomNav one="PUBLISH" />
    </form>
  );
};

export default Sell;
