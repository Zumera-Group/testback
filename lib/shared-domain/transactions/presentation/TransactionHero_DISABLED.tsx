import React from 'react';

import { Transaction } from '../domain/index';
import backgroundImage1 from '../../../../public/transactionDetail/hero-bg-1.png';
import backgroundImage2 from '../../../../public/transactionDetail/hero-bg-2.png';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { HEADER_HEIGHT } from '../../page/constants';
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { colors } from 'styles/foundations/colors';
import { P } from 'components/Typography/P';
import {
  TransactionCard,
  transactionCardVariants,
} from './components/TransactionCard';
import {
  fontWeights,
  fontSizes,
} from '../../../../styles/foundations/fontStyles';
import { Btn } from 'components/Buttons/Button';
import Link from 'next/link';
import { links } from 'lib/links';

const TitleWithText: React.FC<{
  title: string;
  text: string;
  fontSize?: string;
}> = ({ title, text }) => {
  return (
    <Box>
      <P
        mb={1}
        fontSize={fontSizes.small}
        color={colors.white}
        fontWeight={fontWeights.bold}
      >
        {title}
      </P>
      <P fontSize={fontSizes.h3} color={colors.duckEgg}>
        {text}
      </P>
    </Box>
  );
};

export const TransactionHero_DISABLED: React.FC<{
  transaction: Transaction;
  content: any;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <FlexCol
        width="100%"
        justifyContent="center"
        backgroundImage={`url(${backgroundImage1.src})`}
        backgroundPosition="center bottom"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundAttachment={!isMobile && 'fixed'}
      >
        <SectionContainer py="md">
          <Box mt={HEADER_HEIGHT}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
              <Box mt={4} mr={6}>
                <TitleWithSubtitleAndDescription
                  subtitle={t('heroSubtitle')}
                  description={transaction.subHeadline}
                  title={transaction.headline}
                  headingType="h1"
                />
              </Box>
              <TransactionCard
                linkText=""
                transaction={transaction}
                variant={transactionCardVariants.hero}
              />
            </SimpleGrid>
          </Box>
        </SectionContainer>
      </FlexCol>
      {(transaction.description || transaction.newsPressRelease) && (
        <FlexCol
          width="100%"
          justifyContent="center"
          backgroundImage={`url(${backgroundImage2.src})`}
          backgroundPosition="center top"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        >
          <SectionContainer py="md">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
              <Box>
                {transaction.description && (
                  <TitleWithText
                    fontSize={fontSizes.h2}
                    title={
                      content.pressReleaseSection.pressReleaseSectionSubtitle
                    }
                    text={transaction.description}
                  />
                )}
              </Box>

              <FlexCol>
                {transaction.newsPressRelease && (
                  <Box
                    mt={{ base: 2 }}
                    justifyContent="space-between"
                    backgroundColor={colors.white}
                    px={5}
                    py={4}
                  >
                    <Box>
                      <P
                        mb={2}
                        fontSize={fontSizes.websiteTransactionDetailH}
                        color={colors.primary.darkGreen}
                      >
                        {content.pressReleaseSection.title}
                      </P>
                      <P color={colors.primary.darkGreen}>
                        {content.pressReleaseSection.text}
                      </P>
                    </Box>
                    <Link
                      href={links().newsArticles(transaction.newsPressRelease)}
                      passHref
                    >
                      <Btn
                        aria-label="Press release button"
                        as="a"
                        width="100%"
                        mt={6}
                        variant="outlineGreen"
                      >
                        {content.pressReleaseSection.buttonText}
                      </Btn>
                    </Link>
                  </Box>
                )}
              </FlexCol>
            </SimpleGrid>
          </SectionContainer>
        </FlexCol>
      )}
    </>
  );
};
