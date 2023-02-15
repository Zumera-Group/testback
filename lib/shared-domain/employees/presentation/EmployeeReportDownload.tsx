import React from 'react';
// import { SectionContainer } from '../../../../components/Layout/SectionContainer';
// import { FlexCol, Box } from '../../../../components/Layout/Flex/Flex';
// import { SimpleGrid } from '@chakra-ui/react';
// import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { P } from '../../../../components/Typography/P';
// import reportDownloadBg from 'public/newsDetail/reportDownloadBg-min.jpg';
import { colors } from '../../../../styles/foundations/colors';
import { Employee } from '../domain/index';
import { CardDownload } from 'lib/shared-domain/newsArticle/presentation/newsCards';

//TODO: To delete
export const EmployeeReportDownload: React.FC<{
  employee: Employee;
}> = ({ employee }) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;

  if (
    !employee?.reportDownloadSection?.title &&
    !employee?.reportDownloadSection?.description &&
    !employee?.reportDownloadSection?.report
  )
    return null;

  const DescriptionVariant = isMobile
    ? 'mobileReportDownloadDescription'
    : 'reportDownloadDescription';
  return null;
  // return (
  //   <FlexCol
  //     // backgroundImage={`url(${reportDownloadBg.src})`}
  //     backgroundPosition="center"
  //     backgroundSize="cover"
  //     backgroundRepeat="no-repeat"
  //   >
  //     <SectionContainer py="sm">
  //       <SimpleGrid
  //         columns={{ base: 1, lg: 2 }}
  //         spacing={{ base: 5, md: 10, lg: 15 }}
  //       >
  //         <Box mt={{ base: 0, md: 5 }}>
  //           <P variant="reportDownloadTitle" color={colors.white} mb={4}>
  //             {employee?.reportDownloadSection?.title}
  //           </P>
  //           <P
  //             whiteSpace="pre-wrap"
  //             variant={DescriptionVariant}
  //             color={colors.duckEgg}
  //           >
  //             {employee?.reportDownloadSection?.description}
  //           </P>
  //         </Box>
  //         {employee?.reportDownloadSection?.report && (
  //           <Box height="fit-content">
  //             <CardDownload
  //               content={{
  //                 ...employee?.reportDownloadSection?.report,
  //                 buttonCaption:
  //                   employee?.reportDownloadSection?.report?.buttonText,
  //                 emailLabel:
  //                   employee?.reportDownloadSection?.report?.emailPlaceholder,
  //               }}
  //               bgLight
  //               hideIconBtn
  //             />
  //           </Box>
  //         )}
  //       </SimpleGrid>
  //     </SectionContainer>
  //   </FlexCol>
  // );
};
