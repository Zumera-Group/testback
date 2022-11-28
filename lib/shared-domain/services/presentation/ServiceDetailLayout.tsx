import React, { useState } from 'react';
import { Service, SiteSettings, Tab } from 'lib/shared-domain/page/domain';
import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
import { ServiceHero } from './ServiceHero';
import { ServiceTransactions } from './ServiceTransactions';
import { ServiceTransactionShowcase } from './ServiceTransactionShowcase';
import { ServiceSectors } from './ServiceSectors';
import { ServiceProcess } from './ServiceProcess';
import { SEO } from 'components/SEO';
import { useFetchTransactions } from '../../newsArticle/presentation/NewsArticleMoreNews';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { ServiceTabs } from './ServiceTabs';
import {
  ContentModule,
  serviceDetailSectionNames,
} from 'lib/shared-domain/page/domain/contentModule';
import { getContentForContentModule } from 'lib/shared-domain/page/presentation/contentModules';
import { ServiceHelpContactPersonSection } from './ServiceHelpContactPerson';
import { Transaction } from 'lib/shared-domain/transactions/domain';

interface ServiceDetailProps {
  service: Service;
  siteSettings: SiteSettings;
  sharedContent?: any;
}

interface ModuleSectionsProps extends ServiceDetailProps {
  selectedTab: Tab;
  filteredTransactions: Transaction[];
}

const displayServiceDetailSectionOrContentModule = ({
  selectedTab,
  siteSettings,
  sharedContent,
  service,
  filteredTransactions,
}: ModuleSectionsProps) =>
  selectedTab?.contentModules?.map((module) => {
    if (!serviceDetailSectionNames[module._type]) {
      return (
        <Box key={module._key}>
          {getContentForContentModule(
            ContentModule.create(module),
            sharedContent,
          )}
        </Box>
      );
    }

    const renderComponentBasedOnModuleType = (moduleType: string) =>
      ({
        [serviceDetailSectionNames.helpContactPerson]: (
          <Box key={module._key}>
            <ServiceHelpContactPersonSection helpContactPerson={module} />
          </Box>
        ),
        [serviceDetailSectionNames.processSection]: (
          <Box key={module._key}>
            <ServiceProcess process={module} />
          </Box>
        ),
        [serviceDetailSectionNames.serviceTransactionsSection]: (
          <Box key={module._key}>
            <ServiceTransactions
              section={module}
              transactions={filteredTransactions}
            />
          </Box>
        ),
        [serviceDetailSectionNames.sectorsForThiServiceSection]: (
          <Box key={module._key}>
            <ServiceSectors siteSettings={siteSettings} section={module} />
          </Box>
        ),
        [serviceDetailSectionNames.transactionShowcaseSection]: (
          <Box key={module._key}>
            <ServiceTransactionShowcase
              siteSettings={siteSettings}
              transaction={filteredTransactions?.[0]}
              section={module}
            />
          </Box>
        ),
      }[moduleType] || null);

    return renderComponentBasedOnModuleType(module._type);
  });

export const ServiceDetailLayout: React.FC<ServiceDetailProps> = ({
  service,
  siteSettings,
  sharedContent,
}) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(
    service?.tabs?.[0] ?? ({} as Tab),
  );
  const transactions = useFetchTransactions();
  const filteredTransactions: Transaction[] = transactions.filter(
    (t) => t.typeOfService && t.typeOfService._id === service._id,
  );
  const { locale } = useRouter();

  const otherLangSlug =
    service?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').services(
      service?.queryOtherLangSlug?.slice(-1)[0] as any,
    );

  const contentModules =
    selectedTab?.contentModules?.map((c) => ContentModule.create(c)) || [];

  const onSelectTab = (t: Tab) => setSelectedTab(t);

  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={service.name}
        seoDescription={service.description}
        siteSettings={siteSettings}
      />
      <PageHeader
        contentModules={contentModules}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={service._id}>
        <ServiceHero service={service} />
        {service?.tabs && service?.tabs.length > 1 && (
          <ServiceTabs
            tabs={service.tabs}
            onSelectTab={onSelectTab}
            activeTabKey={selectedTab?._key}
          />
        )}

        {contentModules &&
          displayServiceDetailSectionOrContentModule({
            selectedTab,
            siteSettings,
            sharedContent,
            service,
            filteredTransactions,
          })}
      </PageTransition>
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
