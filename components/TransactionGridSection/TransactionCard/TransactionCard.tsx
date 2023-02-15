import Link from 'next/link';
import Image from "next/image";

import { Beam } from 'components/Beam';
import { Icon } from 'components/Icon';

import { links } from 'lib/links';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './TransactionCard.module.scss';

export const TransactionCard = ({ transaction }) => {
  const sharedContent = useSharedContentContext();
  const format = useFormatDate();

  if (!transaction) return null;

  const {
    date,
    headline,
    companyLogo1,
    companyName1,
    companyLogo2,
    companyName2,
    coverImage,
  } = transaction;

  const dateFormatted = date ? format(new Date(date)) : null;
  const href = links().transactions(transaction);

  const TransactionLogo = ({ url, name }) => {
    return !url ? (
      <p className={styles.transactionLogoFallback}>{name}</p>
    ) : (
      <div className={styles.transactionLogo}>
        <Image
          unoptimized
          layout={'fill'}
          alt={`${name} logo`}
          src={`${url}`}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain"
          }} />
      </div>
    );
  };

  return (
    <article className={styles.transaction}>
      <Link passHref href={href} className={styles.link}>

        <div className={styles.logosCover}>
          <TransactionLogo
            url={companyLogo1?.asset?.url}
            name={companyName1}
          />
          <Beam color={'primary'} glow={false} classes={styles.beam} />
          <TransactionLogo
            url={companyLogo2?.asset?.url}
            name={companyName2}
          />
        </div>
        <div className={styles.cover}>
          {coverImage?.asset?.url && (
            <div className={styles.imageWrapper}>
              <div className={styles.imageWrapper_inner}>
                <Image
                  unoptimized
                  src={coverImage?.asset?.url}
                  alt={coverImage?.asset?.altText || ''}
                  objectFit={'cover'}
                  objectPosition={'center center'}
                  className={styles.image}
                  fill
                  sizes="100vw" />
              </div>
            </div>
          )}
          <div className={styles.body}>
            {date && (
              <time dateTime={date} className={styles.date}>
                {dateFormatted}
              </time>
            )}
            {headline && <p className={styles.title}>{headline}</p>}
            <Icon
              iconName={'arrow-circle'}
              viewBox={'0 0 32 32'}
              width={32}
              height={32}
            />
          </div>
        </div>

      </Link>
    </article>
  );
};

export default TransactionCard;
