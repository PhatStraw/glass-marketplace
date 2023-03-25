import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import dodo from '../../public/dab.jpg'
import { styled, alpha } from '@mui/material/styles';

export default function SalesCard() {
    const ImgContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        color: 'white',
background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.60)), url(${dodo.src}) center`,
  
      }));
  return (
    <Card>
    <ImgContainer>
      <Typography variant="h5" sx={{padding: '7rem 0 0 0', fontWeight: 'bold'} } gutterBottom>
          THE PLATFORM FOR HEADY GLASS
        </Typography>

    </ImgContainer>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
