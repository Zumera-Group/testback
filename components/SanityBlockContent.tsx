import BlockContent from '@sanity/block-content-to-react';

export const SanityBlockContent: React.FC<{
  text: any[];
  className?: string;
}> = ({ text, className }) => {
  return (
    <BlockContent
      className={className || 'sanity-block-content'}
      blocks={text}
    />
  );
};
