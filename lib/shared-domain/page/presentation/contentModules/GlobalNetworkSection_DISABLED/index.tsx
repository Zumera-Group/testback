import React from 'react';
import Link from 'next/link';
import { Office } from '../../../../offices/domain/index';
import { GlobalNetworkSectionModule } from '../../../domain/contentModule';
import { SectionContainer } from '../../../../../../components/Layout/SectionContainer';
import { Box, FlexCol } from '../../../../../../components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from '../../components/TitleWithSubtitleAndDescription';
import {
  AccordionCustom,
  AccordionItemCustom,
} from '../../components/AccordionCustom';
import { useGlobalNetwork } from './useGlobalNetwork';
import { P } from 'components/Typography/P';
import { colors } from '../../../../../../styles/foundations/colors';
import { SimpleGrid } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { H } from '../../../../../../components/Typography/H';
import { useHover } from '../../../../../hooks/useOnHover';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { slugifyOffice } from 'lib/shared-domain/offices/application/slugifyOffice';
import { useFetchOffices } from '../../../../offices/application/useGetOffices';


const OfficeItem: React.FC<{ cdiOffice: Office }> = ({ cdiOffice }) => {
  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  const officeHref = linkWithCurrentLocale(
    'cdi-global/' + slugifyOffice(cdiOffice.city),
  );

  const [ref, isHovered] = useHover();
  const color = isHovered ? colors.primary.lightGreen : colors.black;
  return (
    <Link passHref href={officeHref}>
      <FlexCol as="a" py={1} cursor="pointer" ref={ref}>
        <Box mb={1}>
          <P variant="globalNetworkOfficeItemTitle" color={color}>
            {cdiOffice.city}
          </P>
        </Box>
        <P
          variant="globalNetworkOfficeItemContent"
          color={colors.text.light}
        >{`${cdiOffice.street} ${cdiOffice.houseNumber}`}</P>
        <P variant="globalNetworkOfficeItemContent" color={colors.text.light}>
          {`${cdiOffice.zipCode} ${cdiOffice.city}`}
        </P>
        <P variant="globalNetworkOfficeItemContent" color={colors.text.light}>
          {cdiOffice.country}
        </P>
      </FlexCol>
    </Link>
  );
};

const ContinentCard: React.FC<{
  continent: string;
  cdiOffices: Office[];
}> = ({ continent, cdiOffices }) => {
  return (
    <AccordionItemCustom buttonText={continent}>
      {cdiOffices.map((o, i) => (
        <OfficeItem key={i} cdiOffice={o} />
      ))}
    </AccordionItemCustom>
  );
};

const OfficesGrid: React.FC<{ continent: string; cdiOffices: Office[] }> = ({
  continent,
  cdiOffices,
}) => {
  return (
    <>
      <Box>
        <H as="h3" variant="desktopGlobalNetworkSectionH">
          {continent}
        </H>
      </Box>
      <SimpleGrid
        columns={{ md: 2, lg: 3, xl: 4 }}
        spacingX={6}
        spacingY={2}
        pt={1}
        pb={2}
      >
        {cdiOffices.map((o, i) => (
          <OfficeItem key={i} cdiOffice={o} />
        ))}
      </SimpleGrid>
      <Box mb={5} />
    </>
  );
};

export const GlobalNetworkSection: React.FC<{
  specificContentModule: GlobalNetworkSectionModule;
}> = ({ specificContentModule }) => {
  const offices = useFetchOffices();
  const { continents, continentsWithCDIOffices } = useGlobalNetwork(offices);
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;
  return (
    <SectionContainer pt="md" pb="xs">
      <Box mb={8} width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      {isMobile ? (
        <AccordionCustom>
          {continents?.map((c, i) => (
            <ContinentCard
              key={c}
              continent={c}
              cdiOffices={continentsWithCDIOffices[c]}
            />
          ))}
        </AccordionCustom>
      ) : (
        continents.map((c) => (
          <OfficesGrid
            key={c}
            continent={c}
            cdiOffices={continentsWithCDIOffices[c]}
          />
        ))
      )}
    </SectionContainer>
  );
};

export default GlobalNetworkSection;
