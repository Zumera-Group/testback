import { PreviewSuspense } from 'next-sanity/preview';
import { lazy } from 'react';
import { DocumentsCount, query } from 'components/DocumentsCount';
import { client } from 'lib/sanity.client';

const PreviewDocumentsCount = lazy(
  () => import('components/PreviewDocumentCount'),
);

export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  const data = await client.fetch(query);

  return { props: { preview, data } };
};

export default function IndexPage({ preview, data }) {
  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewDocumentsCount />
      </PreviewSuspense>
    );
  }

  return <DocumentsCount data={data} />;
}
