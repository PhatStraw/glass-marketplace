import React, { useState } from 'react';
import FormData from 'form-data';
import { Box, Typography } from '@mui/material'
import HeroSection from '../components/Hero';
import HomeCard from '../components/CuratedCard';
import SalesCard from '../components/SalesCard';
import { useUser } from '@clerk/nextjs';

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleFileChange = (event) => {
    console.log('event', event.target.files)
    setSelectedFiles(event.target.files);
  };

  const handleTitleChange = (event) => {
    event.preventDefault()
    setSelectedTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    event.preventDefault()
    setSelectedContent(event.target.value);
  };

  const handleArtistChange = (event) => {
    event.preventDefault()
    setSelectedArtist(event.target.value);
  };

  const handleSubjectChange = (event) => {
    event.preventDefault()
    setSelectedSubject(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    formData.append('image', selectedFiles[0]);
    formData.append('title', selectedTitle)
    formData.append('artist', selectedArtist)
    formData.append('subject', selectedSubject)
    formData.append('content', selectedContent)
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };
    // Use the useUser hook to get the Clerk.user object
    const { isLoaded, isSignedIn, user } = useUser()
  console.log('USER', user)

  return (
    <Box>
      <HeroSection />
      <HomeCard />
      <Box p={1}>
      <Typography m={1} sx={{fontSize: '18px', p: 1, fontWeight: 'bold'}} gutterBottom>
        Sales & Featured Collections
      </Typography>
      <SalesCard />
      <SalesCard />
      </Box>
    </Box>
    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="title" multiple onChange={handleTitleChange} />
    //   <input type="text" name="content" multiple onChange={handleContentChange} />
    //   <input type="text" name="artist" multiple onChange={handleArtistChange} />
    //   <input type="text" name="subject" multiple onChange={handleSubjectChange} />
    //   <input type="file" name="images" multiple onChange={handleFileChange} />
    //   <button type="submit">Upload Images</button>
    // </form>
  );
};
