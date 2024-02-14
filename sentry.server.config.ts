// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://6465bea9c606d113e59738485c03c970@o4506716552495104.ingest.sentry.io/4506716611608576',
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'heroku-production',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}