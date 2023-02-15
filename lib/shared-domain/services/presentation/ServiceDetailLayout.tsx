import React, { useState } from 'react';
import { Service, SiteSettings, Tab } from 'lib/shared-domain/page/domain';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';

import { PageTransition } from 'components/PageTransition';
import { ServiceHero } from 'lib/shared-domain/services/presentation/ServiceHero';
import { ServiceTransactions } from './ServiceTransactions';
import { ServiceSectors } from './ServiceSectors';
import { ServiceProcess } from 'lib/shared-domain/services/presentation/ServiceProcess';
import { SEO } from 'components/SEO';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { ServiceTabs } from 'lib/shared-domain/services/presentation/ServiceTabs';
import {
  ContentModule,
  serviceDetailSectionNames,
} from 'lib/shared-domain/page/domain/contentModule';
import { getContentForContentModule } from 'lib/shared-domain/page/presentation/contentModules';
import { ServiceHelpContactPerson } from 'lib/shared-domain/services/presentation/ServiceHelpContactPerson';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { ServiceTransactionShowcase } from 'lib/shared-domain/services/presentation/ServiceTransactionShowcase';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';
import { useFetchTransactions } from 'components/NewsArticle/NewsArticleMoreNews';

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
        <div key={module._key}>
          {getContentForContentModule(
            ContentModule.create(module),
            sharedContent,
          )}
        </div>
      );
    }
    const renderComponentBasedOnModuleType = (moduleType: string) =>
      ({
        [serviceDetailSectionNames.helpContactPerson]: (
          <div key={module._key}>
            <ServiceHelpContactPerson helpContactPerson={module as any} />
          </div>
        ),
        [serviceDetailSectionNames.processSection]: (
          <div key={module._key}>
            <ServiceProcess process={module} />
          </div>
        ),
        [serviceDetailSectionNames.serviceTransactionsSection]: (
          <div key={module._key}>
            <ServiceTransactions
              // @ts-ignore
              service={module}
              transactions={filteredTransactions}
              content={[]}
            />
          </div>
        ),
        [serviceDetailSectionNames.sectorsForThiServiceSection]: (
          <div key={module._key}>
            <ServiceSectors
              siteSettings={siteSettings}
              section={module}
              customHref={'/sectors'}
              displayMaxItems={4}
            />
          </div>
        ),
        [serviceDetailSectionNames.transactionShowcaseSection]: (
          <div key={module._key}>
            <ServiceTransactionShowcase
              siteSettings={siteSettings}
              transaction={filteredTransactions?.[0]}
              section={module}
            />
          </div>
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
    <div>
      <SEO
        seoTitle={service?.name}
        seoDescription={service?.description}
        siteSettings={siteSettings}
      />
      <PageHeader
        contentModules={contentModules}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={service?._id}>
        <ServiceHero service={service} />
        {service?.tabs && service?.tabs.length > 1 && (
          <ServiceTabs
            tabs={service?.tabs}
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
      <ContactUsSection
        specificContentModule={null}
        content={siteSettings.contactSectionContent}
      />
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
};
