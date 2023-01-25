import React from 'react';
import { AchievedMultipleTransactions } from './AchievedMultipleTransactions';
import { Transaction } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { Box } from 'components/Layout/Flex/Flex';
import { PageFooter } from 'lib/shared-domain/page/presentation/PageFooter';
import { PageHeader } from 'lib/shared-domain/page/presentation/PageHeader';
import { TransactionHero } from 'lib/shared-domain/transactions/presentation/TransactionHero';
import { TransactionCompany } from './TransactionCompany';
import { TransactionKeyfacts } from './TransactionKeyfacts';
import { TransactionValues } from './TransactionValues';
import { SelectedTransactions } from './SelectedTransactions';
import { TransactionSector } from './TransactionSector';
import { TransactionTeam } from './TransactionTeam';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { links } from 'lib/links';
import { useRouter } from 'next/router';
import { TransactionInvolvedParties } from './TransactionInvolvedParties';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';

export const TransactionDetailLayout: React.FC<{
  transaction: Transaction;
  siteSettings: SiteSettings;
  transactionDetailContent: any;
}> = ({ transaction, siteSettings, transactionDetailContent }) => {
  const { locale } = useRouter();

  const otherLangSlug =
    transaction?.queryOtherLangSlug?.slice(-1)[0]?.slug &&
    links(locale === 'en' ? 'de' : 'en').transactions(
      transaction?.queryOtherLangSlug?.slice(-1)[0] as any,
    );
  return (
    <Box minHeight="100vh" overflowX="hidden">
      <SEO
        seoTitle={transaction.headline}
        seoDescription={transaction.description}
        seoImage={transaction.companyLogo1}
        siteSettings={siteSettings}
      />
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        otherLangSlug={otherLangSlug}
      />
      <PageTransition slug={transaction._id}>
        <TransactionHero
          transaction={transaction}
          content={transactionDetailContent.heroSectionContent}
        />
        <TransactionCompany
          transaction={transaction}
          content={transactionDetailContent.companySection}
        />
        <TransactionKeyfacts
          transaction={transaction}
          content={transactionDetailContent.keyFactsSection}
        />
        <TransactionValues
          transaction={transaction}
          content={transactionDetailContent.valuesSection}
        />
        <TransactionTeam
          transaction={transaction}
          content={transactionDetailContent.teamSection}
        />
        {transaction?.optionalUI?.hasAchievedTransactionMultiples && (
          <AchievedMultipleTransactions
            content={
              transactionDetailContent.averageMultipleTransactionsSection
            }
            sectorMultiple={transaction.optionalUI.sectorMultipleAverage}
            transactionMultiple={
              transaction.optionalUI.achievedTransactionMultiple
            }
          />
        )}

        {transaction?.optionalUI?.hasInvolvedParties && (
          <TransactionInvolvedParties optionalUI={transaction?.optionalUI} />
        )}

        <TransactionSector
          transaction={transaction}
          content={transactionDetailContent.sectorSection}
        />
        <SelectedTransactions
          transaction={transaction}
          content={transactionDetailContent.selectedTransactionSection}
        />
      </PageTransition>
      <ContactUsSection
        specificContentModule={null}
        content={siteSettings.contactSectionContent}
      />
      <PageFooter siteSettings={siteSettings} />
    </Box>
  );
};
