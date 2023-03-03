/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from 'next-sanity';
import { sanityConfig } from './config';
import * as process from 'process';

export const sanityClient = createClient(sanityConfig);
export const sanityClientForPreview = createClient({
  ...sanityConfig,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  withCredentials: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN_PREVIEW,
});

export const getClient = (usePreview) => {
  return usePreview ? sanityClientForPreview : sanityClient;
};
