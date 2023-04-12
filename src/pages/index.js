import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import { Box, Typography } from '@mui/material'
import HeroSection from '../components/Hero';
import HomeCard from '../components/CuratedCard';
import SalesCard from '../components/SalesCard';
import { useUser } from '@clerk/nextjs';

export default function App() {
  // useEffect(()=>{
  //   const fetchItems = async () => {
    
  //   }
  //   fetchItems()
  // })
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
  );
};

