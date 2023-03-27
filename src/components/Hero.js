import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import dodo from '../../public/dab.jpg'

function HeroSection() {
    const HeroContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        minHeight: '65vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.60)), url(${dodo.src}) center`,
        padding: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }));

      const HeroText = styled('div')(({ theme }) => ({
        maxWidth: 600,
        marginRight: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
          marginBottom: theme.spacing(5),
          textAlign: 'center',
        },
      }));

      const HeroButton = styled(Button)(({ theme }) => ({
        marginTop: theme.spacing(2),
        color: 'white',
        border: 'solid white'
      }));

  return (
    <HeroContainer maxWidth="lg" >
      <HeroText>
        <Typography variant="h5" sx={{padding: '7rem 0 0 0', fontWeight: 'bold'} } gutterBottom>
          THE PLATFORM FOR HEADY GLASS
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: '18px', padding: '.5rem 0'}} gutterBottom>
            Buy, sell, discover authenticated pieces from the worlds top artist.
        </Typography>
        <Link href='/shop'>
          <HeroButton variant="outlined" sx={{textDecoration: 'none'}}>
            Shop Glass
          </HeroButton>
        </Link>
      </HeroText>
    </HeroContainer>
  );
}

export default HeroSection;