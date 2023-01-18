import Link from 'next/link';
import Image from 'next/image';

import styles from './Logo.module.scss';
import { AnimatedLogo } from 'components/Logo/AnimatedLogo';

interface Props {
  slug: string;
  title: string;
  classes?: string;

  isScrolled?: boolean;
  isLightPage?: boolean;
}

export const Logo: React.FC<Props> = ({
  slug,
  title,
  classes,
  isScrolled,
  isLightPage,
}) => {
  return (
    <Link passHref href={slug}>
      <a
        className={[styles.logo, classes ?? ''].join(' ')}
        rel="home"
        title={title}
      >
        <AnimatedLogo isScrolled={isScrolled} isLightPage={isLightPage} />
        {/*<Image*/}
        {/*  unoptimized*/}
        {/*  priority*/}
        {/*  loading="eager"*/}
        {/*  layout="fill"*/}
        {/*  objectFit="contain"*/}
        {/*  objectPosition="left center"*/}
        {/*  alt={`${title} logo`}*/}
        {/*  src={src}*/}
        {/*/>*/}
      </a>
    </Link>
  );
};

export default Logo;
