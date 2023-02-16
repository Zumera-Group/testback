/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
// import { createClient } from 'next-sanity';
// import { sanityConfig } from './config';
//
// export const sanityClient = createClient(sanityConfig);
// export const sanityClientForPreview = createClient({
//   ...sanityConfig,
//   useCdn: false,
//   withCredentials: true,
//   token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN_PREVIEW,
// });
//
// export const getClient = (usePreview) =>
//   usePreview ? sanityClientForPreview : sanityClient;

import { createClient, groq } from 'next-sanity';
import { cache } from 'react';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false, // if you're using ISR or only static generation at build time then you can set this to `false` to
  // guarantee no stale content
});

// Wrap the cache function in a way that reuses the TypeScript definitions
// export const clientFetch = cache(client.fetch.bind(client));

// Now use it just like before, fully deduped, cached and optimized by react
// @ts-ignore
// const data = await clientFetch(groq`*[]`);
// You can use the same generics as ebfore
// @ts-ignore
// const total = await clientFetch<number>(groq`count*()`);
