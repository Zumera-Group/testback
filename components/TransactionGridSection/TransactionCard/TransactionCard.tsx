import Link from 'next/link';
import Image from 'next/image';

import { Beam } from 'components/Beam';
import { Icon } from 'components/Icon';

import {createUrl} from 'lib/links';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './TransactionCard.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import {Transaction} from '../../../lib/shared-domain/transactions/domain';
import {SanityService} from '../../../lib/services/sanity.service';

export const TransactionCard = ({ transaction, showCoverBlock = true }: {transaction: Transaction, showCoverBlock?: boolean}) => {
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
    highlightSellersTitle,
    highlightSellers,
  } = transaction;

  const dateFormatted = date ? format(new Date(date)) : null;

  const href = createUrl({
    type: transaction._type,
    locale: SanityService.getLocaleFromSanityLocale(transaction._lang),
    slug: transaction?.slug?.current
  });

  return (
    <article className={styles.transaction}>
      <Link passHref href={href} legacyBehavior>
        <a className={styles.link}>
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
          {showCoverBlock && <div className={styles.cover}>
              {coverImage?.asset?.url && (
                <div className={styles.imageWrapper}>
                  <div className={styles.imageWrapper_inner}>
                    <Image
                      unoptimized
                      src={sanityImageUrlFor(coverImage?.asset?.url).url()}
                      alt={coverImage?.asset?.altText || ''}
                      className={styles.image}
                      fill
                      sizes="100vw"
                    />
                  </div>
                </div>
              )}
              <div className={styles.body}>
                {date && (
                  <time dateTime={date as unknown as string} className={styles.date}>
                    {dateFormatted}
                  </time>
                )}
                {headline && <p className={styles.title}>{headline}</p>}
                <p className={styles.excerpt}>
                  {highlightSellers?.length ? (
                    <>
                      <strong>{highlightSellersTitle} </strong>
                      {highlightSellers.filter((val) => !val.length).join(', ')}
                    </>
                  ) : null}
                </p>
                <Icon
                  iconName={'arrow-circle'}
                  viewBox={'0 0 32 32'}
                  width={32}
                  height={32}
                />
              </div>
            </div>
          }
        </a>
      </Link>
    </article>
  );
};

export default TransactionCard;

const TransactionLogo = ({ url, name }) => {
  return !url ? (
    <p className={styles.transactionLogoFallback}>{name}</p>
  ) : (
    <div className={styles.transactionLogo}>
      <Image
        unoptimized
        alt={`${name} logo`}
        src={sanityImageUrlFor(url).url()}
        fill
        style={{
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};