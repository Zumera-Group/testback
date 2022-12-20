import Link from 'next/link';
import Image from 'next/image';

import styles from './Logo.module.scss';

interface Props {
  slug?: string;
  src?: string;
}

export const Logo: React.FC<Props> = ({ slug, src }) => {
  if (!src) return null;
  return (
    <Link passHref href={slug}>
      <a className={styles.logo} rel="home" title="Zumera">
        <Image
          unoptimized
          priority
          loading="eager"
          layout="fill"
          objectFit="contain"
          objectPosition="left center"
          alt="Zumera logo"
          src={src}
        />
      </a>
    </Link>
  )
};

export default Logo;