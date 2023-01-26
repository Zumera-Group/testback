import { useState, useEffect } from 'react';

import Link from 'next/link';

import { Icon } from 'components/Icon';

import { motion } from 'framer-motion';

import { parentAnimationProps, childAnimationProps } from './animationProps';
import { links } from 'lib/links';

import styles from './Navigation.module.scss';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';

export const Navigation = ({
  heading,
  showMode,
  setShowMode,
  sectors,
  services,
}) => {
  const [currentNavigation, setCurrentNavigation] = useState([]);

  const navigationHeading = heading();

  const showNavigation = showMode !== 'normal' && currentNavigation?.length > 0;

  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  useEffect(() => {
    if (!showMode) return;
    const navigationItems = {
      sectors: sectors,
      services: services,
    };
    if (navigationItems.hasOwnProperty(showMode))
      setCurrentNavigation(navigationItems[showMode]);
  }, [showMode, sectors, services]);

  const CurrentItems = () => {
    const link = links();
    return showNavigation ? (
      <ul className={styles.items}>
        {currentNavigation?.map((item, index: number) => (
          <li key={`navigation-${item?._id}-${index}`} className={styles.item}>
            <Link passHref href={link[showMode](item)}>
              <a className={styles.link}>{item?.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    ) : null;
  };

  return showNavigation ? (
    <motion.div
      variants={parentAnimationProps}
      initial="hidden"
      animate="show"
      key={showMode}
      className={styles.navigation}
    >
      <button
        className={styles.navigation_backBtn}
        onClick={() => setShowMode('normal')}
        title={'Go back'}
        aria-label={'Go back'}
      >
        <Icon iconName="arrow" viewBox="0 0 120 120" width={18} height={18} />
      </button>
      {navigationHeading && (
        <motion.h2
          variants={childAnimationProps}
          className={styles.navigation_heading}
        >
          <Link
            passHref
            href={linkWithCurrentLocale(navigationHeading.toLowerCase())}
          >
            <a>{navigationHeading}</a>
          </Link>
        </motion.h2>
      )}
      <motion.div variants={childAnimationProps}>
        <CurrentItems />
      </motion.div>
    </motion.div>
  ) : null;
};

export default Navigation;
