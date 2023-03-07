import React, { useState, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import { Logo } from 'components/Logo';
import { Container } from 'components/Layout';
import {
  Hamburger,
  Menu,
  BigMenu,
  LanguageSwitcher,
  AnnouncementTopBanner,
} from 'components/Header';

import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import {
  HeroSectionModule,
  CDIGlobalSectionModule,
  VTHeroModule,
} from 'lib/shared-domain/page/domain/contentModule';

import { LogoExtended } from 'components/Icons/LogoExtended';

import styles from './Header.module.scss';
import { getTranslateByScope } from 'translation/i18n';

const t = getTranslateByScope('question');

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
  hideMenu,
}) => {
  const [bigMenuOpen, setBigMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { headerMenu, siteName } = siteSettings;

  const router = useRouter();
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  const homeSlug = linkWithCurrentLocale(siteSettings?.homePage?.slug?.current);

  const isQuestionnaire = () =>
    router.locale === 'en' ? '/questionnaires/' : '/fragenkatalog/';
  const hideTopBanner = router.asPath.includes(isQuestionnaire());

  const isLightPage = () => {
    if (isLightHeader) return true;
    const hasHeroSection = contentModules.find((module) => {
      return module.specificContentModule instanceof HeroSectionModule;
    });
    const IsVTLandingHero =
      contentModules[0]?.specificContentModule instanceof VTHeroModule;
    if (IsVTLandingHero) {
      return false;
    }
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
        'primary' &&
      (hasHeroSection.specificContentModule as HeroSectionModule).type !==
        'career'
    );
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
      const POSITION_Y_OFFSET = 94;
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

  const setScroll = () => {
    let offset =
      window.scrollY / (document.body.offsetHeight - window.innerHeight);
    setScrollPosition(offset);
  };

  useEffect(() => {
    document.addEventListener('scroll', setScroll);

    return () => {
      document.removeEventListener('scroll', setScroll);
    };
  }, []);

  const [isLanding, setIsLanding] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('isLanding');
    if (session === 'true') {
      setIsLanding(true);
    } else {
      setIsLanding(false);
    }
  }, []);

  return (
    <>
      {siteSettings?.announcementTopBanner?.isEnabled && !hideTopBanner && (
        <AnnouncementTopBanner
          announcementTopBanner={siteSettings?.announcementTopBanner}
          isScrolled={isScrolled}
        />
      )}

      <header
        id="header"
        className={[
          styles.header,
          isLightPage() ? styles.header__light : '',
          isScrolled ? styles.header__scrolled : '',
          bigMenuOpen ? styles.header__open : '',
          indicator && styles.hideBorder,
          siteSettings?.announcementTopBanner?.isEnabled &&
            !hideTopBanner &&
            styles.withBanner,
        ].join(' ')}
        style={{ '--scroll-position': scrollPosition } as React.CSSProperties}
      >
        <Container classes={[styles.container].join('')}>
          <div className={styles.logoWrapper}>
            {!staticExtended ? (
              <Logo
                slug={homeSlug}
                isScrolled={isScrolled}
                isLightPage={isLightPage()}
                title={siteName}
                isAnimated={true}
                isLanding={isLanding}
              />
            ) : (
              <LogoExtended
                slug={homeSlug}
                title={siteName}
                isLanding={isLanding}
              />
            )}
          </div>

          {!hideHeader && !hideMenu && <Menu navigation={headerMenu} />}

          {!hideBurger && (
            <div className={styles.actionsWrapper}>
              <LanguageSwitcher
                otherLangSlug={otherLangSlug}
                classes={styles.languageSelector}
              />

              {!hideMenu ? (
                <Hamburger
                  callBack={() => setBigMenuOpen(true)}
                  bigMenuOpen={bigMenuOpen}
                />
              ) : null}
            </div>
          )}
          {indicator && (
            <div className={styles.questionIndicator}>
              {t('question')}{' '}
              {indicator?.current > indicator?.total
                ? indicator?.current - 1
                : indicator?.current}{' '}
              / {indicator?.total}
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
    </>
  );
};

export default Header;
