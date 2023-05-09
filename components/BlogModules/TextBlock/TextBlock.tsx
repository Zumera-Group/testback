import { useRouter } from 'next/router';
import styles from './TextBlock.module.scss';
import { PortableText, PortableTextComponents } from '@portabletext/react';

export const TextBlock: React.FC<any> = ({ specificContentModule }) => {
  const { locale } = useRouter();
  const { subheading, text } = specificContentModule;
  // console.log(text);

  return (
    <div className={styles.textBlock}>
      {subheading && <h4>{subheading}</h4>}
      <PortableText
        value={text}
        components={{
          marks: {
            internalLink: ({ value, children }) => {
              const { slug = {}, lang, type } = value;

              const pageType = type === 'blogArticle' ? 'blog' : '';
              const localeType = locale === 'en' ? 'en' : 'de';
              console.log(slug.current);
              const href = `/${localeType}/${pageType}/${slug.current}`;
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
          },
        }}
      />
    </div>
  );
};

// const components: PortableTextComponents = {
//   marks: {
//     internalLink: ({ value, children }) => {
//       const { slug = {}, lang, type } = value;

//       const pageType = type === 'blogArticle' ? 'blog' : '';
//       const locale = lang === 'en_GB' ? 'en' : 'de';

//       console.log(`/${locale}/${pageType}/${slug.current}`);

//       const href = `/${locale}/${pageType}/${slug.current}`;
//       const target = (value?.href || '').startsWith('http')
//         ? '_blank'
//         : undefined;
//       return (
//         <a
//           href={href}
//           target={target}
//           rel={target === '_blank' && 'noindex nofollow'}
//         >
//           {children}
//         </a>
//       );
//     },
//   },
// };
