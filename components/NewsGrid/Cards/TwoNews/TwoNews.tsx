import Link from 'next/link';

import { Icon } from 'components/Icon';

import { links } from 'lib/links';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './TwoNews.module.scss';

export const TwoNews = ({ article }) => {
  const format = useFormatDate();

  if (!article) return null;

  const { _id, title, date, customLink } = article;
  const href = customLink ? customLink : links().newsArticles(article);
  const dateFormatted = date ? format(new Date(date)) : null;

  return (
    <article key={`twoNews-${_id}`} className={styles.twoNews}>
      <Link passHref href={href}>
        <a
          className={styles.link}
          target={customLink ? '_blank' : ''}
          rel={customLink ? 'noopener noreferrer' : ''}
        >
          {date && (
            <time dateTime={date} className={styles.date}>
              {dateFormatted}
            </time>
          )}
          {title && <h2 className={styles.title}>{title}</h2>}
          <Icon
            iconName={'arrow-circle'}
            viewBox={'0 0 32 32'}
            width={24}
            height={24}
          />
        </a>
      </Link>
    </article>
  );
};

export default TwoNews;
