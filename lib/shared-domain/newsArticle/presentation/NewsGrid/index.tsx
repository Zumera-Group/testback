import React, { useEffect } from 'react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { Flex } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { NewsGridCard } from '../newsCards';
import { NewsArticle } from '../../domain/index';
import { Transaction } from '../../../transactions/domain/index';
import { Employee } from 'lib/shared-domain/employees/domain';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { UpAnimation } from 'lib/animations/ZoomInAnimation';
import { CardType, gridItemsConfig, useNewsGridWidthSizes } from './interfaces';
import {
  EmployeeComponent,
  OneForTwoNewsComponent,
  NewsBigComponent,
  TransactionBigComponent,
} from './components';
import { sharedStyle } from './constants';

// const CardGrid = ({
//   news,
//   transactions,
//   employee,
//   linkText,
//   isDownloadVisible,
//   isAfterSecondBlock,
// }): any => {
//   // const isMobile = useBreakpointValue({ base: true, md: false });
//   const widthSizes = useNewsGridWidthSizes();
//   const { downloadButtonContent } = useSharedContentContext();

//   let Items = gridItemsConfig({ isDownloadVisible }).map((item) => {
//     if (!item) return null;
//     if (item.type === CardType.Employee) {
//       if (!employee) return null;

//       return <EmployeeComponent employee={employee} linkText={linkText} />;
//     }

//     if (item.type === CardType.TwoNews) {
//       const firstItem = news?.[item.index1];
//       const secondItem = news?.[item.index2];
//       if (!firstItem && !secondItem) return null;

//       return (
//         <Flex direction="column" boxShadow="none">
//           <FlexCol mb={1}>
//             <OneForTwoNewsComponent
//               newsArticle={firstItem}
//               linkText={linkText}
//             />
//           </FlexCol>
//           <FlexCol mt={1}>
//             <OneForTwoNewsComponent
//               newsArticle={secondItem}
//               linkText={linkText}
//             />
//           </FlexCol>
//         </Flex>
//       );
//     }

//     if (item.type === CardType.NewsBig) {
//       const firstItem = news?.[item.index1];
//       if (!firstItem) return null;

//       return (
//         <NewsBigComponent
//           newsArticle={firstItem}
//           light={item.light}
//           linkText={linkText}
//         />
//       );
//     }

//     if (item.type === CardType.TransactionBig) {
//       const firstItem = transactions?.[item.index1];
//       if (!firstItem) return null;

//       return (
//         <TransactionBigComponent transaction={firstItem} linkText={linkText} />
//       );
//     }

//     if (item.type === CardType.Download) {
//       return <NewsGridCard.Download content={downloadButtonContent} />;
//     }

//     return null;
//   });

//   Items = Items.filter((v) => v);

//   return widthSizes.map((c, i) => {
//     if (!Items[i]) return null;
//     const isLast = Items.length - 1 === i && Items.length % 2 !== 0;
//     let width = c;
//     if (isLast || isAfterSecondBlock) {
//       width = '50%';
//     }
//     // if (isMobile) {
//     //   width = '100%';
//     // }

//     return (
//       <div
//         key={i}
//         style={{
//           width,
//           // paddingLeft: !isMobile ? '16px' : '0',
//           // paddingRight: !isMobile ? '16px' : '0',
//           paddingTop: '16px',
//           paddingBottom: '16px',
//           minHeight: sharedStyle.minHeight,
//         }}
//       >
//         <UpAnimation>{Items[i]}</UpAnimation>
//       </div>
//     );
//   });
// };

const removeIfNotCDI = (t, showOnlyCDI) =>
  !showOnlyCDI || (showOnlyCDI && t.hasCDIRelation);

const sortByTime = (a, b) =>
  new Date(b.date || null).getTime() - new Date(a.date || null).getTime();

