/* eslint-disable @next/next/no-css-tags */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Script from 'next/script';

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
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_COOKIE_FIRST_KEY &&
          <Script
            // strategy="worker"
            strategy="beforeInteractive"
            src="https://consent.cookiefirst.com/banner.js"
            data-cookiefirst-key={process.env.NEXT_PUBLIC_COOKIE_FIRST_KEY}
          />
          }
        </body>
      </Html>
    );
  }
}
