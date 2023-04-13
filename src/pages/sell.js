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
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [designer, setDesigner] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/upload", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        name,
        description,
        category,
        designer,
        size,
        color,
        condition,
        images,
      }), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    window.location.href = "http://loacalhost:3000";
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
        <TextField
          select
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
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
          value={designer}
          onChange={(event) => setDesigner(event.target.value)}
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
          value={size}
          onChange={(event) => setSize(event.target.value)}
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
          value={color}
          onChange={(event) => setColor(event.target.value)}
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
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
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
      <BottomNav one="PUBLISH" handleSubmit={handleSubmit} />
    </form>
  );
};

export default Sell;
