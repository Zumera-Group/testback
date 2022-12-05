import { useBreakpointValue } from '@chakra-ui/react';
import { icons } from 'components/Icons';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import { useFetchJobs } from 'lib/shared-domain/jobs/application/useGetJobs';
import { Job } from 'lib/shared-domain/jobs/domain';
import Link from 'next/link';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import {
  Box,
  FlexCol,
  FlexRow,
} from '../../../../../components/Layout/Flex/Flex';
import { JobListWithBgSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { useHover } from '../../../../hooks/useOnHover';

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  const [ref, isHovered] = useHover();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Link passHref href={job.link} key={job.title}>
      <Box ref={ref} as="a" cursor="pointer" key={job.title}>
        <FlexRow
          borderBottom="1px solid"
          borderBottomColor={colors.white}
          pb={1.5}
          pt={1.5}
          flex={1}
          justify="space-between"
          align="center"
        >
          <Box>
            <P color={isHovered ? colors.primary.lighterGreen : colors.white}>
              {job.title}
            </P>
          </Box>
          <FlexRow alignItems="center">
            {!isMobile && (
              <P mr={3} color={colors.primary.lighterGreen}>
                {job.department}
              </P>
            )}

            <FlexCol width="120px" alignItems="flex-end">
              <P mr={3} color={colors.primary.lighterGreen}>
                {job.employmentType}
              </P>
            </FlexCol>
            <icons.LinkArrow color={colors.white} size="14px" />
          </FlexRow>
        </FlexRow>
      </Box>
    </Link>
  );
};

export const JobListWithBgSection: React.FC<{
  specificContentModule: JobListWithBgSectionModule;
}> = ({ specificContentModule }) => {
  const jobs = useFetchJobs();

  const filteredJobs = (
    !specificContentModule.unit || specificContentModule.unit === 'all'
      ? jobs
      : jobs.filter((j) => j.unit === specificContentModule.unit)
  ).sort((a, b) => a?.title?.localeCompare(b?.title));
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${specificContentModule.getBackgroundImage()})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer py="lg">
        <Box mb={6} textAlign="center" maxWidth="700px" mx="auto">
          <Box mb={4} display="contents">
            {specificContentModule.title.map((t, index) => (
              <Box display="contents" key={index}>
                <H
                  display="contents"
                  className="titleWithSubtitleAndDescriptionHeading"
                  color={t.color}
                  as="h2"
                >
                  {t.text}
                </H>
              </Box>
            ))}
          </Box>
          <TitleWithSubtitleAndDescription
            color={{ title: colors.white, description: colors.white }}
            {...specificContentModule}
            title={null}
          />
        </Box>

        {filteredJobs?.map((job: Job) => (
          <JobItem key={job.title} job={job} />
        ))}
      </SectionContainer>
    </FlexCol>
  );
};

export default JobListWithBgSection;
