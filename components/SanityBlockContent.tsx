import BlockContent from '@sanity/block-content-to-react';
import urlForImage from '@sanity/image-url/lib/types/urlForImage';
import { Button } from 'components/Button';

function ImageRenderer({ node }) {
  // console.log(node);
  return <Button {...node}>{node.title}</Button>;
}

const serializers = {
  types: {
    button: ImageRenderer,
  },
};

export const SanityBlockContent: React.FC<{
  text: any[];
  className?: string;
}> = ({ text, className }) => {
  // console.log(text);
  return (
    <BlockContent
      className={className || 'sanity-block-content'}
      blocks={text}
      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      serializers={serializers}
    />
  );
};