export const NewsGrid: React.FC<{
  title: string;
  subtitle: string;
  description: string | any[];
  newsArticles: NewsArticle[];
  showAllNews?: boolean;
  employees: Employee[];
  transactions: Transaction[];
  linkText: string;
  loadMoreText?: string;
  allNewsLinkText?: string;
  showOnlyCDI?: boolean;
  displayDownload?: boolean;
  shouldHideCDITransactions?: boolean;
  shouldHidePeopleUpdates?: boolean;
  initialNumberOfRepetitions?: number;
}> = ({
  title,
  subtitle,
  description,
  newsArticles: allNews,
  showAllNews,
  employees: allEmployees,
  transactions: allTransactions,
  linkText,
  loadMoreText,
  displayDownload = false,
  allNewsLinkText,
  showOnlyCDI = false,
  shouldHideCDITransactions,
  shouldHidePeopleUpdates,
  initialNumberOfRepetitions = 1,
}) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  // const [numberOfRepetitions, setNumberOfRepetitions] = React.useState(
  //   initialNumberOfRepetitions,
  // );
  // const [hasMoreDataToLoad, setHasMoreDataToLoad] = React.useState(true);

  // const numOfTransactionsDisplayed = 3;
  // const numOfNewsDisplayed = 5;

  // const news = allNews
  //   ?.filter((n) => !n.isPressRelease)
  //   ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
  //   .sort(sortByTime);

  // let transactions = allTransactions
  //   ?.filter((n) => removeIfNotCDI(n, showOnlyCDI))
  //   ?.sort(sortByTime);

  // let employees = !shouldHidePeopleUpdates
  //   ? allEmployees
  //       ?.map((value) => ({ value, sort: Math.random() }))
  //       .sort((a, b) => a.sort - b.sort)
  //       .map(({ value }) => value)
  //   : [];

  // employees = employees?.filter(
  //   (e) => !!e.newsGridPicture?.picture?.asset?.url,
  // );

  // useEffect(() => {
  //   const noMoreTransactionsToLoad =
  //     transactions?.length <= numOfTransactionsDisplayed * numberOfRepetitions;
  //   const noMoreNewsToLoad =
  //     news?.length <= numOfNewsDisplayed * numberOfRepetitions;
  //   const noMoreEmployeesToLoad = employees?.length <= numberOfRepetitions;
  //   const noMoreDataToLoad =
  //     noMoreTransactionsToLoad && noMoreNewsToLoad && noMoreEmployeesToLoad;

  //   const newsPageGridData = showAllNews && loadMoreText && !noMoreDataToLoad;
  //   const detailPageGridData = loadMoreText && !noMoreDataToLoad;
  //   if (newsPageGridData || detailPageGridData) {
  //     setHasMoreDataToLoad(true);
  //   } else if (noMoreDataToLoad) {
  //     setHasMoreDataToLoad(false);
  //   }
  // }, [
  //   numberOfRepetitions,
  //   transactions,
  //   news,
  //   employees,
  //   allNewsLinkText,
  //   showAllNews,
  //   loadMoreText,
  // ]);

  // if (transactions && shouldHideCDITransactions) {
  //   transactions = transactions?.filter((t) => !t.hasCDIRelation);
  // }
  return null;
  // return (
  //   <SectionContainer py="md">
  //     <Box mb={8} width={'100%'}>
  //       <TitleWithSubtitleAndDescription
  //         title={title}
  //         subtitle={subtitle}
  //         description={description}
  //       />
  //     </Box>

  //     <div
  //       style={{
  //         display: 'flex',
  //         flexWrap: 'wrap',
  //       }}
  //     >
  //       {new Array(numberOfRepetitions).fill(undefined).map((_i, i) => {
  //         const numT = numOfTransactionsDisplayed;
  //         const numN = numOfNewsDisplayed;
  //         return (
  //           <CardGrid
  //             key={i}
  //             transactions={transactions?.slice(i * numT, numT + i * numT)}
  //             employee={employees?.[i]}
  //             news={news?.slice(i * numN, numN + i * numN)}
  //             linkText={linkText}
  //             isDownloadVisible={i === 0 && displayDownload}
  //             isAfterSecondBlock={i > 0}
  //           />
  //         );
  //       })}
  //     </div>

  //     {/* {hasMoreDataToLoad ? (
  //       <Flex justify="center" align="center" mt={isMobile ? 4 : 7}>
  //         <P
  //           onClick={() => setNumberOfRepetitions(numberOfRepetitions + 1)}
  //           as="button"
  //           transition=".2s ease-in all"
  //           _hover={{
  //             transform: 'translateY(-2px)',
  //           }}
  //           pb={1}
  //           borderBottomStyle="solid"
  //           borderBottomColor={colors.black}
  //           borderBottomWidth="1px"
  //           fontWeight={fontWeights.semiBold}
  //           fontSize={fontSizes.small}
  //           color={colors.black}
  //         >
  //           {allNewsLinkText || loadMoreText}
  //         </P>
  //       </Flex>
  //     ) : null} */}
  //   </SectionContainer>
  // );
};
