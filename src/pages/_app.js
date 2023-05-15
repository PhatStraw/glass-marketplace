import Layout from "../components/layout";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  ClerkProvider,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import "../styles/globals.css";
import { useRouter } from "next/router";
import React from "react";
//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ["/","/shop", "/sign-in", "/item/[id]", "/listings/[email]"];

// pages/_app.js
import { Kanit } from "next/font/google";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import "@algolia/autocomplete-theme-classic";
import 'instantsearch.css/themes/satellite.css';
const searchClient = algoliasearch('Y22DSFGSTV', 'd13ec2902d97cbfbf1df02e11df0ea5d')

// If loading a variable font, you don't need to specify the font weight
const roboto = Kanit({ subsets: ["latin"], weight: "400" });

if (process.window) {
  // intercept and prevent wasteful /_next/data/*.json request until Next.js issue is resolved
  // https://github.com/vercel/next.js/discussions/38414
  // https://github.com/vercel/next.js/issues/40611
  const { fetch: originalFetch } = window;
  const nextDataRequestRegex = /^\/_next\/data\/.*\.json/;
  window.fetch = async (...args) => {
    const [url] = args;
    if (nextDataRequestRegex.test(url)) {
      return Promise.reject();
    }
    return originalFetch(...args);
  };
}

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [uiState, setUiState] = React.useState({});
  const isPublicPage = publicPages.includes(pathname);
  const handleSearchStateChange = searchState => {
    // Access the selected refinements from searchState
    const selectedRefinements = searchState.uiState.dev_headies.refinementList?.["brand"] || [];

    // Do something with the selected refinements
    setUiState(searchState.uiState);
  };
  return (
    <main className={roboto.className}>
      <InstantSearch searchClient={searchClient} indexName="demo_ecommerce" searchState={uiState} onStateChange={handleSearchStateChange}>
      <ClerkProvider
        {...pageProps}
        frontendApi={process.env.NEXT_CLERK_SECRET_KEY}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <StyledEngineProvider injectFirst>
          <Layout>
            {isPublicPage ? (
              <Component {...pageProps} />
            ) : (
              <>
                <SignedIn>
                  <Component {...pageProps} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            )}
          </Layout>
        </StyledEngineProvider>
      </ClerkProvider>
      </InstantSearch>
    </main>
  );
}
