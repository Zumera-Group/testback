import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';

import '../styles/globals.scss';
import localFont from '@next/font/local';
import { IconSprite } from 'components/Icon';
import GlobalAlert from '../components/GlobalAlert/GlobalAlert';
// import BgProgress from "../components/BgProgress/BgProgress";

import dynamic from 'next/dynamic';
const GTMLoader =  dynamic(() => import('../components/GTMLoader'), {ssr: false});

const myFont = localFont({
  // variable:
  display: 'swap',
  src: [
    {
      path: '../public/fonts/Yellix-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Yellix-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Yellix-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const element = document.querySelector('html');
    element.classList.add('mobileLoaded');
  }, []);
  MarketingParamsService.useSaveOnMount();

  const stringData = JSON.parse(
    JSON.stringify(pageProps).replace(/\u2028/g, ''),
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="facebook-domain-verification"
          content="3kbl4d8sim0w6m0lnw9l1tt6pslo75"
        />
      </Head>
      <main className={myFont.className} {...myFont}>
        <Component {...stringData} key={router.pathname} />
      </main>
      <GlobalAlert />
      {/*<BgProgress />*/}
      <Script
        strategy="lazyOnload"
        src="https://assets.calendly.com/assets/external/widget.js"
      />
      <Script strategy="lazyOnload" src="https://cdn.ywxi.net/js/1.js" async />
      <IconSprite />
      <GTMLoader />
    </>
  );
}

export default MyApp;
