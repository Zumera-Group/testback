/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from 'next-sanity';
import { sanityConfig } from './config';

export const sanityClient = createClient(sanityConfig);
export const sanityClientForPreview = createClient({
  ...sanityConfig,
  useCdn: false,
  withCredentials: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN_PREVIEW,
});

export const getClient = (usePreview) =>
  usePreview ? sanityClientForPreview : sanityClient;
