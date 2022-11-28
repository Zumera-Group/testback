import { icons } from 'components/Icons';
import { FlexCol, Box } from 'components/Layout/Flex/Flex';
import React from 'react';
import { Transaction } from '../../domain';
import { TransactionCard, transactionCardVariants } from './TransactionCard';
import { CostumedCarousel } from './Carousel';

const CAROUSEL_SHARED_PROPS = {
  iconRight: (
    <Box transform="rotate(180deg)">
      <icons.ChevronLeft />
    </Box>
  ),
  iconLeft: <icons.ChevronLeft />,
};

export const TransactionCarousel: React.FC<{
  transactions: Transaction[];
  linkText: string;
  mt?: any;
}> = ({ transactions, linkText, mt }) => {
  if (!transactions || transactions?.length === 0) return null;
  return (
    <FlexCol>
      <FlexCol mt={mt != null ? mt : 16} />

      <CostumedCarousel {...CAROUSEL_SHARED_PROPS}>
        {transactions
          .slice(0, 50)
          ?.sort(
            (a, b) =>
              new Date(b.date || null).getTime() -
              new Date(a.date || null).getTime(),
          )
          .map((t) => (
            <FlexCol
              key={t._id}
              style={{ margin: 4 }}
              py={4}
              minWidth="calc(100% - 32px)"
              maxWidth="calc(100% - 32px)"
            >
              <TransactionCard
                variant={transactionCardVariants.carousel}
                transaction={t}
                linkText={linkText}
              />
            </FlexCol>
          ))}
      </CostumedCarousel>
    </FlexCol>
  );
};
