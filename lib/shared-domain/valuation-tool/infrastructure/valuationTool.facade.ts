import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { VTLanding } from '../domain/index';
import { filterDataToSingleItem } from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryValuationToolLanding = (
  lang,
  slug,
) => `*[_type == "valuationToolLanding" && _lang == "${lang}" && landingSlug.current == "${slug}"] {
  ...,
  _id,
  _lang,
  landingSlug {
    current
  },
  landingName,
  seoImage {
    asset->{
      url
    }
  },
  seoDescription,
  description,
  secondText,
  buttonText,
  questionnaire->{
    questionnaireSlug {
      current
    }
  },
  secondButtonText,
  fileToDownload {
    asset->{
      url
    },
    description
  },
  question-> {
    ...
  },
  contentModules[] {
    _key,
    _type,
    ...,
    image {
      asset->{
        url
      },
    },
    bgImage {
      asset->{
        url
      },
    },
    buttonTarget-> {
      questionnaireSlug {
        current
      } 
    },
    iconTopics-> {
      iconImage{
        asset->{
          url,
        }
      }
    },
    topImage {
      asset->{
        url
      },
    },
    review1 {
      ...,
      rating{
        asset->{
          url,
        }
      }
    },
    review2 {
      ...,
      rating{
        asset->{
          url,
        }
      }
    },
    brands[] {
      ...,
      image{
        asset->{
          url,
        }
      }
    },
    textWithIcon1 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
     textWithIcon2 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon3 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    textWithIcon4 {
      title,
      icon-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      },
    },
    logo1 {
      asset->{
        url
      },
    },
    logo2 {
      asset->{
        url
      },
    },
    logo3 {
      asset->{
        url
      },
    },
    heroPartnerLogo {
       asset->{
         url
       }
    },
    jobCard {
      ...,
      image {
        asset->{
          url
        },
      }
    },
    goToQuestionnaire->{
      questionnaireSlug {
        current
      },
    },
    questionnaire->{
      questionnaireSlug {
        current
      },
    },
    quote-> {
      quoteText,
      quoteAuthor->{
        firstName,
        lastName,
        jobTitle,
        mobile,
        phone,
        email,
      }
    },
    logos[] {
      asset-> {
        url,
        metadata{
          dimensions{
            height,
            width
          }
        }
      }
    },
    tabs[] {
      ...,
      image {
        asset->{
          url
        },
      }
    },
    slider[] {
      ...,
      asset->{
        url
      }
    },
    iconRows[] {
      ...,
      icon->{
        iconImage{
          asset->{
            url
          }
        }
      }
    },
    employees[]-> {
      ...,
      firstName,
      lastName,
      picture {
        asset->{
          url
        },
      },
      sectors[]-> {
        ...,
      },
      cardPicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
      newsGridPicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
      detailPagePicture {
        ...,
        picture {
          asset->{
            url
          },
        }
      },
    },
    services[]-> {
      ...
    },
    sectorsGrid[]-> {
      ...,
      graph-> {
        name,
        iconImage{
          asset->{
            url,
            metadata{
              dimensions{
                height,
                width
              }
            }
          }
        }
      }
    },
    transactions[]-> {
      ...,
      companyLogo1 {
        asset->{
          url
        },
      },
      companyLogo2 {
        asset->{
          url
        },
      },
    },
    transaction-> {
      ...,
      companyLogo1 {
        asset->{
          url
        },
      },
      companyLogo2 {
        asset->{
          url
        },
      },
    },
    offices[]-> {
      ...
    },
    link {
      ...,
      page->{
        slug
      }
    },
    sectorsDropdown[]-> {
      ...,
      name,
      detailPageHeroImage {
        asset->{
          url,
        }
      },
    },
    servicesDropdown[]-> {
      name
    },
    button {
      ...,
      link->{
        slug
      },
      page->{
        slug
      },
      externalUrl
    },
    heroBgImage {
      asset->{
        url
      }
    },
    heroMobileBgImage {
      asset->{
        url
      }
    },
    industryReport-> {
      ...,
      image {
        asset-> {
          url
        }
      }
    }
  }
}`;

const queryLandings = () => `*[_type == "valuationToolLanding"] {
  _id,
  _lang,
  landingSlug {
    current
  }
}`;

export class ValuationToolFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getLanding(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ landing: VTLanding; query: string }> {
    const query = queryValuationToolLanding(
      this.sanityService.getSanityLocale(lang),
      slug,
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }
    const landing = filterDataToSingleItem(data, preview);

    return { landing, query };
  }

  async getLandings(): Promise<VTLanding[]> {
    const landings = await this.sanityService.fetch(queryLandings());

    return landings;
  }
}
