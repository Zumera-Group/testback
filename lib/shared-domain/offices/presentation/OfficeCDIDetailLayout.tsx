import React from 'react';
import { SiteSettings } from '../../page/domain/index';
import { Office } from '../domain/index';
import { Box } from '../../../../components/Layout/Flex/Flex';
import { SEO } from '../../../../components/SEO';
import { PageHeader } from '../../page/presentation/PageHeader';
import { PageTransition } from '../../../../components/PageTransition';
import { OfficeCDIHero } from './OfficeCDIHero';
import { ContactUsSection } from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';
import { PageFooter } from '../../page/presentation/PageFooter';
import { OfficeCDINews } from './OfficeCDINews';
import { useFetchNewsArticles } from '../../newsArticle/application/useGetNewsArticles';
import { useFetchTransactions } from '../../newsArticle/presentation/NewsArticleMoreNews_DISABLED';

export const OfficeCDIDetailLayout: React.FC<{
  siteSettings: SiteSettings;
  office: Office;
  content: any;
}> = ({ siteSettings, office, content }) => {
  const newsArticles = useFetchNewsArticles();
  const transactions = useFetchTransactions();
  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={office.city}
        seoDescription={office.city}
        siteSettings={siteSettings}
      />

      <PageHeader contentModules={[]} siteSettings={siteSettings} darkBg />
      <PageTransition slug={office._id}>
        <OfficeCDIHero office={office} subtitle={content?.subtitle} />
        <OfficeCDINews
          office={office}
          newsArticles={newsArticles}
          transactions={transactions}
          content={content?.newsSectionContent}
        />
        <ContactUsSection
          content={content.contactUsSection}
          specificContentModule={null}
        />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
