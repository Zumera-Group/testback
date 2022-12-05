import { Box, Grid, GridItem } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { LinkWithArrow } from 'lib/shared-domain/page/presentation/components/LinkWithArrow';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';

import React from 'react';
import {
  TransactionCard,
  transactionCardVariants,
} from './components/TransactionCard';
import { Transaction } from '../domain/index';

export const TransactionShowcase: React.FC<{
  title: string;
  subtitle: string;
  description: string | any[];
  viewAllButton: {
    title: string;
    href: string;
  };
  transactionLinkText: string;
  transaction: Transaction;
  sharedContent?: any;
}> = ({
  title,
  subtitle,
  description,
  transactionLinkText,
  viewAllButton,
  transaction,
  sharedContent,
}) => {
  if (!transaction) return null;

  return (
    <SectionContainer py="md">
      <Grid
        templateColumns="repeat(auto-fit, minmax(330px, 1fr))"
        gap={6}
        mb={10}
      >
        <GridItem>
          <TitleWithSubtitleAndDescription
            title={title}
            subtitle={subtitle}
            description={description}
          />
          {viewAllButton?.href && viewAllButton?.title && (
            <Box mt={4}>
              <LinkWithArrow
                href={viewAllButton.href}
                title={viewAllButton.title}
              />
            </Box>
          )}
        </GridItem>
        <GridItem>
          <TransactionCard
            variant={transactionCardVariants.newsGrid}
            linkText={transactionLinkText}
            transaction={transaction}
          />
        </GridItem>
      </Grid>
    </SectionContainer>
  );
};
