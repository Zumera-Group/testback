import React from 'react';
import { Sector, SiteSettings } from 'lib/shared-domain/page/domain';
import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
import { SectorHero } from './SectorHero';
import { SectorInfoSection } from './SectorInfoSection';
import { SectorTeam } from './SectorTeam';
import { SectorTransactions } from './SectorTransactions';
import { SectorNews } from './SectorNews';
import { SectorMoreDetails } from './SectorMoreDetails';
import { SEO } from 'components/SEO';
import { ServiceQuestionnaire } from 'lib/shared-domain/services/presentation/ServiceQuestionnaire';
import { useFetchTransactions } from '../../newsArticle/presentation/NewsArticleMoreNews';
import { useFetchNewsArticles } from '../../newsArticle/application/useGetNewsArticles';
import { useFetchEmployees } from '../../employees/application/useGetEmployees';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { IndustryReportSection } from '../../page/presentation/contentModules/IndustryReportSection';

export const SectorDetailLayout: React.FC<{
  sector: Sector;
  siteSettings: SiteSettings;
  content: any;
  sharedContent: any;
}> = ({ sector, siteSettings, content, sharedContent }) => {
  const transactions = useFetchTransactions();
  const newsArticles = useFetchNewsArticles();
  const employees = useFetchEmployees();

  const filteredTransactions = transactions.filter(
    (t) =>
      t.sectors && t.sectors?.map((s) => s?._id).indexOf(sector._id) !== -1,
  );
  const filteredNewsArticles = newsArticles.filter(
    (n) =>
      n.sectors && n.sectors?.map((s) => s?._id).indexOf(sector._id) !== -1,
  );
  const { locale } = useRouter();

  const otherLangSlug =
    sector?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').sectors(
      sector?.queryOtherLangSlug?.slice(-1)[0] as any,
    );

  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={sector.name}
        seoDescription={sector.description}
        siteSettings={siteSettings}
        seoImage={sector?.graph?.iconImage}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={sector._id}>
        <SectorHero sector={sector} content={content?.heroSectionContent} />

        <SectorInfoSection
          siteSettings={siteSettings}
          sectorTransactions={filteredTransactions}
          sector={sector}
          content={content?.infoSectionContent}
          sharedContent={sharedContent}
        />
        {sector?.industryReportSection && (
          <IndustryReportSection
            specificContentModule={sector.industryReportSection}
          />
        )}
        <SectorTeam sector={sector} />
        <SectorMoreDetails sector={sector} content={content} />
        <SectorNews
          newsArticles={filteredNewsArticles}
          employees={employees}
          transactions={filteredTransactions}
          sector={sector}
          content={content?.newsSectionContent}
        />
        <SectorTransactions
          sector={sector}
          transactions={filteredTransactions}
          content={content?.sectorTransactionsContent}
        />
        {sector.calculatorTeaserSection && (
          <ServiceQuestionnaire section={sector.calculatorTeaserSection} />
        )}
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
