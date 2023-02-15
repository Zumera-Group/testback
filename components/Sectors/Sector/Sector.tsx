import Link from 'next/link';
import Image from 'next/image';

import { links } from 'lib/links';

import styles from './Sector.module.scss';

export const Sector = ({ sector }) => {
  const { name, graph } = sector;
  return (
    (<Link
      passHref
      href={links().sectors(sector)}
      className={styles.sector}
      title={name}>

      {graph?.iconImage?.asset?.url && (
        <div className={styles.imageWrapper}>
          <Image
            unoptimized
            src={graph?.iconImage?.asset?.url}
            alt={graph?.iconImage?.name}
            layout={'fill'}
            objectFit={'contain'}
            objectPosition={'center center'}
          />
        </div>
      )}
      <h3 className={styles.name}>{name}</h3>

    </Link>)
  );
};