import React from 'react';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';

import { Employee } from '../domain/index';
import { getEmployeeFullName } from '../domain/getEmployeeFullName';
import { EmployeeHero } from './EmployeeHero';
import { EmployeeBackground } from './EmployeeBackground';
import { EmployeeMoreMembers } from './EmployeeMoreMembers';
import { EmployeeNews } from './EmployeeNews';
import { EmployeeContact } from './EmployeeContact';
import { SEO } from 'components/SEO';
import { useFetchEmployees } from '../application/useGetEmployees';
import { useFetchTransactions } from '../../newsArticle/presentation/NewsArticleMoreNews';
import { useFetchNewsArticles } from '../../newsArticle/application/useGetNewsArticles';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { EmployeeReportDownload } from './EmployeeReportDownload';

export const EmployeeDetailLayout: React.FC<{
  employee: Employee;
  siteSettings: SiteSettings;
  employeeDetailContent: any;
}> = ({ employee, siteSettings, employeeDetailContent }) => {
  const employees = useFetchEmployees();
  const transactions = useFetchTransactions();
  const newsArticles = useFetchNewsArticles();
  const { locale } = useRouter();

  const otherLangSlug =
    employee?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').employees(
      employee?.queryOtherLangSlug?.slice(-1)[0] as any,
    );

  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={getEmployeeFullName(employee)}
        seoDescription={employee.jobTitle}
        siteSettings={siteSettings}
        seoImage={employee.detailPagePicture?.picture}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={employee._id}>
        <EmployeeHero
          employee={employee}
          content={employeeDetailContent?.heroSectionContent}
        />
        <EmployeeBackground
          employee={employee}
          content={employeeDetailContent?.backgroundSectionContent}
        />
        <EmployeeReportDownload employee={employee} />
        <EmployeeNews
          employee={employee}
          newsArticles={newsArticles}
          transactions={transactions}
          content={employeeDetailContent?.newsSectionContent}
        />
        <EmployeeMoreMembers
          employee={employee}
          employees={employees}
          content={employeeDetailContent?.teamSectionContent}
        />
        <EmployeeContact
          content={employeeDetailContent?.contactSectionContent}
        />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
