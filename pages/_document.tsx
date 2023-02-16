/* eslint-disable @next/next/no-css-tags */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document?.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {process.env.NEXT_PUBLIC_USE_NO_INDEX_TAG === 'true' && (
            <meta name="robots" content="noindex" />
          )}
          {/*<link rel="preconnect" href="https://cdn.sanity.io" />*/}
          {/*<link rel="dns-prefetch" href="https://cdn.sanity.io" />*/}
          {/*<link rel="dns-prefetch" href="https://consent.cookiefirst.com" />*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-Bold.woff2"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-BoldItalic.woff2"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-Light.woff2"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-LightItalic.woff2"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-Medium.woff2"*/}
          {/*/>*/}
          {/*<link*/}
          {/*  crossOrigin="anonymous"*/}
          {/*  rel="preload"*/}
          {/*  as="font"*/}
          {/*  type="font/woff2"*/}
          {/*  href="/fonts/Yellix-MediumItalic.woff2"*/}
          {/*/>*/}
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
