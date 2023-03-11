import Layout from '@/components/layout';
import '@/styles/globals.sass';
import { Auth0Provider } from '@auth0/auth0-react';
import type { AppProps } from 'next/app';
import { Roboto_Flex } from '@next/font/google';

const roboto = Roboto_Flex({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
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
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth0Provider>
    </>
  );
};

export default App;
