import Link from 'next/link';
import Image from 'next/image';

import styles from './FooterSocials.module.scss';

export const FooterSocials = ({ socials }) => {
  if (!socials.length) return null;
  return (
    <ul className={styles.socials}>
      {socials.map(({ _key, link, icon }, index: number) => (
        <li
          key={`footerSocials-${_key}-${index}`}
          className={styles.socialItem}
        >
          <Link
            passHref
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            prefetch={false}
          >
            <Image
              unoptimized
              loading="lazy"
              src={icon?.iconImage?.asset?.url + `?h=400`}
              alt={link}
              height="20"
              width="20"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterSocials;
