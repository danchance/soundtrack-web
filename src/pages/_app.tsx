import Layout from '@/components/layout';
import '@/styles/globals.sass';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import { Roboto_Flex } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        :root {
          --roboto-font: ${roboto.style.fontFamily};
        }
      `}</style>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
        }}
        // Need Auth0 to ignore code and state params when authenticating with Spotify
        skipRedirectCallback={router.pathname === '/settings'}
      >
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </Auth0Provider>
    </>
  );
};

export default App;
