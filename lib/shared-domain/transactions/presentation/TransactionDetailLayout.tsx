import React from 'react';
import { Transaction } from '../domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
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
import { allLinks } from 'lib/links';
import { TransactionInvolvedParties } from './TransactionInvolvedParties';
import ContactUsSection from 'lib/shared-domain/page/presentation/contentModules/ContactUsSection';
import { useMakeAlternateHrefs } from '../../../hooks/useMakeAlternateHrefs';

export const TransactionDetailLayout: React.FC<{
  transaction: Transaction;
  siteSettings: SiteSettings;
  transactionDetailContent: any;
}> = ({ transaction, siteSettings, transactionDetailContent }) => {
  const {alternateHrefs, canonicalHref} = useMakeAlternateHrefs({
    doc: transaction,
    urlPrefixes: getTransactionsUrlPrefixes()
  });

  return (
    <div>
      <SEO
        seoTitle={transaction.headline}
        seoDescription={transaction.description}
        seoImage={transaction.companyLogo1}
        siteSettings={siteSettings}
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
    </div>
  );
};

const getTransactionsUrlPrefixes = () => {
  const out: {[key: string]: string} = {};

  for (const [key, val] of Object.entries(allLinks.transactions)) {
    out[key] = `/${val}`;
  }

  return out;
};