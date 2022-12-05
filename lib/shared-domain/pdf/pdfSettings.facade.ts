import { SanityService } from 'lib/services/sanity.service';

export const queryPDFSettings = () => `*[_type == "pdfSettings"][0] {
  ...,
  page1 {
    ...,
  },
  page2 {
    ...,
  },
  page3 {
    ...,
  },
  page4 {
    ...,
  },
  page5 {
    ...,
  },
  page6 {
    ...,
  }
}`;

export type PDFSettings = {
  page1: {
    title: string;
    text: string;
    footer: string;
  };
  page2: {
    title: string;
    text: string;
    secondTitle: string;
    secondText: string;
    analyseTitle: string;
    analyseTabOneTitle: string;
    analyseTabOneText: string;
    analyseTabTwoTitle: string;
    analyseTabTwoText: string;
  };
  page3: {
    title: string;
    text: string;
  };
  page4: {
    leftColTitle: string;
    leftColText: string;
    growthRatesTitle: string;
    trendsTitle: string;
    transactionsTitle: string;
    numberOfMAATransactions: string;
    numberOfTransactions: string;
    mostPopularTransactions: string;
    significantTransactions: string;
    ourExpertTitle: string;
  };
  page5: {
    title: string;
    text: string;
    bgTitle: string;
    bgText: string;
    leftColTitle: string;
    leftColText: string;
  };
  page6: {
    footer: string;
  };
};

export class PDFSettingsFacade {
  constructor(private readonly sanityService = new SanityService()) {}

  async getPDFSettings(): Promise<PDFSettings> {
    const pdfSettings = await this.sanityService.fetch(queryPDFSettings());

    return pdfSettings;
  }
}
