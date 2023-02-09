import { Box, Flex } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { P } from 'components/Typography/P';
import Image from 'next/image';

import React from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
import {
  FlexCol,
  FlexRow,
} from '../../../../../../components/Layout/Flex/Flex';
import { EmployeeCarouselSectionModule } from '../../../domain/contentModule';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';

import { useFetchJobs } from 'lib/shared-domain/jobs/application/useGetJobs';
import { LinkWithArrow } from '../../components/LinkWithArrow';
import { links } from 'lib/links';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Card: React.FC<{
  image: string;
  cardSubtitle: string;
  title: string;
  subtitle: string;
  href: string;
  skills: string[];
}> = ({ image, title, subtitle, cardSubtitle, skills, href }) => {
  return (
    <Link passHref href={href}>
      <Box
        cursor="pointer"
        as="a"
        boxShadow="0px 5.14599px 15.438px rgba(7, 54, 46, 0.3)"
        style={{
          transition: 'all 0.3s ease',
        }}
        _hover={{ transform: 'translateY(-5px)' }}
        backgroundColor={colors.white}
        height="460px"
        width="270px"
        overflow="hidden"
        position="relative"
      >
        <Box position="relative" height="220px">
          {image && (
            <Image
              unoptimized
              loading="lazy"
              objectFit="cover"
              layout="fill"
              alt={title}
              src={image}
            />
          )}
        </Box>
        <Box p={2}>
          <P
            fontWeight="600"
            fontSize={fontSizes.h3}
            noOfLines={2}
            color={colors.primary.darkestGreen}
            mb={1.5}
          >
            {title}
          </P>
          <P
            fontWeight="600"
            fontSize={fontSizes.tiny}
            noOfLines={2}
            color={colors.primary.darkestGreen}
            mb={2}
          >
            {subtitle}
          </P>
          {skills?.length > 0 && (
            <Box>
              <P color={colors.text.light} fontSize={fontSizes.xs}>
                {cardSubtitle}
              </P>
              <FlexRow overflow="hidden" mt={1} flexWrap="wrap">
                {skills?.map((s, index) => (
                  <Box
                    mb={1}
                    mr={1}
                    px={1}
                    py={0.5}
                    borderRadius="16px"
                    background="linear-gradient(101.34deg, #11302D -1.74%, #066250 109.97%, #17AA8B 272.46%, #3DDFBA 388.24%)"
                    key={index}
                  >
                    <P
                      fontSize={fontSizes.xs}
                      fontWeight="600"
                      color={colors.white}
                    >
                      {s}
                    </P>
                  </Box>
                ))}
              </FlexRow>
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export const EmployeeCarouselSection: React.FC<{
  specificContentModule: EmployeeCarouselSectionModule;
}> = ({ specificContentModule }) => {
  // const Carousel = dynamic(() => import('./SpringCarousel'), {
  //   ssr: false,
  // });
  const jobs = useFetchJobs();
  const [slides, setSlides] = React.useState([]);

  const filteredJobs = (
    !specificContentModule?.jobCard?.unit ||
    specificContentModule?.jobCard?.unit === 'all'
      ? jobs
      : jobs.filter((j) => j.unit === specificContentModule?.jobCard?.unit)
  ).sort((a, b) => a?.title?.localeCompare(b?.title));

  React.useEffect(() => {
    const buildSlides = () => {
      const jobSlides = filteredJobs.map((j, index) => ({
        key: j._id,
        content: (
          <Card
            key={index}
            cardSubtitle={specificContentModule.jobCard?.qualificationsSubtitle}
            skills={j?.qualifications}
            image={specificContentModule?.jobCard?.image?.asset?.url}
            subtitle={j?.office?.city}
            title={j?.title}
            href={j.link}
          />
        ),
      }));
      const slides = [];

      specificContentModule.employees.forEach((e, index) => {
        const nextJobSlide = jobSlides[0];
        if (index !== 0 && index % 2 === 0 && nextJobSlide) {
          slides.push(nextJobSlide);
          jobSlides.shift();
        }

        slides.push({
          key: e._id,
          content: (
            <Card
              skills={e?.qualifications}
              cardSubtitle={specificContentModule.cardSubtitle}
              subtitle={e?.jobTitle}
              key={index}
              image={e?.detailPagePicture?.picture?.asset?.url}
              title={getEmployeeFullName(e)}
              href={links().employees(e)}
            />
          ),
        });
      });

      return [...slides, ...jobSlides];
    };
    setSlides(buildSlides);
  }, [JSON.stringify(filteredJobs)]);

  return (
    <SectionContainer py="lg">
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <FlexCol mb={2} mr={{ base: 0, md: 5 }} flex={1} width="100%">
          <P
            color={colors.primary.darkestGreen}
            mb={3}
            fontSize={fontSizes.h1}
            fontWeight="600"
          >
            {specificContentModule.title}
          </P>
          <P color={colors.text.light}>
            {Array.isArray(specificContentModule.description) ? (
              <SanityBlockContent text={specificContentModule.description} />
            ) : (
              specificContentModule.description
            )}
          </P>
          {specificContentModule.button.externalUrl &&
            specificContentModule.button.title && (
              <Box mt={6} mb={{ base: 4, md: 0 }}>
                <LinkWithArrow
                  color={colors.primary.darkestGreen}
                  title={specificContentModule.button.title}
                  href={specificContentModule.button.externalUrl}
                />
              </Box>
            )}
        </FlexCol>
        <FlexCol
          className="employee-carousel"
          flex={1}
          width="100%"
          position="relative"
          mb={{ base: 5, md: 0 }}
          minHeight="550px"
          height="550px"
        >
          {/*// @ts-ignore*/}
          <Carousel
            offsetRadius={2}
            animationConfig={{ tension: 120, friction: 14 }}
            showNavigation={true}
            slides={slides}
            goToSlideDelay={200}
          />
        </FlexCol>
      </Flex>
    </SectionContainer>
  );
};

export default EmployeeCarouselSection;
