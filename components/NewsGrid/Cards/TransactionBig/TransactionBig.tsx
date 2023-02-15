import Image from 'next/image';
import Link from 'next/link';

import { Beam } from 'components/Beam';
import { Icon } from 'components/Icon';

import { links } from 'lib/links';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './TransactionBig.module.scss';

export const TransactionBig = ({ article }) => {
  const format = useFormatDate();
  const sharedContent = useSharedContentContext();

  if (!article) return null;

  const { _id, hasCDIRelation, headline, date } = article;
  const dateFormatted = date ? format(new Date(date)) : null;
  const href = links().transactions(article);

  const TransactionLogo = ({ url, name }) => {
    return !url ? (
      <p className={styles.transactionLogoFallback}>
        <span>{name}</span>
      </p>
    ) : (
      <div className={styles.transactionLogo}>
        <Image
          unoptimized
          // objectFit="contain"
          width={100}
          height={80}
          alt={`${name} logo`}
          src={`${url}`}
        />
      </div>
    );
  };

  return (
    <article key={`transactionBig-${_id}`} className={styles.transactionBig}>
      <Link passHref href={href} className={styles.link}>
        <div className={styles.logosCover}>
          <TransactionLogo
            url={article.companyLogo1?.asset?.url}
            name={article.companyName1}
          />
          <Beam color={'primary'} glow={false} classes={styles.beam} />
          <TransactionLogo
            url={article.companyLogo2?.asset?.url}
            name={article.companyName2}
          />
        </div>
        <div className={styles.body}>
          {date && (
            <time dateTime={date} className={styles.date}>
              {dateFormatted}
            </time>
          )}
          {headline && <h2 className={styles.title}>{headline}</h2>}
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

export default TransactionBig;
