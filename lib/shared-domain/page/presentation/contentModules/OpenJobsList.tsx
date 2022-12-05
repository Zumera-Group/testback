import { SectionContainer } from 'components/Layout/SectionContainer';
import { Job } from 'lib/shared-domain/jobs/domain';
import React, { useEffect, useState } from 'react';
import { Box, FlexRow } from '../../../../../components/Layout/Flex/Flex';
import { OpenJobsListModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { icons } from 'components/Icons';
import { P } from 'components/Typography/P';
import { fontWeights } from 'styles/foundations/fontStyles';
import { colors } from 'styles/foundations/colors';
import Link from 'next/link';
import { useCareerRef } from '../../infrastructure/useCareerRef';
import { useRef } from 'react';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { useFetchJobs } from 'lib/shared-domain/jobs/application/useGetJobs';

export const OpenJobsList: React.FC<{
  specificContentModule: OpenJobsListModule;
}> = ({ specificContentModule }) => {
  const jobs = useFetchJobs();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [color, setColor] = useState<Record<number, string>>({});
  const jobSectionRef = useRef<HTMLDivElement>(null);
  const { setSectionRef } = useCareerRef();
  const sharedContent = useSharedContentContext();
  const content = sharedContent?.careerOpenJobsTableSection;

  useEffect(() => {
    setSectionRef(jobSectionRef);
  }, []);

  const filteredJobs = (
    !specificContentModule.unit || specificContentModule.unit === 'all'
      ? jobs
      : jobs.filter((j) => j.unit === specificContentModule.unit)
  ).sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <SectionContainer py="md">
      <Box mb={8} width={{ base: '100%', lg: '50%' }} ref={jobSectionRef}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      <Table>
        {!isMobile && filteredJobs && (
          <Thead>
            <Tr>
              <Th>{content?.jobTitleColumnContent}</Th>
              <Th>
                <span style={{ marginLeft: '7px' }}>
                  {content?.locationColumnContent}
                </span>
              </Th>
              <Th>{content?.employmentColumnContent}</Th>
              {/* ↓↓↓ Icon at the end of column ↓↓↓*/}
              <Th></Th>
            </Tr>
          </Thead>
        )}

        <Tbody>
          {!isMobile &&
            filteredJobs?.map((job: Job, i: number) => (
              <Tr
                onClick={() => window.open(job.link, '_blank')}
                key={job.title}
                onMouseOver={() => {
                  setColor((prevColor) => ({
                    ...prevColor,
                    [i]: colors.primary.lightGreen,
                  }));
                }}
                onMouseLeave={() => {
                  setColor((prevColor) => ({
                    ...prevColor,
                    [i]: colors.black,
                  }));
                }}
                _hover={{
                  cursor: 'pointer',
                  color: colors.primary.lightGreen,
                }}
              >
                <Td color={color[i] || colors.black}>{job.title}</Td>
                <Td>
                  <FlexRow align="center">
                    <Box mr={0.5} p={0.5}>
                      <icons.Location color={color[i] || colors.black} />
                    </Box>
                    <P color={color[i] || colors.black}>{job?.office?.city}</P>
                  </FlexRow>
                </Td>
                <Td color={color[i] || colors.black}>{job.employmentType}</Td>
                <Td>
                  <icons.LinkArrow
                    size="14px"
                    color={color[i] || colors.black}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {isMobile &&
        filteredJobs?.map((job: Job) => (
          <Link passHref href={job.link} key={job.title}>
            <Box as="a" cursor="pointer" pb={2} key={job.title}>
              <FlexRow flex={1} justify="space-between" align="center">
                <Box mb={2}>
                  <P
                    color={colors.primary[500]}
                    fontWeight={fontWeights.highlight}
                  >
                    {job.title}
                  </P>
                  <P>
                    {job.employmentType} · {job?.office?.city}
                  </P>
                </Box>
                <icons.LinkArrow size="14px" />
              </FlexRow>
            </Box>
          </Link>
        ))}
    </SectionContainer>
  );
};

export default OpenJobsList;
