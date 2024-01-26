import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Landings } from '../domain/index';
import { filterDataToSingleItem } from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';
import { contentModulesQuery } from 'lib/shared-domain/page/infrastructure/contentModulesQuery';

const queryValuationToolLanding = (
  lang,
  slug,
) => `*[_type == "landings" && _lang == "${lang}" && slug.current == "${slug}"] {
  ...,
  _id,
  _lang,
  slug {
    current
  },
  name,
  seoImage {
    asset->{
      url
    }
  },
  seoDescription,
  description,
  ${contentModulesQuery()},
}`;

const queryLandings = () => `*[_type == "landings"] {
  _id,
  _lang,
  slug {
    current
  }
}`;

export class LandingsFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getLanding(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ landing: Landings; query: string }> {
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
}
