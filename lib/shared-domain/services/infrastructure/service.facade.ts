import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Service } from '../../page/domain/index';
import {
  filterDataToSingleItem,
  getOtherLangSlugQuery,
} from '../../page/infrastructure/page.facade';
import {
  contentModulesQuery,
  serviceDetailSectionsReferencesQuery,
} from '../../page/infrastructure/contentModulesQuery';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryAll = (lang) => `*[_type == "service" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  name,
  description,
  helpContactPerson {
    ...,
    employee-> {
      ...,
      firstName,
      lastName,
      picture {
        asset->{
          url
        },
      }
    }
  },
  sectorsForThiServiceSection{
    ...,
    sectors[]->{
      ...,
      graph->{
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
  },
  questionnaire->{
    questionnaireSlug {
      current
    },
  },
  calculatorTeaserSection {
    ...,
    questionnaire->{
      questionnaireSlug {
        current
      },
    },
  }
}`;

const queryOne = (
  lang,
  slug,
  otherLangSlugQuery,
) => `*[_type == "service" && slug.current == "${slug}" &&  _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  name,
  description,

  tabs[] {
    _key,
    title,
    ${contentModulesQuery(serviceDetailSectionsReferencesQuery)}
  },
  "queryOtherLangSlug": ${otherLangSlugQuery},
}`;
// ${serviceDetailSectionsQuery},

export class ServiceFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getServices(lang: Locale): Promise<Service[]> {
    const services = await this.sanityService.fetch(
      queryAll(this.sanityService.getSanityLocale(lang)),
    );

    return services;
  }

  async getServiceDetail(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ service: Service; query: string }> {
    const query = queryOne(
      this.sanityService.getSanityLocale(lang),
      slug,
      getOtherLangSlugQuery(lang, 'service'),
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const service = filterDataToSingleItem(data, preview);
    return { service, query };
  }
}
