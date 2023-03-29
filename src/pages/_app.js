import Layout from '../components/layout'
import { StyledEngineProvider } from '@mui/material/styles';
import { ClerkProvider, SignUp } from '@clerk/nextjs';
import '../styles/globals.css'
// pages/_app.js
import { Roboto } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
    <ClerkProvider {...pageProps}
      frontendApi='sk_test_OsJ2RpjBOYssqGqs48HiBl4GrSMxvsWE2eO69nXuxe'
      publishableKey='pk_test_aGVscGZ1bC1hcGhpZC02LmNsZXJrLmFjY291bnRzLmRldiQ'
      signInUrl="/sign-in"
      signOutUrl="/"
      signUpUrl="/sign-up"
    >
      <StyledEngineProvider injectFirst>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyledEngineProvider>
    </ClerkProvider>

    </main> 
  )
}
