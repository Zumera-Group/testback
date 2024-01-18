import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './AnnouncementTopBanner.module.scss';
import { allLinks } from 'lib/links';

export const AnnouncementTopBanner = ({
  announcementTopBanner,
  isScrolled,
}) => {
  const router = useRouter();

  const getBannerLink = () => {
    if (!announcementTopBanner.buttonPageLink) {
      return announcementTopBanner.buttonLink;
    }
    const pageType = announcementTopBanner.buttonPageLink._type;

    const linkTypePart = {
      sector: allLinks.sectors[router.locale],
      valueCalculator:allLinks.questionnaires[router.locale],
      employee: allLinks.employees[router.locale],
      transaction: allLinks.transactions[router.locale],
      newsArticle: 'news',
      service: allLinks.services[router.locale],
      landings: 'landings',
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
              {announcementTopBanner.buttonText}
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AnnouncementTopBanner;
