import React from 'react';
import Image from 'next/image';
import { NewsArticle } from '../domain/index';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { Box, FlexCol, FlexRow } from '../../../../components/Layout/Flex/Flex';
import {
  AccordionCustom,
  AccordionItemCustom,
} from '../../page/presentation/components/AccordionCustom';
import { P } from '../../../../components/Typography/P';
import {
  fontSizes,
  fontWeights,
} from '../../../../styles/foundations/fontStyles';
import { SimpleGrid } from '@chakra-ui/layout';
import useBreakpointValue from '../../useBreakpoint';
import { enGB, de } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

const AccordionChildContent: React.FC<{
  program: {
    startHourTime: string;
    startMinTime: string;
    title: string;
    description: string;
    speaker: string;
    logo: { asset: { url: string } };
  };
}> = ({ program }) => {
  const time = `${program?.startHourTime}:${program?.startMinTime}`;

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const VARIANT = isMobile ? 'mobileBtnChildProgramP' : 'btnChildProgramP';
  const ICONVARIANT = isMobile ? '16px' : '20px';

  return (
    <FlexRow w="100%" align="flex-start">
      <Box mr={4} mt={3}>
        <P variant={VARIANT}>{time}</P>
      </Box>
      <Box w="100%">
        <AccordionCustom>
          <AccordionItemCustom
            buttonText={program?.title}
            pVariant={VARIANT}
            iconSize={ICONVARIANT}
          >
            {(program?.logo?.asset.url ||
              program?.speaker ||
              program?.description) && (
              <FlexCol align="flex-start">
                {program?.logo?.asset?.url && (
                  <Image
                    unoptimized
                    loading="lazy"
                    src={program?.logo?.asset?.url}
                    alt=""
                    width="150px"
                    height="50px"
                  />
                )}
                <P
                  py={2}
                  fontSize={fontSizes.h2}
                  fontWeight={fontWeights.highlight}
                >
                  {program?.speaker}
                </P>
                <P
                  fontSize={fontSizes.h3}
                  fontWeight={fontWeights.regular}
                  lineHeight="26px"
                >
                  {program?.description}
                </P>
              </FlexCol>
            )}
          </AccordionItemCustom>
        </AccordionCustom>
      </Box>
    </FlexRow>
  );
};

const useFormatDate = () => {
  const router = useRouter();
  const routerLocale = router?.locale;
  let locale = enGB;

  if (routerLocale === 'de') {
    locale = de;
  }

  return (value: Date) => {
    try {
      return format(
        new Date(value.valueOf() + value.getTimezoneOffset() * 60 * 1000),
        'EEEE, P',
        { locale },
      );
    } catch (e) {
      return JSON.stringify(value);
    }
  };
};

export const NewsEventProgram: React.FC<{
  newsEvent: NewsArticle;
  content: any;
}> = ({ newsEvent, content }) => {
  const programs = newsEvent?.programSection;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const VARIANT = isMobile ? 'mobileBtnProgramP' : 'btnProgramP';

  const ICONVARIANT = isMobile ? '20px' : '25px';

  const format = useFormatDate();

  return (
    <SectionContainer pt="xs" pb="md">
      <Box mb={4}>
        <TitleWithSubtitleAndDescription
          title={content?.programSectionContent?.title}
          subtitle={content?.programSectionContent?.subtitle}
        />
      </Box>
      <AccordionCustom>
        {programs?.map((program, i) => {
          if (!program?.program || program?.program?.length === 0) return;
          const date = new Date(program?.date);

          const btnText = `${program?.city} • ${format(date)}`;

          return (
            <AccordionItemCustom
              key={i}
              buttonText={btnText}
              pVariant={VARIANT}
              iconSize={ICONVARIANT}
            >
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacingX={10}>
                {program.program?.map((p, i) => {
                  return <AccordionChildContent key={i} program={p} />;
                })}
              </SimpleGrid>
            </AccordionItemCustom>
          );
        })}
      </AccordionCustom>
    </SectionContainer>
  );
};
