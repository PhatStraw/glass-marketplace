import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import { Box, Typography } from '@mui/material'
import HeroSection from '../components/Hero';
import HomeCard from '../components/CuratedCard';
import SalesCard from '../components/SalesCard';
import { useUser } from '@clerk/nextjs';

export default function App() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [filter, setFilter] = useState()
  async function onSubmit () {
      const data = await fetch("/api/filter", {
          method: "POST",
          body: JSON.stringify(filter)
      })
      const newItems = await data.json()
  }

  return (
    <Box>
      <HeroSection />
      <HomeCard onSubmit={onSubmit} setFilter={setFilter} filter={filter} />
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

