import React from 'react';

import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';

import { Sector } from '../../page/domain/index';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import { icons } from 'components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import { Transaction } from 'lib/shared-domain/transactions/domain';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import { CardDownload } from '../../newsArticle/presentation/newsCards';
import { IndustryReportSection } from 'lib/shared-domain/page/presentation/contentModules/IndustryReportSection';
import { IndustryReportSectionModule } from '../../page/domain/contentModule';

const SectionWithTitle: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Box mb={2}>
      <P
        lineHeight="16px"
        fontWeight={fontWeights.regular}
        fontSize={fontSizes.h2}
        color={colors.primary.darkGreen}
        textTransform="capitalize"
      >
        {title}
      </P>
      {children}
    </Box>
  );
};

const TitleWithText: React.FC<{
  title: string;
  text?: string;
}> = ({ title, text }) => {
  const MARGIN_BOTTOM = text ? 4 : 0;
  return (
    <Box mt={2} mb={MARGIN_BOTTOM}>
      <P mb={0.5} fontWeight={fontWeights.highlight} fontSize={fontSizes.h3}>
        {title}
      </P>
      {text && <P color={colors.text.light}>{text}</P>}
    </Box>
  );
};

const AccordionItem: React.FC<{
  title: string;
  text: string;
}> = ({ title, text }) => {
  const [showText, setShowText] = React.useState(false);
  return (
    <Box mt={3} width="100%">
      <FlexRow
        py={1}
        width="100%"
        onClick={() => setShowText(!showText)}
        as="button"
        borderBottomColor={colors.black}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        alignItems="center"
        justifyContent="space-between"
      >
        <P
          textAlign="left"
          maxWidth="90%"
          mb={1}
          fontSize={fontSizes.h3}
          fontWeight={fontWeights.highlight}
        >
          {title}
        </P>
        <Box
          transition=".2s ease-in all"
          transform={
            showText ? 'rotate(-270deg)' : 'rotate(-90deg) translateY(-5px)'
          }
        >
          <icons.ChevronLeft color="black" />
        </Box>
      </FlexRow>
      <AnimatePresence>
        {showText && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ y: '-20px', height: 0 }}
            animate={{ y: 0, height: 'auto' }}
            exit={{ height: 0, y: '-20px' }}
          >
            <Box pt={2}>
              <P color={colors.text.light}>{text}</P>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export const SectorInfoSection: React.FC<{
  sector: Sector;
  sectorTransactions: Transaction[];
  siteSettings: SiteSettings;
  content: any;
  sharedContent?: any;
}> = ({ sector, sectorTransactions, siteSettings, sharedContent, content }) => {
  const t = (item) => content?.[item];

  return (
    <SectionContainer py="md">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box mr={{ base: 0, md: 10 }}>
          <TitleWithSubtitleAndDescription
            title={sector.infoSection?.title}
            subtitle={sector.infoSection?.subtitle}
            description={sector.infoSection?.description}
          />

          <Box mt={6}>
            {sector.accordionAnswers?.map((answer, index) => (
              <AccordionItem
                key={index}
                title={content?.accordionQuestions[index]}
                text={answer}
              />
            ))}
          </Box>
        </Box>
        <Flex align="flex-start">
          <Box
            p={{ base: 4, md: 6 }}
            background="linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%)"
            w="100%"
          >
            {sector.growthRatesTable &&
              sector.growthRatesTable?.growthRates.length > 0 && (
                <SectionWithTitle title={t('growthRatesTable')}>
                  <FlexRow flexWrap="wrap">
                    {sector.growthRatesTable.growthRates?.map((t, index) => (
                      <FlexCol key={index} flexBasis="80px">
                        <TitleWithText title={t.title} text={t.subtitle} />
                      </FlexCol>
                    ))}
                  </FlexRow>
                </SectionWithTitle>
              )}
            {sector.trendsTable && sector.trendsTable.trends?.length > 0 && (
              <SectionWithTitle title={t('trendsTitle')}>
                {sector.trendsTable.trends?.map((t, index) => (
                  <TitleWithText
                    title={t.title}
                    text={t.subtitle}
                    key={index}
                  />
                ))}
              </SectionWithTitle>
            )}
            {sector.transactionsTable && (
              <SectionWithTitle title={content?.transactionsTable?.tableTitle}>
                <TitleWithText
                  title={content?.transactionsTable?.numberTitle}
                  text={`${sectorTransactions.length}`}
                />
                {sector.transactionsTable.mostPopularTransaction && (
                  <TitleWithText
                    title={content?.transactionsTable?.mostPopularTitle}
                    text={`${sector.transactionsTable.mostPopularTransaction?.companyName1} x ${sector.transactionsTable.mostPopularTransaction?.companyName2}`}
                  />
                )}
                {sector.transactionsTable && (
                  <>
                    <TitleWithText
                      title={content?.transactionsTable?.mAndANumber}
                      text={sector.transactionsTable?.mAndATransactionsNumber}
                    />
                    <TitleWithText
                      title={
                        content?.transactionsTable?.significantTransactionsTitle
                      }
                    />
                    {sector?.transactionsTable?.significantTransactions?.map?.(
                      (s, i) => {
                        const hasBorder = i !== 0;
                        return (
                          <P
                            key={i}
                            py={2}
                            borderTop={
                              hasBorder ? `1px solid ${colors.black}` : null
                            }
                          >
                            {`${s.company1.trim()} X ${s.company2.trim()}
                          ${s.year ? `(${s.year})` : null}`}
                          </P>
                        );
                      },
                    )}
                  </>
                )}
              </SectionWithTitle>
            )}
          </Box>
        </Flex>
      </SimpleGrid>

      <SimpleGrid mt={4} columns={{ base: 1, md: 2 }} spacing={5}>
        <Box>
          {sector.futureTrendsSection && (
            <TitleWithSubtitleAndDescription
              title={sector.futureTrendsSection.title}
              description={sector.futureTrendsSection.trendDescription}
            />
          )}
        </Box>
        {sector.report && (
          <Box height="fit-content">
            <CardDownload
              content={{
                ...sector?.report,
                buttonCaption: sector?.report?.buttonText,
                emailLabel: sector?.report?.emailPlaceholder,
              }}
            />
          </Box>
        )}
      </SimpleGrid>
    </SectionContainer>
  );
};
