import React from "react";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";

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
          textDecoration: "none",
          background: "black",
          color: "white!important",
        }}
        onClick={props.handleSubmit}
      >
        {props.one}
      </Button>
      {props.two ? (
        <Link 
          href={`/chat/${props.owner}`}
        >
        <Button
          value="Recents"
          sx={{
            padding: "15px",
            minWidth: "170px",
            fontWeight: "bold",
            color: "black",
            border: "solid black",
          }}
        >
          {props.two}
        </Button>
        
        </Link>
      ) : (
        <></>
      )}
    </Paper>
  );
}
