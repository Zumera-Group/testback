import BlockContent from '@sanity/block-content-to-react';
import { Button } from 'components/Button';

function ImageRenderer({ node }) {
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
