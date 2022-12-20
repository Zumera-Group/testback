import { useEffect, useState } from 'react';

import { SideBar } from './SideBar';
import { Navigation } from './Navigation';
import { Close } from './Close';

import { animationProps } from './animationProps';
import { motion } from 'framer-motion';

import styles from './BigMenu.module.scss';

export const BigMenu = ({
  siteSettings,
  services,
  sectors,
  logo,
  closeBigMenu,
  otherLangSlug,
}) => {

  const [showMode, setShowMode] = useState<'normal' | 'sectors' | 'services'>('normal');

  const getNavigationHeading = () => {
    if (showMode === 'sectors') {
      const sectorsMenu = siteSettings?.hamburgerMenu?.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return sectorsMenu.name;
    }
    if (showMode === 'services') {
      const servicesMenu = siteSettings?.hamburgerMenu?.find(
        (menu) => menu.type.toLowerCase() === showMode,
      );
      return servicesMenu.name;
    }
    return '';
  };

  useEffect(() => {
    const close = (e: { keyCode: number }) => e.keyCode === 27 && closeBigMenu();
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeBigMenu]);

  return (
    <motion.nav {...animationProps} className={styles.bigMenu}>
      <SideBar
        logo={logo}
        menu={siteSettings?.hamburgerMenu}
        showMode={showMode}
        setShowMode={setShowMode}
        close={closeBigMenu}
        otherLangSlug={otherLangSlug}
      />
      <Navigation
        heading={getNavigationHeading}
        showMode={showMode}
        setShowMode={setShowMode}
        sectors={sectors}
        services={services}
      />
      <Close
        mobile={false}
        callBack={closeBigMenu}
      />
    </motion.nav>
  );
};

export default BigMenu;