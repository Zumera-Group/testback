import {ISanityDoc} from '../lib/shared-domain/page/domain';

export interface IBlogDetailContent extends ISanityDoc {
  name?: string;
  calendlyCTA?: string;
  whitePaperDownload?: {
    downloadAgain?: string;
    downloadCTA?: string;
    title?: string;
    description?: string;
    whitePaperForm?: {
      emailLabel?: string;
      errorMessage?: string;
      nameLabel?: string;
      newsLetterCheckboxText?: string;
      isNewsLetterCheckboxRequired?: boolean;
      submitLabel?: string;
      successMessage?: string;
    }
  },
  writtenByLabel?: string;
}
