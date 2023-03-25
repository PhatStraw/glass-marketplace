import Layout from 'components/components/layout'
import { StyledEngineProvider } from '@mui/material/styles';
import 'components/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </StyledEngineProvider>

  )
}
