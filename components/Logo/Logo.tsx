import Link from 'next/link';
import Image from 'next/image';

import styles from './Logo.module.scss';
import { AnimatedLogo } from 'components/Logo/AnimatedLogo';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const isLanding = router.route.includes('landing');
  const valueTool = 'valuation-tool';

  return (
    <>
      {isLanding && router.query.slug !== valueTool ? (
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
              loading="eager"
              layout="fill"
              objectFit="contain"
              objectPosition="left center"
              alt={`${title} logo`}
              src={src}
            />
          )}
        </a>
      ) : (
        <Link passHref href={slug}>
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
                loading="eager"
                layout="fill"
                objectFit="contain"
                objectPosition="left center"
                alt={`${title} logo`}
                src={src}
              />
            )}
          </a>
        </Link>
      )}
    </>
  );
};

export default Logo;
