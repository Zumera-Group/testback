import { Section, Container } from 'components/Layout';
import { FooterSitemap } from './FooterSitemap';
import { FooterOfficials } from './FooterOfficials';

import { getFooterSitemap } from './utils';

const Footer = ({ ...rest }) => {
  const {
    footerMenu,
    footerCopyright,
    footerTermsOfService,
    footerPrivacyPolice,
    footerSocialLinks,
    logo,
    homePage,
    siteName,
  } = rest;

  const sitemap = getFooterSitemap(footerMenu);

  return (
    <Section
      as={'footer'}
      size={'md'}
      bg={'primary'}
      color={'white'}
      id={'footer'}
    >
      <Container>
        <FooterSitemap sitemap={sitemap} />
        <FooterOfficials
          logo={logo}
          homePage={homePage}
          siteName={siteName}
          copyright={footerCopyright}
          terms={footerTermsOfService}
          privacy={footerPrivacyPolice}
          socials={footerSocialLinks}
        />
      </Container>
    </Section>
  );
};

export default Footer;
