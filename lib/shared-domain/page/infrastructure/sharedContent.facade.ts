import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Page } from '../domain';

export const querySharedContent = (
  lang,
) => `*[_type == "sharedDataContent" && _lang == "${lang}"][0] {
  ...,
  checkboxPrivacyPage->{
    slug {
      current
    }
  },
  downloadButtonContent {
    ...,
    file{
      asset->{
        url
      }
    }
  }
}`;

export class SharedContentFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getSharedContentFacade(lang: Locale): Promise<Page> {
    const content = await this.sanityService.fetch(
      querySharedContent(this.sanityService.getSanityLocale(lang)),
    );

    return content;
  }
}
