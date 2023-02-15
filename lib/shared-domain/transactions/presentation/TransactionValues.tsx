// import { Flex, SimpleGrid } from '@chakra-ui/react';
// import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { H } from 'components/Typography/H';
import React from 'react';
// import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { Transaction } from '../domain/index';
import { P } from '../../../../components/Typography/P';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { colors } from 'styles/foundations/colors';
// import { icons } from 'components/Icons';
//TODO: To delete (double check)
export const TransactionValues: React.FC<{
  transaction: Transaction;
  content;
}> = ({ transaction, content }) => {
  const t = (item) => content?.[item];

  if (
    (!transaction.valueFacts || transaction.valueFacts?.length === 0) &&
    !transaction.processDescription
  )
    // console.log(transaction.valueFacts);
    return null;
  // return (
  //   <Box background="linear-gradient(264.95deg, #E0C6B7 -2.77%, #F8F8E6 62.17%)">
  //     <SectionContainer py="md">
  //       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
  //         {transaction.valueFacts && transaction.valueFacts?.length > 0 && (
  //           <Box maxWidth="90%">
  //             <>
  //               <TitleWithSubtitleAndDescription title={t('title')} />
  //               <Box mt={4}>
  //                 {transaction.valueFacts?.map((t, index) => (
  //                   <FlexRow mb={4} flex={1} key={index}>
  //                     <icons.BurgerOpen size="26px" color={colors.black} />
  //                     <Box ml={2}>
  //                       <P fontWeight={fontWeights.highlight} mb={1.5}>
  //                         {t.title}
  //                       </P>
  //                       <P color={colors.gray[800]}>{t.subtitle}</P>
  //                     </Box>
  //                   </FlexRow>
  //                 ))}
  //               </Box>
  //             </>
  //           </Box>
  //         )}
  //         <Box>
  //           {transaction.processDescription && (
  //             <Box px={5} py={5} backgroundColor={colors.white}>
  //               <TitleWithSubtitleAndDescription
  //                 title={t('processTitle')}
  //                 subtitle={t('processSubtitle')}
  //                 description={transaction.processDescription}
  //               />
  //             </Box>
  //           )}
  //         </Box>
  //       </SimpleGrid>
  //     </SectionContainer>
  //   </Box>
  // );
};
