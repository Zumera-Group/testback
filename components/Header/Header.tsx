import { useState, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import { Logo } from 'components/Logo';
import { Container } from 'components/Layout/Container';
import { Hamburger, Menu, BigMenu, LanguageSwitcher } from 'components/Header';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { HeroSectionModule } from 'lib/shared-domain/page/domain/contentModule';

import styles from './Header.module.scss';

export const Header = ({
  siteSettings,
  contentModules,
  darkBg,
  otherLangSlug,
  hideHeader,
  isLightHeader,
}) => {

  const [bigMenuOpen, setBigMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { headerMenu } = siteSettings;

  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const homeSlug = linkWithCurrentLocale(siteSettings?.homePage?.slug?.current);

  const isLightPage = () => {
    if (isLightHeader) return true;
    const hasHeroSection = contentModules.find((module) => {
      return module.specificContentModule instanceof HeroSectionModule
    });
    if (darkBg) return false;
    if (!hasHeroSection) return true;
    return (hasHeroSection.specificContentModule as HeroSectionModule).type !== 'home';
  }

  const getLogoAsset = () => {
    return !isScrolled && !isLightPage() ? siteSettings?.logo?.asset?.url : siteSettings?.darkLogo?.asset?.url
  }

  const services = siteSettings?.hamburgerMenu.find(
    (h) => h.type === 'services',
  )?.serviceMenuItems;
  const sectors = siteSettings?.hamburgerMenu.find(
    (h) => h.type === 'sectors',
  )?.sectorMenuItems;

  useEffect(() => {
    const handleScroll = () => {
      const positionY = window.pageYOffset;
      const POSITION_Y_OFFSET = 64;
      if (positionY > POSITION_Y_OFFSET) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setBigMenuOpen(false);
  }, [router.query.slug, router.locale]);

  useEffect(() => {
    const body = document?.body;
    if (bigMenuOpen) {
      body?.classList?.add?.('no-scroll');
    } else {
      body?.classList?.remove?.('no-scroll');
    }
  }, [bigMenuOpen]);

  return (
    <header
      id="header"
      className={[
        styles.header,
        isLightPage() && styles.header__light,
        isScrolled && styles.header__scrolled,
      ].join(' ')}
    >
      <Container classes={styles.container}>
        <div className={styles.logoWrapper}>
          <Logo
            slug={linkWithCurrentLocale(homeSlug)}
            src={getLogoAsset()}
          />
        </div>
        {!hideHeader && <Menu navigation={headerMenu} />}
        <div className={styles.actionsWrapper}>
          <LanguageSwitcher
            otherLangSlug={otherLangSlug}
            classes={styles.languageSelector}
          />
          <Hamburger
            callBack={() => setBigMenuOpen(true)}
            bigMenuOpen={bigMenuOpen}
          />
        </div>
      </Container>
      <AnimatePresence>
        {bigMenuOpen && (
          <BigMenu
            siteSettings={siteSettings}
            services={services}
            sectors={sectors}
            logo={<Logo slug={linkWithCurrentLocale(homeSlug)} src={siteSettings?.logo?.asset?.url} />}
            closeBigMenu={() => setBigMenuOpen(false)}
            otherLangSlug={otherLangSlug}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;