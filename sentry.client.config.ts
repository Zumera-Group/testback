// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://6465bea9c606d113e59738485c03c970@o4506716552495104.ingest.sentry.io/4506716611608576',
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'heroku-production',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,
    profilesSampleRate: 0.5,
    replaysOnErrorSampleRate: 1,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      Sentry.replayIntegration({
        // Additional Replay configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}
