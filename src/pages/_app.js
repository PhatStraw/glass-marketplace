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

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ["/","/shop", "/sign-in"];

// pages/_app.js
import { Kanit } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const roboto = Kanit({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  return (
    <main className={roboto.className}>
      <ClerkProvider
        {...pageProps}
        frontendApi="sk_test_OsJ2RpjBOYssqGqs48HiBl4GrSMxvsWE2eO69nXuxe"
        publishableKey="pk_test_aGVscGZ1bC1hcGhpZC02LmNsZXJrLmFjY291bnRzLmRldiQ"
        signInUrl="/sign-in"
        signOutUrl="/"
        signUpUrl="/sign-up"
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
    </main>
  );
}
