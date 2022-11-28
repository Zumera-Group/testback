import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Office } from '../domain/index';
import { filterDataToSingleItem } from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryOffice = (
  lang,
  id,
) => `*[_type == "office" && _lang == "${lang}" && _id == "${id}"] {
  _id,
  _lang,
  city,
  street,
  country,
  zipCode,
  houseNumber,
  phoneNumber,
  isCDINetwork,
  continentName-> {
    name
  }
}`;

const queryOffices = (lang) => `*[_type == "office" && _lang == "${lang}"] {
  _id,
  _lang,
  city,
  street,
  country,
  zipCode,
  houseNumber,
  phoneNumber,
  isCDINetwork,
  continentName-> {
    name
  }
}`;

const queryCDIOfficeDetailContent = (
  lang,
) => `*[_type == "cdiOfficeDetailContent" && _lang == "${lang}"] {
  ...,
  contactUsSection {
    ...,
    offices[]->{...}
  }
}`;

export class OfficeFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getOffices(lang: Locale): Promise<Office[]> {
    const offices = await this.sanityService.fetch(
      queryOffices(this.sanityService.getSanityLocale(lang)),
    );

    return offices;
  }

  async getOffice(
    lang: Locale,
    id: string,
    preview: boolean,
  ): Promise<{ office: Office; query: string }> {
    const query = queryOffice(this.sanityService.getSanityLocale(lang), id);
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const office = filterDataToSingleItem(data, preview);
    return { office, query };
  }

  async getDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryCDIOfficeDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
