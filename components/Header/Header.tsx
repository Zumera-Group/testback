import { useState, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import { Logo } from 'components/Logo';
import { Container } from 'components/Layout';
import { Hamburger, Menu, BigMenu, LanguageSwitcher } from 'components/Header';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import {
  HeroSectionModule,
  CDIGlobalSectionModule,
} from 'lib/shared-domain/page/domain/contentModule';

import styles from './Header.module.scss';
import { LogoExtended } from 'components/Icons/LogoExtended';

export const Header = ({
  siteSettings,
  contentModules,
  darkBg,
  otherLangSlug,
  hideHeader,
  isLightHeader,
  hideBurger,
  staticExtended,
  indicator,
}) => {
  const [bigMenuOpen, setBigMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { headerMenu, siteName } = siteSettings;

  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const homeSlug = linkWithCurrentLocale(siteSettings?.homePage?.slug?.current);

  const isLightPage = () => {
    if (isLightHeader) return true;
    const hasHeroSection = contentModules.find((module) => {
      return module.specificContentModule instanceof HeroSectionModule;
    });
    const CDIGlobalIsHero =
      contentModules[0]?.specificContentModule instanceof
      CDIGlobalSectionModule;
    if (darkBg) return false;
    if (CDIGlobalIsHero) return false;
    if (!hasHeroSection) return true;
    return (
      (hasHeroSection.specificContentModule as HeroSectionModule).type !==
        'home' &&
      (hasHeroSection.specificContentModule as HeroSectionModule).type !==
        'primary'
    );
  };

  const getLogoAsset = () => {
    return !isScrolled && !isLightPage()
      ? siteSettings?.logo?.asset?.url
      : siteSettings?.darkLogo?.asset?.url;
  };

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
    };
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

  const current =
    indicator.current > indicator.total
      ? indicator.current - 1
      : indicator.current;
  const total = indicator.total;

  return (
    <header
      id="header"
      className={[
        styles.header,
        isLightPage() ? styles.header__light : '',
        isScrolled ? styles.header__scrolled : '',
      ].join(' ')}
    >
      <Container classes={styles.container}>
        <div className={styles.logoWrapper}>
          {!staticExtended ? (
            <Logo
              slug={homeSlug}
              isScrolled={isScrolled}
              isLightPage={isLightPage()}
              title={siteName}
              isAnimated={true}
            />
          ) : (
            <LogoExtended slug={homeSlug} title={siteName} />
          )}
        </div>
        {!hideHeader && <Menu navigation={headerMenu} />}

        {!hideBurger && (
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
        )}
        {indicator && (
          <div className={styles.questionIndicator}>
            Question {current} / {total}
          </div>
        )}
      </Container>
      <AnimatePresence exitBeforeEnter>
        {bigMenuOpen && (
          <BigMenu
            siteSettings={siteSettings}
            services={services}
            sectors={sectors}
            logo={<Logo slug={homeSlug} title={siteName} isAnimated={true} />}
            closeBigMenu={() => setBigMenuOpen(false)}
            otherLangSlug={otherLangSlug}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
