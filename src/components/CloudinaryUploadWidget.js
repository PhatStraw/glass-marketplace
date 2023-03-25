'use client'
import React, { Component } from "react";
import { CldUploadWidget } from 'next-cloudinary';
class CloudinaryUploadWidget extends Component {
  componentDidMount() {
  }

  render() {
    return (
        <CldUploadWidget
        cloudName="dcmncwymq"
        signatureEndpoint="/api/sign-cloudinary-params">
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    );
  }
}

export default CloudinaryUploadWidget;
