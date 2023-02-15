// import // createPortableTextComponent,
// // createPreviewSubscriptionHook,
// // createCurrentUserHook,
// //   definePreview
// 'next-sanity';
// import { sanityConfig } from './config';
import imageUrlBuilder from '@sanity/image-url';
// import { PortableText as PortableTextComponent } from '@portabletext/react';
import { definePreview } from 'next-sanity/preview';
import { projectId, dataset, client } from 'lib/sanity.client';

// Set up the live preview subscription hook
export const usePreview = definePreview({ projectId, dataset });

const builder = imageUrlBuilder(client);

export function sanityImageUrlFor(source) {
  if (!source) return;
  return builder.image(source);
}
