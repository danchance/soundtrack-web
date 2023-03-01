import Head from 'next/head';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [testData, setTestData] = useState<string>('');

  useEffect(() => {
    const getTestData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
          }
        });
        const testDataUrl = '';
        const response = await fetch(testDataUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const { data } = await response.json();
        setTestData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTestData();
  });

  return (
    <>
      <Head>
        <title>soundTrack</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{testData}</div>
      </main>
    </>
  );
};

export default Home;
