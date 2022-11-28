import {
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';
import { sanityConfig } from './config';
import { sanityClient } from './sanity.server';
import imageUrlBuilder from '@sanity/image-url';

// Set up the live preview subscription hook
export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

export const useCurrentUser = createCurrentUserHook(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function sanityImageUrlFor(source) {
  if (!source) return;
  return builder.image(source);
}
