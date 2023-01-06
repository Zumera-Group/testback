import { SanityBlockContent } from "components/SanityBlockContent";

export const Description = ({ content }) => {
  return (
    Array.isArray(content) ? (
      <SanityBlockContent text={content} />
    ) : (
      <p>{content}</p>
    )
  );
};

export default Description;