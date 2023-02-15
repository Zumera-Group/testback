import Image from 'next/image';
import { Beam } from 'components/Beam';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useFormatDate } from 'lib/shared-domain/useFormatDate';

import styles from './TransactionCard.module.scss';

export const TransactionCard = ({ transaction }) => {
  const sharedContent = useSharedContentContext();
  const format = useFormatDate();

  if (!transaction) return null;

  const {
    date,
    companyLogo1,
    companyName1,
    companyLogo2,
    companyName2,
    coverImage,
    sectors,
  } = transaction;

  const sectorsName = sectors?.map((sector) => sector.name) || [];

  const dateFormatted = date ? format(new Date(date)) : null;

  const TransactionLogo = ({ url, name }) => {
    return !url ? (
      <p className={styles.transactionLogoFallback}>{name}</p>
    ) : (
      <Image
        unoptimized
        width={100}
        height={80}
        alt={`${name} logo`}
        src={`${url}`}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    );
  };

  return (
    <article className={styles.transaction}>
      <div className={styles.logosCover}>
        <TransactionLogo url={companyLogo1?.asset?.url} name={companyName1} />
        <Beam color={'primary'} glow={false} classes={styles.beam} />
        <TransactionLogo url={companyLogo2?.asset?.url} name={companyName2} />
      </div>
      <div className={styles.cover}>
        {coverImage?.asset?.url && (
          <div className={styles.imageWrapper}>
            <div className={styles.imageWrapper_inner}>
              <Image
                unoptimized
                src={coverImage?.asset?.url}
                alt={coverImage?.asset?.altText || ''}
                // objectFit={'cover'}
                // objectPosition={'center center'}
                className={styles.image}
                fill
                sizes="100vw"
              />
            </div>
          </div>
        )}
        <div className={styles.body}>
          <div>
            <div className={styles.bodyTitle}>
              {sharedContent.transactions.sector}
            </div>
            <div className={styles.bodyValue}>{sectorsName.join(', ')}</div>
          </div>
          <div>
            <div className={styles.bodyTitle}>
              {sharedContent.transactions.transactionType}
            </div>
            <div className={styles.bodyValue}>
              {transaction.typeOfService?.name}
            </div>
          </div>
          <div>
            <div className={styles.bodyTitle}>
              {sharedContent.transactions.closingTime}
            </div>
            <div className={styles.bodyValue}>{dateFormatted}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TransactionCard;
