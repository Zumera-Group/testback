import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Page } from '../domain';

export const querySiteSettings = (
  lang,
) => `*[_type == "siteSettings" && _lang == "${lang}"][0] {
  ...,
  _id,
  _lang,
  siteName,
  homePage->{
    slug {
      current
    }
  },
  sectorsOverviewPage->{
    slug {
      current
    }
  },
  transactionsOverviewPage->{
    slug {
      current
    }
  },
  footerPrivacyPolice {
    name,
    page->{
      slug
    }
  },
  footerTermsOfService {
    name,
    page->{
      slug
    }
  },
  footerSocialLinks[] {
    _key,
    link,
    icon->{
      iconImage {
        asset->{
          url
        }
      }
    },
    iconDark->{
      iconImage {
        asset->{
          url
        }
      }
    }
  },
  footerMenu[] {
    ...,
    _key,
    title,
    menuItems[] {
      name,
      page->{
        slug,
        _type
      }
    },
    toolsMenuItems[] {
      name,
      page->{
        ...
      }
    },
    serviceMenuItems[]-> {
      ...,
    },
    sectorMenuItems[]-> {
      ...,
    },
  },
  headerMenu[] {
    ...,
    name,
    page->{
      slug,
       _type
    }
  },
  hamburgerMenu[] {
    ...,
    name,
    page->{
      slug,
       _type
    },
    serviceMenuItems[]-> {
      ...,
    },
    sectorMenuItems[]-> {
      ...,
    },
  },
  logo {
    asset->{
      url,
      metadata{
        dimensions{
          height,
          width
        }
      }
    }
  },
  darkLogo {
    asset->{
      url,
      metadata{
        dimensions{
          height,
          width
        }
      }
    }
  },
  logoMobile {
    asset->{
      url,
      metadata{
        dimensions{
          height,
          width
        }
      }
    }
  },
  darkLogoMobile {
    asset->{
      url,
      metadata{
        dimensions{
          height,
          width
        }
      }
    }
  },
  contactSectionContent {
    ...,
    offices[]->{
      ...,
      image{
        asset->{
          url,
        }
      }
    },
    contactForm {
      ...,
      checkboxPrivacyPage->{
        slug {
          ...,
          current
        }
      }
    }
  },
  announcementTopBanner {
    ...,
    buttonPageLink-> {
      slug {
        ...,
          current
        },
      _type
    }
  }
}`;

export class SiteSettingsFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getSiteSettings(lang: Locale): Promise<Page> {
    const page = await this.sanityService.fetch(
      querySiteSettings(this.sanityService.getSanityLocale(lang)),
    );

    return page;
  }
}
