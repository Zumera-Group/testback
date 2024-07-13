import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Employee } from '../domain';
import {
  filterDataToSingleItem
} from '../../page/infrastructure/page.facade';
import { SERVER_FETCHING_ERROR } from '../../page/constants';

const queryEmployees = (lang) => `*[_type == "employee" && _lang == "${lang}" && (hidePage == false || !defined(hidePage))] {
  ...,
  _id,
  _lang,
  slug,
  detailPagePicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  newsGridPicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  cardPicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  report->{
    ...,
  },
  sectors[]-> {
    ...,
  },
  office->{
    ...,
  },
}`;

const queryEmployee = (
  lang,
  slug,
  otherLangSlugQuery,
) => {
  //just for back compatibility
  let queryOtherLangSlug = '';
  if (otherLangSlugQuery) {
    queryOtherLangSlug = `"queryOtherLangSlug": ${otherLangSlugQuery},`
  }

  return `*[_type == "employee" && slug.current == "${slug}" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  _langRefs[] -> {
    _id,
    _lang,
    slug
  },
  __i18n_base -> {
    _id,
    _lang,
    slug,
    _langRefs[] -> {
      _id,
      _lang,
      slug
    }
  },
  detailPagePicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  newsGridPicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  reportDownloadSection {
    ...,
    report->{
      ...,
    },
  },
  cardPicture {
    ...,
    picture {
      asset->{
        url,
        ...,
      },
    }
  },
  sectors[]-> {
    ...,
  },
  office->{
    ...,
  },
  ${queryOtherLangSlug}
}`;
}

const queryEmployeeDetailContent = (
  lang,
) => `*[_type == "employeeDetailContent" && _lang == "${lang}"] {
  ...,
  contactSectionContent {
    ...,
    offices[]->{
      ...
    }
  }
}`;

export class EmployeeFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getEmployee(
    lang: Locale,
    slug: string,
    preview?: boolean,
  ): Promise<{ employee: Employee; query: string }> {
    const query = queryEmployee(
      this.sanityService.getSanityLocale(lang),
      slug,
      null
    );
    const data = await this.sanityService.fetch(query, preview);
    if (!data) {
      throw new Error(SERVER_FETCHING_ERROR);
    }

    const employee = filterDataToSingleItem(data, preview);

    return { employee, query };
  }

  async getEmployees(lang: Locale): Promise<Employee[]> {
    const employees = await this.sanityService.fetch(
      queryEmployees(this.sanityService.getSanityLocale(lang)),
    );

    return employees;
  }

  async getEmployeeDetailContent(locale: Locale) {
    const detailContent = await this.sanityService.fetch(
      queryEmployeeDetailContent(this.sanityService.getSanityLocale(locale)),
    );

    return detailContent?.[0] || {};
  }
}
