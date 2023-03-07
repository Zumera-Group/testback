import Link from 'next/link';
import Image from 'next/image';

import styles from './Logo.module.scss';
import { AnimatedLogo } from 'components/Logo/AnimatedLogo';

interface Props {
  slug: string;
  title: string;
  classes?: string;
  isLanding?: boolean;
  isScrolled?: boolean;
  isLightPage?: boolean;
  isAnimated?: boolean;
  src?: string;
}

export const Logo: React.FC<Props> = ({
  slug,
  title,
  classes,
  isScrolled,
  isLightPage,
  isAnimated,
  src,
  isLanding,
}) => {
  return isLanding ? (
    <a
      className={[styles.logo, classes ?? ''].join(' ')}
      rel="home"
      title={title}
    >
      {isAnimated ? (
        <AnimatedLogo isScrolled={isScrolled} isLightPage={isLightPage} />
      ) : (
        <Image
          unoptimized
          priority
          width={200}
          height={1200}
          alt={`${title} logo`}
          src={src}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )}
    </a>
  ) : (
    <Link
      passHref
      href={slug}
      className={[styles.logo, classes ?? ''].join(' ')}
      rel="home"
      title={title}
      prefetch={false}
    >
      {isAnimated ? (
        <AnimatedLogo isScrolled={isScrolled} isLightPage={isLightPage} />
      ) : (
        <Image
          unoptimized
          priority
          width={200}
          height={1200}
          alt={`${title} logo`}
          src={src}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )}
    </Link>
  );
};

export default Logo;
