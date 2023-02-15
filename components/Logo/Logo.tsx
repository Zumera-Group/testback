import Link from 'next/link';
import Image from "next/image";

import styles from './Logo.module.scss';
import { AnimatedLogo } from 'components/Logo/AnimatedLogo';

interface Props {
  slug: string;
  title: string;
  classes?: string;

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
}) => {
  return (
    <Link
      passHref
      href={slug}
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
          loading="eager"
          // layout="fill"
          // objectFit="contain"
          // objectPosition="left center"
          alt={`${title} logo`}
          src={src}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      )}
    </Link>
  );
};

export default Logo;
