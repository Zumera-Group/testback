import React from 'react';
import { SiteSettings } from 'lib/shared-domain/page/domain';
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
import { useFetchNewsArticles } from '../../newsArticle/application/useGetNewsArticles';
import { allLinks } from 'lib/links';
import { useFetchTransactions } from 'components/NewsArticle/NewsArticleMoreNews';
import { useMakeAlternateHrefs } from '../../../hooks/useMakeAlternateHrefs';

export const EmployeeDetailLayout: React.FC<{
  employee: Employee;
  siteSettings: SiteSettings;
  employeeDetailContent: any;
}> = ({ employee, siteSettings, employeeDetailContent }) => {
  const employees = useFetchEmployees();
  const transactions = useFetchTransactions();
  const newsArticles = useFetchNewsArticles();

  const {alternateHrefs, canonicalHref} = useMakeAlternateHrefs({
    doc: employee,
    urlPrefixes: getEmployeeUrlPrefixes()
  });

  // const otherLangSlug =
  //   employee?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
  //   links(locale === 'en' ? 'de' : 'en').employees(
  //     employee?.queryOtherLangSlug?.slice(-1)[0] as any,
  //   );

  return (
    <div>
      <SEO
        seoTitle={getEmployeeFullName(employee)}
        seoDescription={employee.jobTitle}
        siteSettings={siteSettings}
        seoImage={employee.detailPagePicture?.picture}
        langAlternates={alternateHrefs}
        canonicalHref={canonicalHref}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        langAlternates={alternateHrefs}
        // otherLangSlug={otherLangSlug}
      />
      <PageTransition>
        <EmployeeHero
          employee={employee}
          content={employeeDetailContent?.heroSectionContent}
        />
        <EmployeeBackground
          employee={employee}
          content={employeeDetailContent?.backgroundSectionContent || {}}
        />
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
        <EmployeeContact {...siteSettings.contactSectionContent} />
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
};

const getEmployeeUrlPrefixes = () => {
  const out: {[key: string]: string} = {};

  for (const [key, val] of Object.entries(allLinks.employees)) {
    out[key] = `/${val}`;
  }

  return out;
};