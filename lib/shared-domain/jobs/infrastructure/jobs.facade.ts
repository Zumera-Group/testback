import { Locale } from 'lib/locale';
import { SanityService } from 'lib/services/sanity.service';
import { Job } from '../domain';

const queryJobs = (lang) => `*[_type == "jobs" && _lang == "${lang}"] {
  ...,
  _id,
  _lang,
  title,
  employmentType,
  office-> {
    ...,
  },
  description,
  link,
  linkText,
  unit,
}`;

export class JobsFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getJobs(lang: Locale): Promise<Job[]> {
    return await this.sanityService.fetch(
      queryJobs(this.sanityService.getSanityLocale(lang)),
    );
  }
}
