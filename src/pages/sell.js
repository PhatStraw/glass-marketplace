import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
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
  const [price, setPrice] = useState();
  const [stripeBool, setStripeBool] = useState(false);
  const [seller, setSeller] = useState();
  const [shipping, setShipping] = useState();
  const [images, setImages] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const findUser = async () => {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
      });
      const data = await response.json();
      setSeller(data);
      if(data.stripelink !== null){
        setStripeBool(true)
      }
    };
    findUser();
  }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        name,
        description,
        category,
        designer,
        shipping,
        size,
        color,
        condition,
        images,
        email: user.primaryEmailAddress.emailAddress,
      }),
    });
    const data = await response.json();
    setImages([]);
    if (data.data.success) {
      router.push("/");
    } else {
      alert("Something went wrong try again.");
    }
  };

  const handleSell = async () => {
    const response = await fetch("/api/seller-link", {
      method: "POST",
      body: JSON.stringify({accountId: seller.stripeid, email: user.primaryEmailAddress.emailAddress})
    })
    const data = await response.json()
    router.push(data.url)
  }

  const type = [
    {
      value: "TORUS",
      label: "TORUS",
    },
    {
      value: "INCLINE",
      label: "INCLINE",
    },
    {
      value: "RECYCLER",
      label: "RECYLCER",
    },
    {
      value: "NAIL",
      label: "NAIL",
    },
  ];

  const designers = [
    {
      value: "Darby Holms Glass",
      label: "Darby Holms Glass",
    },
    {
      value: "Elbo Glass",
      label: "Elbo Glass",
    },
    {
      value: "Earl Jr Glass",
      label: "Earl Jr Glass",
    },
  ];

  const sizes = ["1in", "2in", "3in", "4in", "5in", "6in", "7in", "8in", "9in"];

  const conditions = ["NEW", "USED"];

  return (
    <>
      {stripeBool ? (
        <form
          onSubmit={handleSubmit}
          style={{ padding: "5rem 2rem 0rem 2rem" }}
        >
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
              {type.map((option) => (
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
              {designers.map((option) => (
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
              {sizes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              {conditions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              {type.map((option) => (
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
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={price}
              onChange={(event) => setPrice(event.target.value)}
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
              SHIPPING
            </Typography>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={shipping}
              onChange={(event) => setShipping(event.target.value)}
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
            <Box display="flex" width="190px">
              {images[0] ? (
                images.map((i) => (
                  <img
                    width="100"
                    height="100"
                    style={{
                      padding: "5px",
                    }}
                    src={i}
                    key={i}
                    alt={i}
                  />
                ))
              ) : (
                <></>
              )}
            </Box>
            <CloudinaryUploadWidget images={images} setImages={setImages} />
          </Box>
          <BottomNav one="PUBLISH" handleSubmit={handleSubmit} />
        </form>
      ) : (
        <Box style={{ paddingTop: "6rem", display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              padding: "15px",
              width: "70%",
              fontWeight: "bold",
              background: "black",
              color: "white!important",
            }}
            onClick={handleSell}
          >
            Click Here to Start Selling
          </Button>
        </Box>
      )}
    </>
  );
};

export default Sell;
