import { useRouter } from 'next/router';
import { PortableText } from '@portabletext/react';

export const RichText: React.FC<any> = ({ content }) => {
  const { locale } = useRouter();
  const localeType = locale === 'en' ? 'en' : 'de';
  return (
    <PortableText
      value={content}
      components={{
        marks: {
          internalLink: ({ value, children }) => {
            const { slug = {}, type } = value;
            const pageType = type === 'blogArticle' ? 'blog' : '';
            const href = `/${localeType}/${pageType}/${slug?.current}`;
            const target = (value?.href || '').startsWith('http')
              ? '_blank'
              : undefined;
            return (
              <a
                href={href}
                target={target}
                rel={target === '_blank' && 'noindex nofollow'}
              >
                {children}
              </a>
            );
          },
          link: ({ value, children }) => {
            const { blank, href } = value;
            return blank ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            );
          },
        },
      }}
    />
  );
};
export default RichText;
