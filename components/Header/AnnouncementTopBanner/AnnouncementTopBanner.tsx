import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './AnnouncementTopBanner.module.scss';

export const AnnouncementTopBanner = ({ announcementTopBanner, isScrolled }) => {
  const router = useRouter();

  const getBannerLink = () => {
    if (!announcementTopBanner.buttonPageLink) {
      return announcementTopBanner.buttonLink;
    }
    const pageType = announcementTopBanner.buttonPageLink._type;

    const linkTypePart = {
      sector: router.locale === 'en' ? 'sectors' : 'sektoren',
      valueCalculator:
        router.locale === 'en' ? 'questionnaires' : 'fragenkatalog',
      employee: router.locale === 'en' ? 'employees' : 'mitarbeiter',
      transaction: router.locale === 'en' ? 'transactions' : 'transaktionen',
      newsArticle: 'news',
      service: router.locale === 'en' ? 'services' : 'leistungsspektrum',
      page: '',
    }[pageType];
    return `/${linkTypePart}/${announcementTopBanner.buttonPageLink.slug.current}`;
  };

  return (
    <div
      className={[
        styles.announcementTopBanner,
        isScrolled ? styles.hideBanner : '',
      ].join(' ')}
    >
      <p>
        {announcementTopBanner.text}
        {announcementTopBanner.buttonText && (
          <>
            {' '}
            <Link href={getBannerLink()} passHref={true}>
              <a>{announcementTopBanner.buttonText}</a>
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AnnouncementTopBanner;