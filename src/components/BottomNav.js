import React from "react";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function BottomNav(props) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "10%",
        display: "flex",
        alignItems: "center",
        zIndex: 10000,
        justifyContent: "space-evenly",
      }}
      elevation={3}
    >
      <Button
        value="Recents"
        sx={{
          padding: "15px",
          width: "45%",
          fontWeight: "bold",
          background: "black",
          color: "white!important",
        }}
        onClick={props.handleSubmit}
      >
        {props.one}
      </Button>
      {props.two ? (
        <Button
          value="Recents"
          sx={{
            padding: "15px",
            width: "45%",
            fontWeight: "bold",
            color: "black",
            border: "solid black",
          }}
        >
          {props.two}
        </Button>
      ) : (
        <></>
      )}
    </Paper>
  );
}
