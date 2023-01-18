import { Logo } from 'components/Logo';
import { FooterLink } from 'components/Footer';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

import { FooterSocials } from 'components/Footer';

import styles from './FooterOfficials.module.scss';

export const FooterOfficials = ({
  logo,
  homePage,
  siteName,
  copyright,
  terms,
  privacy,
  socials,
}) => {
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const homeSlug = linkWithCurrentLocale(homePage?.slug?.current);

  return (
    <div className={styles.officials}>
      <Logo slug={homeSlug} title={siteName} classes={styles.logo} />
      <div className={styles.policies}>
        <small>{copyright && copyright}</small>
        <FooterLink
          title={terms.name}
          href={linkWithCurrentLocale(terms?.page?.slug?.current)}
        />
        <FooterLink
          title={privacy.name}
          href={linkWithCurrentLocale(privacy?.page?.slug?.current)}
        />
      </div>
      <FooterSocials socials={socials} />
    </div>
  );
};

export default FooterOfficials;
