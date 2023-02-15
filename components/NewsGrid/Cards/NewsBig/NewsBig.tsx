import Link from 'next/link';
import Image from 'next/image';

import { Icon } from 'components/Icon';

import { links } from 'lib/links';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { sanityImageUrlFor } from 'lib/sanity';

import styles from './NewsBig.module.scss';

export const NewsBig = ({ article }) => {
  const format = useFormatDate();
  const sharedContent = useSharedContentContext();

  if (!article) return null;
  const {
    _id,
    title,
    date,
    picture,
    secondPicture,
    hasCDIRelation,
    customLink,
  } = article;

  const href = customLink ? customLink : links().newsArticles(article);
  const dateFormatted = date ? format(new Date(date)) : null;
  const imageUrl = secondPicture?.asset?.url || picture?.asset?.url;
  const image = sanityImageUrlFor(imageUrl)?.height(600).auto('format').url();

  return (
    <article key={`newsBig-${_id}`} className={styles.newsBig}>
      <Link
        passHref
        href={href}
        className={styles.link}
        target={customLink ? '_blank' : ''}
        rel={customLink ? 'noopener noreferrer' : ''}
        prefetch={false}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.imageWrapper_inner}>
            <Image
              unoptimized
              src={image}
              alt={title}
              // objectFit={'cover'}
              // objectPosition={'center center'}
              // layout="fill"
              width={200}
              height={1200}
              className={styles.image}
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: 'auto',
              }}
            />
          </div>
        </div>
        <div className={styles.body}>
          {date && (
            <time dateTime={date} className={styles.date}>
              {dateFormatted}
            </time>
          )}
          {title && <h2 className={styles.title}>{title}</h2>}
          {hasCDIRelation ? (
            <p className={styles.excerpt}>{sharedContent.cdiTextNews}</p>
          ) : null}
          <Icon
            iconName={'arrow-circle'}
            viewBox={'0 0 32 32'}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </article>
  );
};

export default NewsBig;
