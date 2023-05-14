"use client";
import React, { Component } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@mui/material";
export default function CloudinaryUploadWidget(props) {
  return (
    <CldUploadWidget
      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      uploadPreset="grails"
      onUpload={(response) => props.setImages([...props.images,response.info.secure_url])}
      onError={(error) => console.error(error)}
    >
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        }
        return (
          <Button
            sx={{
              padding: "15px",
              fontWeight: "bold",
              background: "black",
              color: "white!important",
            }}
            onClick={handleOnClick}
          >
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
