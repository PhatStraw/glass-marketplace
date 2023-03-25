import React, { useState } from 'react';
import FormData from 'form-data';
import { Box } from '@mui/material'
import HeroSection from 'components/components/Hero';
import HomeCard from 'components/components/CuratedCard';
import SalesCard from 'components/components/SalesCard';

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

  return (
    <Box>
      <HeroSection />
      <HomeCard />
      <SalesCard />
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
