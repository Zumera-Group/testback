import Link from 'next/link';
import Image from "next/legacy/image";

import { Icon } from 'components/Icon';

import { links } from 'lib/links';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { sanityImageUrlFor } from 'lib/sanity';

import styles from './Employee.module.scss';

export const Employee: React.FC<{
  article: any;
  cardLabel?: string;
}> = ({ article, cardLabel }) => {
  if (!article) return null;
  const name = getEmployeeFullName(article);
  const jobTitle = article.jobTitle;
  const imageUrl =
    article.newsGridPicture?.picture?.asset?.url ||
    article.cardPicture?.asset?.url ||
    article.cardPicture?.picture?.asset?.url;
  const image = sanityImageUrlFor(imageUrl)?.url();

  const href = links().employees(article);

  return (
    <article className={styles.employee}>
      <Link passHref href={href} className={styles.link}>
        <div className={styles.imageWrapper}>
          <div
            className={[
              styles.imageWrapper_inner,
              !image ? styles.imageWrapper_inner__noImage : '',
            ].join(' ')}
          >
            {image && (
              <Image
                unoptimized
                src={image}
                alt={name}
                className={styles.image}
              />
            )}
          </div>
        </div>
        <div className={styles.body}>
          {jobTitle && <h4 className={styles.jobTitle}>{jobTitle}</h4>}
          {name && <h3 className={styles.name}>{name}</h3>}
          <div className={styles.moreAbout}>
            {cardLabel}
            <Icon
              iconName={'arrow-circle'}
              viewBox={'0 0 32 32'}
              width={24}
              height={24}
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Employee;
