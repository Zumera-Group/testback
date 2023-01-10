import Link from 'next/link';
import Image from 'next/image';

import styles from './Logo.module.scss';

interface Props {
  slug: string;
  src: string;
  title: string;
  classes?: string;
}

export const Logo: React.FC<Props> = ({ slug, src, title, classes }) => {
  if (!src) return null;
  return (
    <Link passHref href={slug}>
      <a
        className={[
          styles.logo,
          classes ?? '',
        ].join(' ')}
        rel="home"
        title={title}
      >
        <Image
          unoptimized
          priority
          loading="eager"
          layout="fill"
          objectFit="contain"
          objectPosition="left center"
          alt={`${title} logo`}
          src={src}
        />
      </a>
    </Link>
  )
};

export default Logo;